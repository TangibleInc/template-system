<?php

/**
 * Enqueue module scripts and styles, as scheduled by $interface->enqueue()
 */

$interface->enqueued_modules     = [];
$interface->enqueue_modules_done = false;

$interface->enqueue_modules = function() use ( $interface ) {

  foreach ( $interface->enqueued_modules as $name ) {

    $handle = "tangible-{$name}";

    if ( wp_script_is( $handle, 'registered' ) ) {
      wp_enqueue_script( $handle );
    }

    if ( wp_style_is( $handle, 'registered' ) ) {
      wp_enqueue_style( $handle );
    }
  }

  $interface->enqueued_modules     = [];
  $interface->enqueue_modules_done = true;
};

add_action( 'wp_enqueue_scripts', $interface->enqueue_modules, 10 );

/**
 * Schedule for enqueue
 */

$interface->enqueue = function( $names = [] ) use ( $interface ) {

  if (is_admin()) return $interface->admin_enqueue( $names );

  $names = is_string( $names ) ? [ $names ] : $names;

  foreach ( $names as $name ) {
    if ( ! in_array( $name, $interface->enqueued_modules ) ) {
      $interface->enqueued_modules [] = $name;
    }
  }

  // Manually enqueue if called after wp_enqueue_scripts action
  if ( $interface->enqueue_modules_done ) {
    $interface->enqueue_modules();
  }
};
