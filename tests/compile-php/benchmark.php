<?php
/**
 * Benchmark: runtime render vs pre-parsed nodes vs compiled PHP include.
 *
 * Run inside the wp-env cli container from the WordPress root:
 *
 *   wp-env run cli php -d opcache.enable_cli=1 -d opcache.enable=1 \
 *     -d opcache.file_update_protection=0 \
 *     wp-content/plugins/tangible-template-system/tests/compile-php/benchmark.php
 *
 * Pass -d opcache.enable_cli=0 for the no-opcache variant.
 *
 * file_update_protection=0 matters: by default opcache refuses to cache
 * files modified in the last 2 seconds, and this script measures right
 * after compiling. Production compiled files are written once and served
 * for a long time, so the cached number is the representative one.
 */

$wp_load = getenv('WP_LOAD_PATH') ?: dirname(__DIR__, 5) . '/wp-load.php';
if (!file_exists($wp_load)) {
  fwrite(STDERR, "wp-load.php not found at $wp_load\n");
  exit(1);
}
require $wp_load;

if (!function_exists('tangible_template')) {
  fwrite(STDERR, "Template System is not active\n");
  exit(1);
}

$iterations = (int) (getenv('BENCH_ITERATIONS') ?: 200);
$sections = (int) (getenv('BENCH_SECTIONS') ?: 50);

/**
 * Build a representative template: static markup mixed with variables,
 * conditions, and list loops. No database so results are deterministic.
 */
$section = <<<'HTML'
<section class="block block-%d">
  <h2 class="title"><Get variable=title /></h2>
  <If variable=flag value=1><p class="on">Enabled</p><Else /><p class="off">Disabled</p></If>
  <ul><Loop items='[{"value":"alpha"},{"value":"beta"},{"value":"gamma"}]'><li data-index="42"><Field value /> of <Get variable=title /></li></Loop></ul>
  <footer><span>Static footer text with <b>markup</b> and an <a href="#anchor-%d">anchor</a></span></footer>
</section>
HTML;

$template = '';
for ($i = 0; $i < $sections; $i++) {
  $template .= sprintf($section, $i, $i);
}

$html = tangible_template();
$html->set_variable_type('variable', 'title', 'Benchmark Title', [ 'render' => false, 'trim' => false ]);
$html->set_variable_type('variable', 'flag', '1', [ 'render' => false, 'trim' => false ]);

$time = function (callable $fn, int $n) {
  $start = hrtime(true);
  for ($i = 0; $i < $n; $i++) {
    $fn();
  }
  return (hrtime(true) - $start) / 1e6 / $n; // ms per iteration
};

// Sanity: all three paths must produce identical output
$runtime_out = $html->render_with_catch_exit($template);

$nodes = \tangible\html\parse($template);
$preparsed_out = $html->render_with_catch_exit($nodes);

$compile_start = hrtime(true);
$compiled_file = \Tangible\TemplateSystem\Compile\Compiler::compileToFile($template, [
  'version' => 'bench',
  'source' => 'benchmark',
  'force' => true,
]);
$compile_ms = (hrtime(true) - $compile_start) / 1e6;
if (empty($compiled_file)) {
  fwrite(STDERR, "Compile failed\n");
  exit(1);
}
$compiled_out = include $compiled_file;

if ($runtime_out !== $preparsed_out || $runtime_out !== $compiled_out) {
  fwrite(STDERR, "Output mismatch between render paths - aborting\n");
  fwrite(STDERR, 'runtime: ' . strlen($runtime_out) . ' preparsed: ' . strlen($preparsed_out) . ' compiled: ' . strlen($compiled_out) . "\n");
  exit(1);
}

// Warmup
$html->render_with_catch_exit($template);
include $compiled_file;

$parse_only_ms = $time(function () use ($template) {
  \tangible\html\parse($template);
}, $iterations);

$runtime_ms = $time(function () use ($html, $template) {
  $html->render_with_catch_exit($template);
}, $iterations);

