<?php
use tangible\ajax;

/**
 * Get post types
 */
ajax\add_action("{$prefix}get_post_types", function( $data ) {

  // if (false) return ajax\error([ 'message' => 'An error message' ]);

  // @see https://developer.wordpress.org/reference/functions/get_post_types
  $post_types = get_post_types([
    'public' => true,
    // '_builtin' => true,
  ], 'objects');

  $options = [
    // { label, value }
  ];

  foreach ( $post_types as $name => $type ) {
    $options [] = [
      'label' => $type->labels->singular_name,
      'value' => $name,
    ];
  }

  return $options;
});


/**
 * Get post type items
 */
ajax\add_action("{$prefix}get_post_type_items", function( $data ) {

  if (empty( $data['post_type'] )) return ajax\error([
    'message' => 'Property "post_type" is required',
  ]);

  $post_type = $data['post_type'];

  $posts = get_posts([
    'post_type'      => $post_type,
    'posts_per_page' => -1,
    'orderby'        => 'title',
    'order'          => 'ASC',

    // Performance optimization
    'no_found_rows'  => true,
  ]);

  $options = [
    // { label, value }
  ];

  foreach ( $posts as $post ) {
    $options [] = [
      'label' => $post->post_title,
      'value' => $post->ID,
    ];
  }

  return $options;
});
