<?php

namespace Tangible\Loop;

/**
 * Loop over each key-value pair of a map
 */

class MapKeysLoop extends ListLoop {

  static $config = [
    'name'     => 'map_keys',
    'title'    => 'Map keys',
    'category' => 'core',
  ];

  function run_query( $args = [] ) {
    return $args;
  }

  function get_items_from_query( $map ) {

    if ( ! is_array( $map )) $map = [];

    $keys = array_keys( $map );

    sort( $keys ); // TODO: Sort options

    $items = array_map(function( $key ) use ( $map ) {
      return [
        'key'   => $key,
        'value' => $map[ $key ],
      ];
    }, $keys);

    return $items;
  }
};

$loop->register_type( MapKeysLoop::class );
