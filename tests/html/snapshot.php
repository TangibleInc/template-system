<?php
namespace tangible\tests\html;

$snapshots_dir = __DIR__ . '/snapshots';

if (!is_dir($snapshots_dir)) {
  mkdir($snapshots_dir, 0777);
} else {
  // Empty folder
  foreach ([
    ...glob($snapshots_dir . '/*.html'),
    ...glob($snapshots_dir . '/*.json'),
  ] as $file) {
    if (is_file($file)) unlink($file);
  }
}

$files = get_test_html_files();

foreach ($files as $file) {

  // Parse
  $parsed = $html_parse( $file['content'] );
  file_put_contents(
    $snapshots_dir . '/' . str_replace('.html', '--parsed.json', $file['name']),
    json_encode($parsed)
  );

  // Render
  file_put_contents(
    $snapshots_dir . '/' . str_replace('.html', '--rendered.html', $file['name']),
    $html_render( $parsed )
  );
}
