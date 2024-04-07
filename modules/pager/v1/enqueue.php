<?php
/**
 * Loop paginator using AJAX
 */
namespace tangible\template_system\paginator;

use tangible\ajax;
use tangible\template_system;
use tangible\template_system\paginator;

function register() {

  if (wp_script_is('tangible-paginator')) return;

  $url = template_system::$state->url . '/modules/pager/v1/build';
  $version = template_system::$state->version;

  ajax\register();

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
  if (!wp_script_is('tangible-paginator')) {
    paginator\register();
  }
  ajax\enqueue();
  wp_enqueue_script('tangible-paginator');
  wp_enqueue_style('tangible-paginator');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
