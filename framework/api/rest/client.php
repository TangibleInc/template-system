<?php
namespace tangible\api;
use tangible\api;

function rest($method, $route, $data = [], $options = []) {

  $method = strtoupper($method);
  $request = new \WP_REST_Request( $method, $route );

  if ($method==='GET') {
    $request->set_query_params( $data );
  } else {
    // POST, PUT, PATCH, DELETE
    $request->set_body_params( $data );
  }

  $response = rest_do_request( $request );

  if ( $response->is_error() ) {

    /**
     * Return WP_Error object
     * Caller should check is_wp_error( $result )
     */
     return $response->as_error();
  }

  // $response->get_data()

  /**
   * Embed option - If true, fields like authors and featured images are embedded.
   *
   * @see https://developer.wordpress.org/reference/classes/wp_rest_server/response_to_data/
   */
  $embed = $options['embed'] ?? false;

  return rest_get_server()->response_to_data(
    $response,
    $embed
  );
}
