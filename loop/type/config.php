<?php

$loop->type_configs = [];

$loop->post_type_to_loop_type = []; // Original post type -> loop type
$loop->loop_type_to_post_type = []; // Loop type -> original post type

$loop->get_type_configs = function() use ( $loop ) {
  return $loop->type_configs;
};

$loop->get_type_config = function( $name, $default_to_post = true ) use ( $loop ) {

  $configs = $loop->get_type_configs();

  // Support loop type with different original post type name
  $name = $loop->get_loop_type( $name );

  // Fall back to "post" type, if config doesn't exist
  $config = isset( $configs[ $name ] ) ? $configs[ $name ]
    : ( $default_to_post // Unless called with ($name, false)
      ? $configs['post']
      : false
    );

  return $config;
};

$loop->get_post_type = function( $loop_type ) use ( $loop ) {

  if ( isset( $loop->loop_type_to_post_type[ $loop_type ] ) ) {
    return $loop->loop_type_to_post_type[ $loop_type ];
  }

  return $loop_type;
};

$loop->get_loop_type = function( $post_type ) use ( $loop ) {

  // Just in case: default WP query can return multiple post types
  if (is_array( $post_type )) return 'post';

  if ( isset( $loop->post_type_to_loop_type[ $post_type ] ) ) {
    return $loop->post_type_to_loop_type[ $post_type ];
  }

  return $post_type;
};
