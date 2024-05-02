<?php
namespace tangible\tests\html;

/**
 * Profile action
 */
function run_profile($action) {
  // https://xdebug.org/docs/develop#related_settings_and_functions
  $init_time = microtime(true); // seconds
  $init_mem = memory_get_peak_usage();

  $action();

  return [
    'duration' => microtime(true) - $init_time,
    'memory' => memory_get_peak_usage() - $init_mem,
  ];
}

function format_duration($duration) {
  return number_format($duration * 1000, 2) . ' ms';
}

function format_memory($memory) {
  return number_format($memory / 1048576, 2) . ' MB';
}


$files = get_test_html_files();

/**
 * Profile: Parse
 */
$result = run_profile(function() use ($files, $html_parse, $html_render) {
  foreach ($files as $file) {
    $file['content'] = $html_parse($file['content']);
  }  
});

$bytes = array_reduce($files, function($bytes, $file) {
  return $bytes + strlen($file['content']);
}, 0);

$parse_time = $result['duration'];
$parse_memory = $result['memory'];

/**
 * Profile: Render
 */
$result = run_profile(function() use ($files, $html_parse, $html_render) {
  foreach ($files as $file) {
    $html_render($file['content']);
  }  
});

$render_time = $result['duration'];
$render_memory = $result['memory'];

/**
 * Report
 */
echo '### ' . date('Y-m-d') . "\n\n";
echo "HTML engine:    $html_engine \n";
echo "Parsed files:   " . count($files) . "\n";
echo "Parsed bytes:   " . number_format($bytes / 1024, 2) . " KB\n\n";

echo "Time:           " . format_duration($parse_time + $render_time)
  . " = " . format_duration($parse_time) . " (parse)"
  . " + " . format_duration($render_time) . " (render)\n";
echo "Memory usage:   " . format_memory($parse_memory + $render_memory)
  . " = " . format_memory($parse_memory) . " (parse)"
  . " + " . format_memory($render_memory) . " (render)\n";
echo "\n";
