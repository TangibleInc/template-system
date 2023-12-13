<?php
namespace tangible\api;
use tangible\api;

// Nonce

function create_nonce() {
  return wp_create_nonce(
    api\get_action_key()
  );
};

function verify_nonce() {
  return isset($_POST['nonce'])
    && wp_verify_nonce($_POST['nonce'], api\get_action_key())
  ;
};
