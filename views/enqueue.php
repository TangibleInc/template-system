<?php
namespace tangible\template_system\view;

use tangible\framework;
use tangible\template_system;
use tangible\template_system\editor;
use tangible\template_system\view;

function load() {

  view\enqueue();

  ?><div id="tangible-template-system-view"></div><?php

  // Remove admin page footer
  add_filter('admin_footer_text', '__return_false'); // Left
  add_filter('update_footer', '__return_false', 11); // Right
}

function enqueue() {

  editor\enqueue_editor();

  $url = view::$state->url;
  $version = view::$state->version;

  wp_enqueue_script(
    'tangible-template-system-view',
    $url . '/build/view.min.js',
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
    'tangible-template-system-view',
    $url . '/build/view.min.css',
    [],
    $version
  );
}
