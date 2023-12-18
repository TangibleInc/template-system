<?php
namespace tangible\template_system\table;
use tangible\ajax;
use tangible\template_system;
use tangible\template_system\table;

function register() {
  $url = template_system::$state->url . '/modules/table/build';
  $version = template_system::$state->version;
  
  wp_register_script(
    'tangible-table',
    "{$url}/table.min.js",
    [ 'jquery' ],
    $version,
    true
  );

  wp_register_style(
    'tangible-table',
    "{$url}/table.min.css",
    [],
    $version
  );

  wp_register_script(
    'tangible-dynamic-table',
    "{$url}/dynamic-table.min.js",
    [ 'jquery', 'tangible-table', 'tangible-ajax' ],
    $version,
    true
  );

}

function enqueue() {
  ajax\enqueue();
  wp_enqueue_style( 'tangible-table' );
  wp_enqueue_script( 'tangible-dynamic-table' );
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
