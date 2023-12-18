<?php

namespace tangible\template_system;
use tangible\template_system;

/**
 * Sortable post type
 *
 * Adds support for drag-and-drop sort in any post type, corresponding to field "menu_order"
 *
 * Adapted from: https://github.com/ColorlibHQ/simple-custom-post-order
 *
 * Moved from plugin framework
 */

$plugin->register_sortable_post_type = function( $type ) use ( $plugin ) {

  static $sortable_post_type = null;

  if ( ! $sortable_post_type ) {

    $url = template_system::$state->url . '/admin';
    $version = template_system::$state->version;
  
    require_once __DIR__ . '/class-sortable-post-type.php';

    $sortable_post_type = new SortablePostType(
      $url . '/post-types/sortable-post-type',
      $version
    );
  }

  $sortable_post_type->register( $type );
};
