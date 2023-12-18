<?php
namespace tangible\template_system\date_picker;
use tangible\template_system;

function register() {
  $url = template_system::$state->url . '/modules/date-picker';
  $version = template_system::$state->version;
  
  wp_register_script(
    'tangible-date-picker',
    "{$url}/build/date-picker.min.js",
    [],
    $version,
    true
  );  

  wp_register_style(
    'tangible-date-picker',
    "{$url}/build/date-picker.min.css",
    [],
    $version,
  );  
}

function enqueue() {
  wp_enqueue_script('tangible-date-picker');
  wp_enqueue_style('tangible-date-picker');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
