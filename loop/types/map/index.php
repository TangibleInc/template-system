<?php

namespace Tangible\Loop;

/**
 * Loop over a map of key-value pairs
 *
 * Technically not a loop, since it's always a single item.
 */

class MapLoop extends ListLoop {

  static $config = [
    'name'       => 'map',
    'title'      => 'Map',
    'category'   => 'core',
  ];

  function run_query( $args = [] ) {
    return $args;
  }

  function get_items_from_query( $args ) {
    return [$args];
  }
};

$loop->register_type( MapLoop::class );

require_once __DIR__.'/keys.php';
