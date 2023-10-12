<?php

namespace Tangible\TemplateSystem\API;

use Tangible\TemplateSystem\API as api;

// Client

function enqueue_client() {

 $client_data = [
    'ajaxUrl' => admin_url( 'admin-ajax.php' ),
    'nonce' => api\create_nonce(),
    'ajaxAction' => api::$state->action_key
  ];

  wp_enqueue();

}
