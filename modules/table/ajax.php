<?php
/**
 * Fetch table data via AJAX
 */

use tangible\ajax;

ajax\add_public_action('tangible_table_data', function( $request ) use ( $html ) {

  if ( ! $html->table_is_valid_request( $request ) ) {
    return ajax\error([ 'message' => 'Not allowed' ]);
  }

  $data = $html->render_tag(
    'Table',
    wp_array_slice_assoc( $request, [
      'row_loop',
      'column_template',
      'column_order',
      // Attributes below rely on user data and are not covered by the hash
      'page',
      'per_page',
      'search',
      'search_columns',
      'sort_column',
      'sort_order',
      'sort_type',
      'filter_by_column_values',
    ] ),
    [],
    /**
     * We render <Table /> with user input as attributes, so `render_attributes`
     * needs to be false
     *
     * However, the content of the <Table /> needs to be rendered as
     * a template can contains dynamic attributes (which is safe, as the
     * template itself is covered by the hash)
     */
    [
      'render_attributes' => false,
      'inherit_options'   => false,
    ]
  );

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
