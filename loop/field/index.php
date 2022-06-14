<?php

$loop->get_field = function($field_name, $atts = [], $third_arg = []) use ( $loop ) {

  if (is_string($atts)) {

    // get_field($loop_type, $field_name, $atts)

    $loop_type = $field_name;
    $field_name = $atts;
    $atts = $third_arg;

    $atts['type'] = $loop_type;
  }

  if ( isset( $atts['type'] ) ) {

    // Single-use loop: <Field title type=post name=hello-world />

    $current_loop = $loop->create_type( $atts['type'], $atts );

    // Forward cursor to first item
    $current_loop->next();

  } else {

    $current_loop = $loop->get_current();

    // Handle edge case when default WP_Query has posts, but loop is empty
    if (empty($current_loop->items)
      && isset($current_loop->args['query'])
      && !empty($current_loop->args['query']->posts)
      && is_a($current_loop->args['query']->posts[0], 'WP_Post')
    ) {

      $post = $current_loop->args['query']->posts[0];

      $current_loop = $loop->create_type($post->post_type, [
        'id' => $post->ID
      ]);
    }

    // Start loop if needed
    if ($current_loop->index < 0) {
      $current_loop->next();
    }
  }

  $content = $current_loop->get_field( $field_name, $atts );

  return $content;
};

/**
 * Field filter
 *
 * Allows registering a callback to get extended fields for a loop type.
 */

$loop->field_filters_by_type = [
  // type => filter[]
];

$loop->add_field_filter = function($type, $filter) use ($loop) {

  if (!isset($loop->field_filters_by_type[ $type ])) {
    $loop->field_filters_by_type[ $type ] = [];
  }

  // Added filter has priority over existing ones

  array_unshift($loop->field_filters_by_type[ $type ], $filter);
};

/**
 * Filtered field
 *
 * This is used by BaseLoop::get_field(). Return null to let it continue with default fields.
 */

$loop->get_filtered_field = function($type, $current_item, $field_name, $args) use ($loop) {

  $result = null;

  if ( ! isset($loop->field_filters_by_type[ $type ]) ) return $result;

  $filters = $loop->field_filters_by_type[ $type ];

  foreach ($filters as $filter) {

    $result = $filter( $current_item, $field_name, $args );

    if ( ! is_null($result) ) break;
  }

  return $result;
};
