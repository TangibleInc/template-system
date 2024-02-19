<?php
namespace tangible\tests\html;

$html_engine_version = $argv[1] ?? 'v1';

// Get test HTML files
function get_test_html_files() {

  $test_data_dir = __DIR__;
  $files = array_map(function($file) use ($test_data_dir) {
    return [
      'name' => str_replace($test_data_dir . '/', '', $file),
      'content' => file_get_contents($file)
    ];
  }, glob($test_data_dir . '/**/*.html'));

  return $files;
}

function run_profile($action) {
  // https://xdebug.org/docs/develop#related_settings_and_functions
  $init_time = xdebug_time_index(); // seconds
  $init_fn = xdebug_get_function_count();
  $init_mem = xdebug_peak_memory_usage(); // xdebug_memory_usage();

  $action();

  return [
    'duration' => xdebug_time_index() - $init_time,
    'functions' => xdebug_get_function_count() - $init_fn - 1,
    'memory' => xdebug_peak_memory_usage() - $init_mem,
  ];
}

$html = require_once __DIR__ . '/html-module-v1.php';

$files = get_test_html_files();

$result = run_profile(function() use ($files, $html) {
  foreach ($files as $file) {
    $html->parse($file['content']);
  }  
});

echo '### ' . date('Y-m-d') . "\n\n";
echo "HTML engine: $html_engine_version - Parsed files: " . count($files) . "\n\n";

echo "Time duration: " . $result['duration'] . " seconds\n";
echo "Function calls: " . $result['functions'] . "\n";
echo "Memory usage: " . $result['memory'] . "\n";
echo "\n";
