<?php
namespace tangible\api;
use tangible\api;

// Client

function enqueue() {

  $url = api::$state->url;
  $version = api::$state->version;

  wp_enqueue_script(
    'tangible-api',
    $url . '/build/api.min.js',
    [],
    $version,
    true
  );

  wp_localize_script( 'tangible-api', 'Tangible.API', [
    'ajaxUrl' => admin_url( 'admin-ajax.php' ),
    'nonce' => api\create_nonce(),
    'ajaxAction' => api\get_action_key()
  ]);
}
