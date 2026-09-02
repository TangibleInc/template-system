<?php

$html->table_is_valid_request = function( $request ) use( $html ) {

  $has_valid_hash = $html->verify_tag_attributes_hash(
    $html->table_signed_attributes( $request ),
    $request['hash'] ?? ''
  );
  if ( ! $has_valid_hash ) return false;

  $has_valid_filter = $html->table_signed_verify_filter_value( $request );
  if ( ! $has_valid_filter ) return false;

  return true;
};

/**
 * Tables can be rendered from an ajax request (pagination, orderby, filter...)
 *
 * We generate a hash according to those attributes. A client request must send
 * the hash alongside the attributes. We re-generate the hash from the client
 * attributes on backend and validate it's the same hash
 *
 * The hash is visible client-side and sent from it but it can't generate one
 * as wp_hash relies on wp_salt('auth')
 *
 * @see language/utils/hash.php
 * @see https://developer.wordpress.org/reference/functions/wp_hash/
 * @see https://developer.wordpress.org/reference/functions/wp_salt/
 */
$html->table_signed_attributes = function( $table ) use ( $html ) {

  $filter_loop_keys = $table['filter_loop_keys'] ?? [];
  $row_loop         = $table['row_loop'] ?? [];

  /**
   * The value of $table['row_loop'] may vary when the table has a filter,
   * so filterable attribute values are excluded from the hash
   *
   * The name of the attribute and the allowed values exist in $table['filter_loop_keys']
   * and $table['filter_loop_options'], which won't change between requests
   * and are used for the hash
   */
  foreach ( $filter_loop_keys as $key ) {
    unset( $row_loop['attributes'][ $key ] );
  }

  return $html->table_signed_format( [
    'column_template'     => $table['column_template']     ?? [],
    'column_order'        => $table['column_order']        ?? [],
    'column_sort_type'    => $table['column_sort_type']    ?? [],
    'filter_loop_keys'    => $filter_loop_keys,
    'filter_loop_options' => $table['filter_loop_options'] ?? [],
    'row_loop'            => $row_loop,
  ] );
};

/**
 * Must run after the hash validation, so that the client can't lie about
 * the allowed filter values
 */
$html->table_signed_verify_filter_value = function( $table ) {

  $filter_loop_options = $table['filter_loop_options'] ?? [];
  $attributes          = $table['row_loop']['attributes'] ?? [];

  foreach ( $filter_loop_options as $name => $allowed ) {
    if ( ! isset( $attributes[ $name ] ) ) continue;
    if ( ! in_array( $attributes[ $name ], $allowed, true ) ) return false;
  }

  return true;
};

/**
 * The ajax module format data using $.ajax, which strips empty arrays
 * so we need to strips them as well otherwise hashes won't match
 */
$html->table_signed_format = function( $value ) use ( $html ) {

  if ( ! is_array( $value ) ) return $value;

  return array_filter(
    array_map( $html->table_signed_format, $value ),
    fn( $item ) => $item !== []
  );
};
