<?php

namespace Tangible\Loop;

/**
 * Loop over a field whose value is an array, like a repeater
 */

class FieldLoop extends ListLoop {

  static $config = [
    'name'       => 'field',
    'title'      => 'Field',
    'category'   => 'core',
    'query_args' => [],
    'fields'     => [],
  ];

  function get_items_from_query( $query ) {

    $this->items = [];

    $items = isset( $query['items'] )
      ? $query['items'] // Field value passed from $loop->create_type('field')
      : ( isset( $query['field'] )
        ? self::$loop->get_field( $query['field'] )
        : []
      );

    if (empty( $items )) return $this->items;

    if ( is_string( $items ) ) {

      $this->items = $items = @json_decode( $items, true );
    }

    if ( is_array( $items ) ) {
      // Associative array
      if ( array_keys( $items ) !== range( 0, count( $items ) - 1 ) ) {
        $this->items = [ $items ];
      } else {
        $this->items = $items;
      }
    }

    return $this->items;
  }

};

$loop->register_type( FieldLoop::class );

require_once __DIR__ . '/keys.php';
