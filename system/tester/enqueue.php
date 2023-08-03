<?php

// Register script and style

$tester->registered = false;

add_action('wp_enqueue_scripts', function() use ( $tester ) {

  wp_register_script(
    $tester->name,
    "{$tester->url}/assets/build/tester.min.js",
    [],
    $tester->version,
    true
  );

  wp_register_style(
    $tester->name,
    "{$tester->url}/assets/build/tester.min.css",
    [],
    $tester->version
  );

  $tester->registered = true;
}, 0);

// Enqueue

$tester->enqueued = false;
$tester->enqueue = function( $options = [] ) use ( $tester ) {

  if ($tester->enqueued) return;
  $tester->enqueued = true;

  $enqueue = function() use ( $tester, $options ) {
    wp_enqueue_script( $tester->name );
    wp_enqueue_style( $tester->name );
  };

  // During or after wp_enqueue_scripts
  if ($tester->registered) return $enqueue();

  // If called before register
  add_action( 'wp_enqueue_scripts', $enqueue );
};
