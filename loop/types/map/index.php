<?php

namespace Tangible\Loop;

/**
 * Loop over a map of key-value pairs
 *
 * It's a loop with a single item.
 */

class MapLoop extends ListLoop {

  static $config = [
    'name'     => 'map',
    'title'    => 'Map',
    'category' => 'core',
  ];

  function get_items_from_query( $query ) {
    return [ $query ];
  }
};

$loop->register_type( MapLoop::class );

require_once __DIR__ . '/keys.php';
