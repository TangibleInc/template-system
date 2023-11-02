<?php

namespace Tangible\Loop;

/**
 * Loop over menu items
 *
 * @see https://developer.wordpress.org/reference/functions/wp_get_nav_menu_items
 * @see wp-admin/nav-menus.php
 */
class MenuLoop extends BaseLoop {

  static $config = [
    'name'       => 'menu',
    'title'      => 'Menu',
    'category'   => 'core',
    'query_args' => [
      'menu' => [
        'type' => 'string',
        'description' => 'Get menu by ID or title',
        'required'    => true,
      ],
    ],
    'fields' => [
      'id' => [ 'description' => 'Menu item ID' ],
      'title' => [ 'description' => 'Title' ],
      'url' => [ 'description' => 'URL' ],

      'type' => [ 'description' => 'Type: custom, post_type, taxonomy' ],
      'type_label' => [ 'description' => 'Type label: "Custom Link", post type label, or taxonomy label' ],
      'description' => [ 'description' => 'Description' ],
      'target' => [ 'description' => 'Target, if item is a custom link' ],

      'children' => [ 'description' => 'Loop instance of menu children, if any' ],
      'post' => [ 'description' => 'Loop instance of item as post' ],
      'taxonomy' => [ 'description' => 'Loop instance of item as taxonomy' ],

      'post_id' => [ 'description' => 'Post ID, if item is a post' ],
      'taxonomy_id' => [ 'description' => 'Taxonomy ID, if item is a taxonomy' ],
      'parent_id' => [ 'description' => 'Parent menu item ID, if any' ],
    ],
  ];

  function get_items_from_query( $query ) {

    // Items passed directly - See field "children" below
    if (isset($this->args['items'])) {
      return $this->args['items'];
    }

    $list = [];

    if (isset($query['menu'])) {

      $name = $query['menu'];

      if ($name==='all') {

        // TODO: Get all registered menus

        // $nav_menus = wp_get_nav_menus();

      } else {

        // Get menu by ID or title

        $list = wp_get_nav_menu_items( $name );
      }

    } elseif (isset($query['menu_location'])) {

      // TODO: Get menu by theme location name

      // $locations      = get_registered_nav_menus();
      // $menu_locations = get_nav_menu_locations();
    }

    /**
     * Menu items are given as flat list - Convert to tree
     */

    $items = [];
    $items_map = [
      // ID => Menu post
    ];

    // Menu can be false if not found
    if (!is_array($list)) return $items;

    foreach ($list as $item) {

      $parent_id = (int) $item->menu_item_parent; // Cast string to integer

      $items_map[ $item->ID ] = $item;

      if ($parent_id===0) {

        // Top-level parent

        $items []= $item;
        continue;
      }

      // Child item

      if (isset($items_map[ $parent_id ])) {

        $parent = &$items_map[ $parent_id ];

        if (!isset($parent->children)) {
          $parent->children = [];
        }
        $parent->children []= $item;
      }
    }

    return $items;
  }

  function get_item_field( $item, $field_name, $args = [] ) {

    // type, title, url, children

    switch ($field_name) {
      case 'id': return $item->ID;
      case 'children':
        return self::$loop->create_type('menu', [
          'items' => isset($item->children)
            ? $item->children
            : []
        ]);
      case 'post_id':
      case 'taxonomy_id':
        return $item->object_id;
      case 'parent_id':
        return $item->menu_item_parent;

      case 'post':
        return self::$loop->create_type(
          $item->object, // Post type name
          [
            'id' => $item->object_id
          ]
        );

      case 'taxonomy':
        return self::$loop->create_type(
          'taxonomy_term',
          [
            // 'taxonomy' => $item->object,
            'id' => $item->object_id
          ]
        );

      case 'type': // Menu type: custom, post_type, taxonomy
      case 'type_label': // Menu type label: Custom, Page/Post, Taxonomy
      case 'title':
      case 'url':
      case 'target':
      case 'attr_title':
      case 'description':
      default:
        if (isset($item->$field_name)) {
          return $item->$field_name;
        }
    }
  }
};

$loop->register_type( MenuLoop::class );
