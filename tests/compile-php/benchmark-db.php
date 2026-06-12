<?php
/**
 * Benchmark: query-backed post loops, the frontend-reporting scenario.
 *
 * Seeds BENCH_POSTS posts (default 2000) with meta, then renders a report
 * over BENCH_PER_PAGE of them (default 200) per strategy, flushing the
 * object cache before every render so each iteration pays cold-cache
 * database costs like a real request. Reports ms/render and SQL queries
 * per render.
 *
 *   wp-env run cli php -d opcache.enable_cli=1 -d opcache.enable=1 \
 *     -d opcache.file_update_protection=0 \
 *     wp-content/plugins/tangible-template-system/tests/compile-php/benchmark-db.php
 */

$wp_load = getenv('WP_LOAD_PATH') ?: dirname(__DIR__, 5) . '/wp-load.php';
require $wp_load;

if (!function_exists('tangible_template')) {
  fwrite(STDERR, "Template System is not active\n");
  exit(1);
}

$total_posts = (int) (getenv('BENCH_POSTS') ?: 2000);
$per_page = (int) (getenv('BENCH_PER_PAGE') ?: 200);
$iterations = (int) (getenv('BENCH_ITERATIONS') ?: 20);

register_post_type('bench_item', [ 'public' => true ]);

// Idempotent seeding, tracked by an option
$seeded = (int) get_option('bench_items_seeded', 0);
if ($seeded < $total_posts) {
  printf("Seeding %d posts (have %d)...\n", $total_posts, $seeded);
  for ($i = $seeded; $i < $total_posts; $i++) {
    $id = wp_insert_post([
      'post_type' => 'bench_item',
      'post_status' => 'publish',
      'post_title' => sprintf('Item %06d', $i),
      'post_name' => sprintf('bench-item-%06d', $i),
    ]);
    update_post_meta($id, 'bench_price', (string) (($i * 7) % 1000));
    update_post_meta($id, 'bench_region', ['north', 'south', 'east', 'west'][$i % 4]);
  }
  update_option('bench_items_seeded', $total_posts);
  printf("Seeded.\n");
}

$template = '<Loop type=post post_type=bench_item posts_per_page=' . $per_page
  . ' orderby=title order=asc status=publish>'
  . '<tr><td><Field title /></td><td><Field custom=bench_price /></td><td><Field custom=bench_region /></td></tr>'
  . '</Loop>';

$html = tangible_template();

/**
 * Hand-coded equivalent: WP_Query + the same fields.
 */
$hand_coded = function () use ($per_page) {
  $query = new WP_Query([
    'post_type' => 'bench_item',
    'post_status' => 'publish',
    'posts_per_page' => $per_page,
    'orderby' => 'title',
    'order' => 'ASC',
  ]);
  $out = '';
  foreach ($query->posts as $post) {
    $out .= '<tr><td>' . $post->post_title . '</td><td>'
      . get_post_meta($post->ID, 'bench_price', true) . '</td><td>'
      . get_post_meta($post->ID, 'bench_region', true) . '</td></tr>';
  }
  return $out;
};

$cold = function (callable $fn) {
  wp_cache_flush();
  return $fn();
};

$time_cold = function (callable $fn, int $n) use ($cold) {
  $start = hrtime(true);
  for ($i = 0; $i < $n; $i++) {
    $cold($fn);
  }
  return (hrtime(true) - $start) / 1e6 / $n;
};

$queries_for = function (callable $fn) use ($cold) {
  global $wpdb;
  $before = $wpdb->num_queries;
  $cold($fn);
  return $wpdb->num_queries - $before;
};

// Prepare strategies
$nodes = \tangible\html\parse($template);
$compiled_file = \Tangible\TemplateSystem\Compile\Compiler::compileToFile($template, [
  'version' => 'bench-db',
  'source' => 'benchmark-db',
  'force' => true,
]);
if (empty($compiled_file)) {
  fwrite(STDERR, "Compile failed\n");
  exit(1);
}

$strategies = [
  'hand-coded PHP' => $hand_coded,
  'L&L parse + render' => fn() => $html->render_with_catch_exit($template),
  'L&L pre-parsed' => fn() => $html->render_with_catch_exit($nodes),
  'L&L compiled' => function () use ($compiled_file) { return include $compiled_file; },
];

// Output sanity check
$reference = null;
foreach ($strategies as $label => $fn) {
  $out = $cold($fn);
  if ($reference === null) {
    $reference = $out;
    continue;
  }
  if ($out !== $reference) {
    printf("NOTE: '%s' output differs from hand-coded (%d vs %d bytes)\n", $label, strlen((string) $out), strlen((string) $reference));
  }
}

printf(
  "PHP %s | %d posts seeded, %d per render, %d iterations, cold object cache per render\n",
  PHP_VERSION, $total_posts, $per_page, $iterations
);

foreach ($strategies as $label => $fn) {
  $ms = $time_cold($fn, $iterations);
  $queries = $queries_for($fn);
  printf("%-22s %9.3f ms/render | %3d queries/render\n", $label, $ms, $queries);
}
