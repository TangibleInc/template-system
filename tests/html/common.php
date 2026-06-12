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
      $content = file_get_contents($file) ?? ''; // Can return false
      $content = str_replace(["\r\n", "\r"], "\n", $content);
      return [
        'name' => str_replace(
          [__DIR__ . '/', '/'],
          ['', '--'],
          $file
        ),
        'content' => $content
      ];
    }, glob($dir . '/*.html')));
  }
  return $files;
}
