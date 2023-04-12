<?php

namespace Tangible\TemplateSystem;

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

    require_once __DIR__ . '/class-sortable-post-type.php';

    $sortable_post_type = new SortablePostType(
      $plugin->url . '/post-types/sortable-post-type',
      $plugin->version
    );
  }

  $sortable_post_type->register( $type );
};

/**
 * Replace plugin framework's module until framework is removed eventually
 */
$framework->register_sortable_post_type = $plugin->register_sortable_post_type;
