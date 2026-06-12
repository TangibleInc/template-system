<?php
// Simulate a category archive request for archive_term
require __DIR__ . '/../nested-tax-post-loops/setup.php';
$GLOBALS['wp_the_query'] = $GLOBALS['wp_query'] = new WP_Query([
  'category_name' => 'parity-cat-a',
]);
