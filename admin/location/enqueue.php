<?php
use tangible\ajax;
use tangible\template_system;

$plugin->enqueue_template_location_editor = function() use ( $plugin ) {

  ajax\enqueue();

  $url = template_system::$state->url . '/admin/build';
  $version = template_system::$state->version;

  wp_enqueue_script(
    'tangible-template-location-editor',
    $url . '/template-location-editor.min.js',
    [
      'wp-element', // 'tangible-preact',
      'tangible-ajax',
      'tangible-select'
    ],
    $version
  );

  wp_enqueue_style(
    'tangible-template-location-editor',
    $url . '/template-location-editor.min.css',
    [],
    $version
  );

};
