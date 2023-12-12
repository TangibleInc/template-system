<?php

namespace Tangible\TemplateSystem;

use Tangible\TemplateSystem as system;
use Tangible\API as api;

function get_settings_nonce() {
  return wp_create_nonce(
    system::$state->settings_key
  );
}

function verify_settings_nonce() {
  return isset($_POST['nonce'])
    && wp_verify_nonce($_POST['nonce'], system::$state->settings_key)
  ;
}

function ajax_save_settings() {

  if ( ! verify_settings_nonce() || !current_user_can('administrator') ) {
    return api\error('Not allowed');
  }

  try {

    $data = isset($_POST['data']) ? json_decode(
      stripslashes_deep($_POST['data']),
      JSON_OBJECT_AS_ARRAY
    ) : [];

    if ( !is_array($data) ) $data = [];

    // Action callback
    $result = system\set_settings($data);


    return api\send($result);

  } catch (\Throwable $th) {

    return api\error( $th->getMessage() );
  }
}

add_action(
  // 'wp_ajax_' for logged-in users, 'wp_ajax_nopriv_' for public action
  'wp_ajax_' . system::$state->settings_key,
  __NAMESPACE__ . '\\ajax_save_settings'
);
