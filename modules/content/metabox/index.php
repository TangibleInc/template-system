<?php
/**
 * Idea: Ability to add metaboxes to a post type using template
 *
 * Implement input fields using Fields module
 */

$html->registered_metaboxes = []; // name => config

$html->register_metabox = function( $name, $config ) use ( $html ) {
  $html->registered_metaboxes[ $name ] = $config;
};

// Call from "init" action
$html->init_metaboxes = function() use ( $html ) {
  foreach ( $html->registered_metaboxes as $name => $config ) {
    $html->create_metabox( $name, $config );
  };
};

$html->create_metabox = function( $name, $config ) use ( $html ) {
  /*
  add_meta_box(
    $id,           // ID
    __('Content'), // Title
    function() {}, // Callback
    $post_type,    // Screen to show
    'normal',      // Context
    'high'         // Priority
  );
  */
};
