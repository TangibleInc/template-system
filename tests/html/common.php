<?php
namespace tangible\tests\html;

/**
 * Get test HTML files
 */
function get_test_html_files() {

  $files = [];
  foreach ([
    'parse5',
    'prettier',
    'unified'
  ] as $key) {
    $dir = __DIR__ . "/$key";
    array_push($files, ...array_map(function($file) use ($dir) {
      return [
        'name' => str_replace(
          [__DIR__ . '/', '/'],
          ['', '--'],
          $file
        ),
        'content' => file_get_contents($file) ?? '' // Can return false
      ];
    }, glob($dir . '/*.html')));
  }
  return $files;
}
