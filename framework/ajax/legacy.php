<?php
namespace tangible\ajax;
use tangible\ajax;

/**
 * Backward compatibility with AJAX module in plugin framework
 */
function legacy() {
  static $ajax;
  if (!$ajax) {
    $ajax = new class {
      function enqueue() { return ajax\enqueue(); }
      function register_library() {
        return ajax\register();
      }
      function conditional_enqueue_library() {
        return ajax\conditional_enqueue();
      }
      function add_action($name, $fn, $options = []) {
        return ajax\add_action($name, $fn, $options);
      }
      function add_public_action($name, $fn, $options = []) {
        return ajax\add_public_action($name, $fn, $options);
      }
      function create_nonce() { return ajax\create_nonce(); }
      function verify_nonce() { return ajax\verify_nonce(); }
    };
  }
  return $ajax;
}
