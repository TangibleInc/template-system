<?php
namespace tangible\template_system\builder;

use tangible\framework;
use tangible\template_system;
use tangible\template_system\editor;
use tangible\template_system\builder;

function load() {

  builder\enqueue();

  ?><div id="tangible-template-system-builder"></div><?php

  // Remove admin page footer
  add_filter('admin_footer_text', '__return_false'); // Left
  add_filter('update_footer', '__return_false', 11); // Right
}

function enqueue() {

  editor\enqueue_editor();

  $url = builder::$state->url;
  $version = builder::$state->version;

  wp_enqueue_script(
    'tangible-template-system-builder',
    $url . '/build/builder.min.js',
    [
      // 'tangible-ajax', // TODO: Replace with new REST Client module
      'tangible-module-loader',
      'tangible-template-system-editor',
      'wp-element',
    ],
    $version,
    true
  );

  wp_enqueue_style(
    'tangible-template-system-builder',
    $url . '/build/builder.min.css',
    [],
    $version
  );
}
