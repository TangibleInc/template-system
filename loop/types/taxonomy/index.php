<?php

namespace Tangible\Loop;

/**
 * Taxonomy loop
 *
 * @see https://developer.wordpress.org/reference/functions/get_taxonomies/
 * @see https://developer.wordpress.org/reference/classes/wp_taxonomy/
 */

class TaxonomyLoop extends BaseLoop {

  static $loop;

  static $config = [
    'name'       => 'taxonomy',
    'title'      => 'Taxonomy',
    'category'   => 'core',
    'query_args' => [

      'name' => [
        'description' => 'Get taxonomies by name/slug(s)',
        'type'        => ['string', 'array'],
      ],

      'public' => [
        'description' => 'Get public taxonomies (true/false)',
        'type'        => 'boolean',
      ],

      'core' => [
        'target_name' => '_builtin',
        'description' => 'Get built-in taxonomies (true/false)',
        'type'        => 'boolean',
      ],

      'orderby'       => [
        'description' => 'Order by field',
        'type'        => 'string',
        'default'     => 'title',
      ],
      'order'         => [
        'description' => 'Order: asc (ascending) or desc (descending)',
        'type'        => 'string',
        'default'     => 'asc',
        'enum'        => ['asc', 'desc'],
      ],
    ],
    'fields'     => [
      'name'           => [ 'description' => 'Name/slug' ],
      'title'          => [ 'description' => 'Same as field "label"' ],
      'label'          => [ 'description' => 'Label (singular)' ],
      'label_plural'   => [ 'description' => 'Label (plural)' ],
      'description'    => [ 'description' => 'Description' ],
    ],
  ];

  function create_query( $query_args = [] ) {

    $taxonomy_query_args = [];

    foreach ([

      /**
       * If a taxonomy is registered with multiple post types, get_taxonomies *will not*
       * get them by name..
       *
       * @see https://core.trac.wordpress.org/ticket/27918
       */
      // 'name',

      'public',
      '_builtin',
    ] as $key) {
      if (!isset($query_args[ $key ])) continue;
      $taxonomy_query_args[ $key ] = $query_args[ $key ];
    }

    $taxonomies = get_taxonomies($taxonomy_query_args, 'objects');

    // Associative array to array

    $items = [];

    foreach ($taxonomies as $name => $taxonomy) {

      // Filter by name manually
      if (isset($query_args['name']) && !in_array($name, $query_args['name'])) continue;

      $items []= $taxonomy;
    }

    /**
     * Sort: Extended orderby fields
     * @see loop/types/base.php, BaseLoop::__construct()
     */
    if (isset($query_args['orderby'])) {
      $this->sort_field = $query_args['orderby'];
      $this->sort_order = $query_args['order'];
      $this->sort_type  = isset($query_args['order_type']) ? $query_args['order_type'] : 'string';
    }

    return $items;
  }

  function set_current( $taxonomy = false ) {
    $this->current = &$taxonomy;
    return $this->current;
  }

  /**
   * Field
   *
   * Inherited `get_field` method runs a filter for extended fields, then
   * calls `get_item_field` as needed.
   */
  function get_item_field( $item, $field_name, $args = [] ) {

    switch ($field_name) {

      /*

      WP_Taxonomy instance

      [name] =>
      [label]
      [hierarchical] =>
      [update_count_callback] =>
      [rewrite] =>
      [query_var] =>
      [public] =>
      [show_ui] =>
      [show_tagcloud] =>
      [_builtin] =>
      [labels] => stdClass Object (
        [name] =>
        [singular_name] =>
        [search_items] =>
        [popular_items] =>
        [all_items] =>
        [parent_item] =>
        [parent_item_colon] =>
        [edit_item] =>
        [view_item] =>
        [update_item] =>
        [add_new_item] =>
        [new_item_name] =>
        [separate_items_with_commas] =>
        [add_or_remove_items] =>
        [choose_from_most_used] =>
        [menu_name] =>
        [name_admin_bar] =>  )
      [show_in_nav_menus] =>
      [cap] => stdClass Object (
        [manage_terms] =>
        [edit_terms] =>
        [delete_terms] =>
        [assign_terms] =>  )
      [object_type] => Array ()
      */
      case 'all':

        $defined_fields = [];
        foreach (TaxonomyLoop::$config['fields'] as $key => $config) {
          if ($key==='all' || substr($key, -2)==='_*') continue;
          $defined_fields[ $key ] = $this->get_item_field( $item, $key, $args );
        }

        ob_start();
        ?><pre><code><?php
        print_r( $defined_fields );
        ?></code></pre><?php
        $value = ob_get_clean();
      break;

      case 'name': return $item->name;
      case 'title':
      case 'label': return $item->labels->singular_name;
      case 'label_plural': return $item->label;
      case 'description': return $item->description;
      case 'terms':

        // Return instance of TaxonomyTermLoop

        return self::$loop->create_type('taxonomy_term', array_merge([
          'taxonomy' => $item->name,
        ], $args));

      default:
        if (isset($item->$field_name)) return $item->$field_name;
    }
  }

  /**
   * Support Field tag displaying loop instance as value
   */
  function get_as_field_value( $atts = [] ) {
    if ($this->get_items_count() === 1) {
      return $this->get_item_field( $this->total_items[0], 'name', $atts );
    }

    // Default to display array of taxonomy names
    return array_map(function($item) {
      return $item->name;
    }, $this->total_items);
  }

};

TaxonomyLoop::$loop = $loop;

$loop->register_type( TaxonomyLoop::class );
