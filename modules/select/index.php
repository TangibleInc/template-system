<?php
namespace tangible\template_system\select;
use tangible\template_system;

function register() {
  $url = template_system::$state->url . 'modules/select/build';
  $version = template_system::$state->version;

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
  wp_enqueue_script('tangible-embed');
  wp_enqueue_style('tangible-embed');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
