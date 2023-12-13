<?php
/**
 * Fetch table data via AJAX
 */

use tangible\ajax;

ajax\add_public_action('tangible_table_data', function( $request ) use ( $html ) {

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
