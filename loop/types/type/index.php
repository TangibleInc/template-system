<?php

namespace Tangible\Loop;

/**
 * Loop over post types
 */

class PostTypeLoop extends BaseLoop {

  static $config = [
    'name'       => 'type',
    'title'      => 'Post Type',
    'category'   => 'core',
    'query_args' => [
      'name'  => [
        'description' => 'Get a single post type by name/slug.',
        'type'        => 'string',
      ],
      'public'  => [
        'description' => 'If true, only public post types will be returned.',
        'type'        => 'boolean',
        'default'     => true,
      ],
      'builtin' => [
        'target_name' => '_builtin',
        'description' => 'If true, will return WordPress default post types. Use false to return only custom post types.',
        'type'        => 'boolean',
        // 'default' => true,
      ],
      // publicly_queryable – Boolean
      // exclude_from_search – Boolean
      // show_ui – Boolean
      // capability_type
      // hierarchical
      // menu_position
      // menu_icon
      // permalink_epmask
      // rewrite
      // query_var
      // show_in_rest – Boolean. If true, will return post types whitelisted for the REST API
    ],
    'fields'     => [
      // @see https://developer.wordpress.org/reference/classes/wp_post_type/
      'name'         => [ 'description' => 'Post type name/slug' ],
      'label'        => [ 'description' => 'Post type label (singular)' ],
      'label_plural' => [ 'description' => 'Post type label (plural)' ],
      'description'  => [ 'description' => 'Post type description' ],
    ],
  ];

  function get_items_from_query( $query ) {

    // @see https://developer.wordpress.org/reference/functions/get_post_types
    $post_types = get_post_types( $query, 'objects' );

    // Associative array to array
    $items = [];
    foreach ( $post_types as $name => $type ) {
      $items [] = $type;
    }

    // TODO: Sort

    return $this->items = $items;
  }

  /**
   * Field
   *
   * Inherited `get_field` method runs a filter for extended fields, then
   * calls `get_item_field` as needed.
   */
  function get_item_field( $item, $field_name, $args = [] ) {

    switch ( $field_name ) {
      case 'name':
          return $item->name;
      case 'label':
          return $item->labels->singular_name;
      case 'label_plural':
          return $item->label;
      case 'description':
          return $item->description;
      default:
        if (isset( $item->$field_name )) return $item->$field_name;
    }
  }
};

$loop->register_type( PostTypeLoop::class );