$preparsed_ms = $time(function () use ($html, $nodes) {
  $html->render_with_catch_exit($nodes);
}, $iterations);

// The real transient-cache path unserializes the node tree per request
$serialized_nodes = serialize($nodes);
$unserialize_ms = $time(function () use ($html, $serialized_nodes) {
  $html->render_with_catch_exit(unserialize($serialized_nodes));
}, $iterations);

$compiled_ms = $time(function () use ($compiled_file) {
  include $compiled_file;
}, $iterations);

/**
 * Hand-coded PHP baseline: what a theme template file or a dynamic block
 * render callback would do for the same markup. Must produce byte-identical
 * output to the template above.
 */
$hand_coded = function () use ($sections) {
  $title = 'Benchmark Title';
  $flag = true;
  $items = [ 'alpha', 'beta', 'gamma' ];
  $out = '';
  for ($i = 0; $i < $sections; $i++) {
    $out .= '<section class="block block-' . $i . '">' . "\n  "
      . '<h2 class="title">' . $title . '</h2>' . "\n  ";
    $out .= $flag ? '<p class="on">Enabled</p>' : '<p class="off">Disabled</p>';
    $out .= "\n  <ul>";
    foreach ($items as $item) {
      $out .= '<li data-index="42">' . $item . ' of ' . $title . '</li>';
    }
    $out .= '</ul>' . "\n  "
      . '<footer><span>Static footer text with <b>markup</b> and an <a href="#anchor-' . $i . '">anchor</a></span></footer>' . "\n"
      . '</section>';
  }
  return $out;
};

$hand_out = $hand_coded();
$hand_identical = ($hand_out === $runtime_out);
if (!$hand_identical) {
  // Find first difference to help fix the baseline
  $len = min(strlen($hand_out), strlen($runtime_out));
  for ($i = 0; $i < $len && $hand_out[$i] === $runtime_out[$i]; $i++);
  fwrite(STDERR, sprintf(
    "WARNING: hand-coded baseline output differs at byte %d (hand %d bytes, template %d bytes)\n  hand:     ...%s...\n  template: ...%s...\n",
    $i, strlen($hand_out), strlen($runtime_out),
    substr($hand_out, max(0, $i - 30), 60),
    substr($runtime_out, max(0, $i - 30), 60)
  ));
}

$hand_ms = $time($hand_coded, $iterations);

$opcache = function_exists('opcache_get_status')
  ? (opcache_get_status(false)['opcache_enabled'] ?? false)
  : false;
$file_cached = function_exists('opcache_is_script_cached')
  ? opcache_is_script_cached($compiled_file)
  : false;

printf("PHP %s | opcache %s (compiled file cached: %s) | %d iterations | template %d KB -> output %d KB | compiled file %d KB\n",
  PHP_VERSION,
  $opcache ? 'ON' : 'OFF',
  $file_cached ? 'yes' : 'NO - results not representative',
  $iterations,
  strlen($template) / 1024,
  strlen($runtime_out) / 1024,
  filesize($compiled_file) / 1024
);
printf("one-off compile time:        %8.3f ms\n", $compile_ms);
printf("parse only:                  %8.3f ms/iter\n", $parse_only_ms);
printf("parse + render (no cache):   %8.3f ms/iter\n", $runtime_ms);
printf("render pre-parsed (memory):  %8.3f ms/iter\n", $preparsed_ms);
printf("unserialize + render\n  (transient cache path):    %8.3f ms/iter\n", $unserialize_ms);
printf("compiled include:            %8.3f ms/iter\n", $compiled_ms);
printf("hand-coded PHP baseline:     %8.3f ms/iter (identical output: %s)\n", $hand_ms, $hand_identical ? 'yes' : 'NO');
printf("speedup vs no cache:         %8.1fx\n", $runtime_ms / $compiled_ms);
printf("speedup vs transient path:   %8.1fx\n", $unserialize_ms / $compiled_ms);
printf("overhead vs hand-coded:      %8.1fx\n", $compiled_ms / $hand_ms);
