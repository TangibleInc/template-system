<?php
/**
 * Fetch table data via AJAX
 */

use tangible\ajax;

ajax\add_public_action('tangible_table_data', function( $request ) use ( $html ) {

  if ( ! $html->table_is_valid_request( $request ) ) {
    return ajax\error([ 'message' => 'Not allowed' ]);
  }

  $data = $html->render_tag( 'Table', $request );

  // Return only what's needed

  $response = [];

  foreach ( [
    'rows'        => [],
    'page'        => 1,
    'per_page'    => 10,
    'total_pages' => 1,

  ] as $key => $default_value ) {
    $response[ $key ] = isset( $data[ $key ] ) ? $data[ $key ] : $default_value;
  }

  return $response;
});
