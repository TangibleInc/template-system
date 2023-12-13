<?php

$html->is_table_enqueued     = false;
$html->is_table_enqueue_done = false;

$html->register_table_script = function() use ( $html ) {

  wp_register_script(
    'tangible-dynamic-table',
    "{$html->url}assets/build/dynamic-table.min.js",
    [ 'jquery', 'tangible-table', 'tangible-ajax' ],
    $html->version,
    true
  );

};

$html->enqueue_table = function() use ( $html ) {

  $html->is_table_enqueued = true;

  if ( $html->is_table_enqueue_done ) {
    $html->enqueue_table_hook();
  }
};

$html->enqueue_table_hook = function() use ( $html ) {

  $html->is_table_enqueue_done = true;

  if ( ! $html->is_table_enqueued ) return;

  wp_enqueue_style( 'tangible-table' );
  wp_enqueue_script( 'tangible-dynamic-table' );
};

add_action( 'wp_enqueue_scripts', $html->register_table_script, 0 );
add_action( 'admin_enqueue_scripts', $html->register_table_script, 0 );

add_action( 'wp_enqueue_scripts', $html->enqueue_table_hook, 99 );
add_action( 'admin_enqueue_scripts', $html->enqueue_table_hook, 99 );
