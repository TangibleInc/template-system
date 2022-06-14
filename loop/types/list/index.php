<?php

namespace Tangible\Loop;

/**
 * Loop over arbitrary list of items
 */

class ListLoop extends BaseLoop {

  static $config = [
    'name'       => 'list',
    'title'      => 'List',
    'category'   => 'core',
  ];

  function run_query( $args = [] ) {
    return $args;
  }

  function get_items_from_query( $args ) {
    return $args;
  }

  /**
   * Field
   *
   * Inherited `get_field` method runs a filter for extended fields, then
   * calls `get_item_field` as needed.
   */
  function get_item_field( $item, $field_name, $args = [] ) {

    // Support passing JSON string
    if (is_string($item)) {
      $item = @json_decode($item, true);
    }

    // By default, get field from object or associative array

    // Object
    if ( is_object( $item ) ) {
      if ( ! isset( $item->$field_name )) return;
      return $item->$field_name;
    }

    // Array
    if ( is_array( $item ) ) {
      if ( ! isset( $item[ $field_name ] )) return;
      return $item[ $field_name ];
    }
  }

};

$loop->register_type( ListLoop::class );
