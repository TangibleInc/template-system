<?php

namespace tangible\template_system;
use tangible\template_system;

function enqueue_assets_editor() {

  $url = template_system::$state->url . '/admin/build';
  $version = template_system::$state->version;

  wp_enqueue_script(
    'tangible-template-assets-editor',
    $url . '/template-assets-editor.min.js',
    [
      'wp-element',
    ],
    $version
  );

  wp_enqueue_style(
    'tangible-template-assets-editor',
    $url . '/template-assets-editor.min.css',
    [],
    $version
  );

}
