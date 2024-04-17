<?php
namespace tangible\ajax;
use tangible\ajax;

// Actions

function error($data = []) {
  wp_send_json_error(
    is_a($data, 'Exception')
      ? $data->getMessage()
      : (is_string($data) ? [ 'message' => $data ] : $data)
  );
};

function success($data = []) {
  wp_send_json_success($data);
};

function add_action($name, $fn, $options = []) {

  if (!isset($options['public']) || !$options['public']) {

    // Logged-in users only by default
    $action_name = "wp_ajax_tangible_ajax_{$name}";

  } else {

    // Public, not logged-in
    $action_name = "wp_ajax_nopriv_tangible_ajax_{$name}";

    // Register for logged-in users also
    unset($options['public']);
    ajax\add_action($name, $fn, $options);
  }

  \add_action($action_name, function() use ($fn) {

    if (!ajax\verify_nonce()) {
      return ajax\error('Bad nonce');
    }

    $data = isset($_POST['data']) ? stripslashes_deep($_POST['data']) : [];

    try {
      return ajax\success($fn($data, null)); // Was $fn($data, $ajax)
    } catch (\Throwable $err) {
      return ajax\error($err);
    }
  });
};

function add_public_action($name, $fn, $options = []) {
  return ajax\add_action($name, $fn, [ 'public' => true ] + $options);
};
