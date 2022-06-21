<?php

namespace Tangible\Loop;

/**
 * Loop over each key-value pair of a field whose value is an array
 */

class FieldKeysLoop extends ListLoop {

  static $config = [
    'name'       => 'field_keys',
    'title'      => 'Field keys',
    'category'   => 'core',
    'query_args' => [],
    'fields'     => [],
  ];

  function get_items_from_query( $query ) {

    $this->items = [];

    if ( isset( $query['field_keys'] ) ) {

      $items = isset( $query['items'] )
        ? $query['items'] // Field value passed from $loop->create_type('field')
        : self::$loop->get_field( $query['field'] );

      if ( is_string( $items ) ) {
        $items = @json_decode( $items, true );
      }

      if ( is_array( $items ) ) {

        $map  = $items;
        $keys = array_keys( $map );

        sort( $keys ); // TODO: Sort options

        $items = array_map(function( $key ) use ( $map ) {
          return [
            'key'   => $key,
            'value' => $map[ $key ],
          ];
        }, $keys);

        $this->items = $items;
      }
    }

    return $this->items;
  }

};

$loop->register_type( FieldKeysLoop::class );
