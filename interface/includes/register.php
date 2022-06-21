<?php

/**
 * Register module scripts and styles
 */

$interface->register_modules_done = false;

$interface->register_modules = function() use ( $interface ) {

  $url     = $interface->assets_url;
  $version = $interface->version;

  // Chart

  wp_register_script(
    'tangible-chart',
    "{$url}build/chart.min.js",
    [ 'jquery' ],
    $version,
    true
  );

  // Date picker

  wp_register_style(
    'tangible-date-picker',
    "{$url}build/date-picker.min.css",
    [],
    $version
  );

  wp_register_script(
    'tangible-date-picker',
    "{$url}build/date-picker.min.js",
    [],
    $version,
    true
  );

  // Embed - Responsive iframe

  wp_register_script(
    'tangible-embed-dynamic',
    "{$url}build/embed.min.js",
    [ 'jquery' ],
    $version,
    true
  );

  wp_register_style(
    'tangible-embed',
    "{$url}build/embed.min.css",
    [],
    $version
  );

  // Glider - Fullscreen gallery slider

  wp_register_script(
    'tangible-glider',
    "{$url}build/glider.min.js",
    [ 'jquery' ],
    $version,
    true
  );

  wp_register_style(
    'tangible-glider',
    "{$url}build/glider.min.css",
    [],
    $version
  );

  // Prism

  // Clipboard
  // From: https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js
  wp_register_script(
    'tangible-clipboard',
    "{$url}vendor/clipboard.min.js",
    [],
    '2.0.0',
    true
  );

  // From: https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+bash+json+markdown+markup-templating+php+php-extras+jsx+tsx+scss+typescript&plugins=toolbar+copy-to-clipboard
  wp_register_script(
    'tangible-prism',
    "{$url}vendor/prism.min.js",
    [ 'tangible-clipboard' ],
    '1.20.0',
    true
  );

  // Prism: Theme
  wp_register_style(
    'tangible-prism',
    "{$url}build/prism.min.css",
    [],
    $version
  );

  // Select

  wp_register_script(
    'tangible-select',
    "{$url}build/select.min.js",
    [ 'jquery' ],
    $version,
    true
  );

  wp_register_style(
    'tangible-select',
    "{$url}build/select.min.css",
    [],
    $version
  );

  // Slider

  wp_register_script(
    'tangible-slider',
    "{$url}build/slider.min.js",
    [ 'jquery' ],
    $version,
    true
  );

  wp_register_style(
    'tangible-slider',
    "{$url}build/slider.min.css",
    [],
    $version
  );

  // Sortable

  wp_register_script(
    'tangible-sortable',
    "{$url}build/sortable.min.js",
    [],
    $version,
    true
  );

  // Table

  wp_register_style(
    'tangible-table',
    "{$url}build/table.min.css",
    [],
    $version
  );

  wp_register_script(
    'tangible-table',
    "{$url}build/table.min.js",
    [ 'jquery' ],
    $version,
    true
  );

  $interface->register_modules_done = true;
};

add_action( 'wp_enqueue_scripts', $interface->register_modules, 0 );
add_action( 'admin_enqueue_scripts', $interface->register_modules, 0 );
