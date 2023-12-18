<?php
namespace tangible\select;
use tangible\framework;

function register() {
  $url = framework::$state->url . '/select/build';
  $version = framework::$state->version;

  wp_register_script(
    'tangible-select',
    "{$url}/select.min.js",
    [ 'jquery' ],
    $version,
    true
  );

  wp_register_style(
    'tangible-select',
    "{$url}/select.min.css",
    [],
    $version
  );
}

function enqueue() {
  wp_enqueue_script('tangible-select');
  wp_enqueue_style('tangible-select');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
