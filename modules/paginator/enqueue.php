<?php
/**
 * Loop paginator using AJAX
 */
namespace tangible\template_system\paginator;

use tangible\ajax;
use tangible\template_system;

function register() {
  $url = template_system::$state->url . '/modules/paginator/build';
  $version = template_system::$state->version;

  ajax\enqueue();

  wp_register_script(
    'tangible-paginator',
    "{$url}/paginator.min.js",
    [ 'jquery', 'tangible-ajax' ],
    $version,
    true
  );  

  wp_register_style(
    'tangible-paginator',
    "{$url}/paginator.min.css",
    [],
    $version,
  );
}

function enqueue() {
  ajax\enqueue();
  wp_enqueue_script('tangible-paginator');
  wp_enqueue_style('tangible-paginator');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
