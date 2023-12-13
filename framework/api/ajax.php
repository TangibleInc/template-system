<?php
namespace tangible\api;
use tangible\api;

// AJAX

function ajax_callback() {

  try {

    if (!api\verify_nonce()) return api\error('Not allowed');

    $request = isset($_POST['request']) ? json_decode(
      stripslashes_deep($_POST['request']),
      JSON_OBJECT_AS_ARRAY
    ) : [];

    if ( !is_array($request) ) $request = [];

    $name = $request['action'];
    $data = $request['data'];

    /**
     * Action callback can:
     * 
     * - Call api\send() or api\error(), which outputs JSON
     * response and exits
     * - Return a result to be sent
     * - Throw an error
     * 
     * All are standardized to response as { data } or { error }.
     */
    $result = api\action( $name, $data );

    return api\send( $result );

  } catch (\Throwable $th) {

    return api\error( $th->getMessage() );
  }  
}

// Logged-in users
add_action(
  'wp_ajax_' . api::$state->action_key,
  __NAMESPACE__ . '\\ajax_callback'
);

// Public
add_action(
  'wp_ajax_nopriv_' . api::$state->action_key,
  __NAMESPACE__ . '\\ajax_callback'
);
