<?php
namespace tangible\ajax;
use tangible\ajax;

/**
 * Nonce
 */

const nonce_name = 'tangible_ajax';

function create_nonce() {
  return wp_create_nonce(ajax\nonce_name);
};

function verify_nonce() {
  return isset($_POST['nonce']) &&
    wp_verify_nonce($_POST['nonce'], ajax\nonce_name)
  ;
};
