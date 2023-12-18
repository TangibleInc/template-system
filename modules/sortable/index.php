<?php
namespace tangible\template_system\sortable;
use tangible\template_system;
use tangible\template_system\sortable;

function register() {
  $url = template_system::$state->url . '/modules/sortable/build';
  $version = template_system::$state->version;

  wp_register_script(
    'tangible-sortable',
    "{$url}/sortable.min.js",
    [],
    $version,
    true
  );
}

function enqueue() {
  wp_enqueue_script('tangible-sortable');
  wp_enqueue_style('tangible-sortable');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
