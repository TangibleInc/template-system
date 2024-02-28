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

  function get_items_from_query( $map ) {

    if ( ! is_array( $map )) $map = [];

    $items = array_map(function( $key ) use ( $map ) {
      return [
        'key'   => $key,
        'value' => $map[ $key ],
      ];
    }, array_keys( $map ));

    return $items;
  }
};

$loop->register_type( MapKeysLoop::class );
