<?php

/**
 * Actions
 */

$html->actions_done = [];

$html->is_action_done = function( $action ) use ( $html ) {
  return isset( $html->actions_done[ $action ] ) && $html->actions_done[ $action ];
};

$html->set_action_done = function( $action ) use ( $html ) {
  $html->actions_done[ $action ] = true;
};

/**
 * Head
 */

$html->head_action = function() use ( $html ) {
  $html->load_all_enqueued_styles();
  $html->set_action_done( 'head' );
};

add_action( 'wp_head', $html->head_action, 99 );
add_action( 'admin_head', $html->head_action, 99 );

/**
 * Footer
 */

$html->footer_action = function() use ( $html ) {
  $html->load_all_enqueued_styles(); // Just in case
  $html->load_all_enqueued_scripts();
  $html->set_action_done( 'foot' );
};

add_action( 'wp_footer', $html->footer_action, 99 );
add_action( 'admin_footer', $html->footer_action, 99 );

/**
 * Enqueue
 */

$html->enqueue_start_action = function() use ( $html ) {
  // This is useful to defer enqueue when called too early
  $html->set_action_done( 'enqueue_start' );
};

$html->enqueue_end_action = function() use ( $html ) {
  $html->set_action_done( 'enqueue' );
};

add_action( 'wp_enqueue_scripts', $html->enqueue_start_action, 0 );
add_action( 'wp_enqueue_scripts', $html->enqueue_end_action, 99 );

add_action( 'admin_enqueue_scripts', $html->enqueue_start_action, 0 );
add_action( 'admin_enqueue_scripts', $html->enqueue_end_action, 99 );
