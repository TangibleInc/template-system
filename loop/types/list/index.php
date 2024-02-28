<?php

namespace Tangible\Loop;

/**
 * Loop over arbitrary list of items
 */

class ListLoop extends BaseLoop {

  static $config = [
    'name'     => 'list',
    'title'    => 'List',
    'category' => 'core',
  ];

  function __construct($items = [], $args = []) {
    // Backward-compatible way to support query parameters  
    $args['query'] = $items;
    parent::__construct($args);
  }

  function get_items_from_query( $query ) {
    return $query;
  }

  /**
   * Field
   *
   * Inherited `get_field` method runs a filter for extended fields, then
   * calls `get_item_field` as needed.
   */
  function get_item_field( $item, $field_name, $args = [] ) {

    // Support passing JSON string
    if ( is_string( $item ) ) {
      try {
        $item = json_decode( $item, true );
      } catch (\Throwable $th) {
        // OK
      }
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

    /**
     * Special field name `value` gets the item itself
     * This supports `sort_field=value` for lists of string, number, etc. 
     */
    if ($field_name==='value') {
      return $item;
    }
  }

};

$loop->register_type( ListLoop::class );
