<?php
namespace Tangible\Loop;

use tangible\format;

require_once __DIR__ . '/field.php';

/**
 * Taxonomy term loop
 *
 * @see https://developer.wordpress.org/reference/classes/WP_Term_Query/__construct/
 */

class TaxonomyTermLoop extends BaseLoop {

  /**
   * Custom taxonomy loop types that extend this class
   *
   * See bottom of file for how to register such classes.
   */
  static $taxonomy_loop_types = [
    // name => className,
  ];

  static $config = [
    'name'       => 'taxonomy_term',
    'category'   => 'core',
    'title'      => 'Taxonomy Term',

    'query_args' => [

      'taxonomy' => [
        'description' => 'Get terms by taxonomy',
        'required'    => true,
        'type'        => 'string',
      ],

      'id' => [
        'description' => 'Get terms by ID(s)',
        'target_name' => 'include',
        'type'        => ['number', 'array'],
      ],

      'name' => [
        'description' => 'Get terms by name/slug(s)',
        'target_name' => 'include',
        'type'        => ['string', 'array'],
      ],

      'post' => [
        'description' => 'Corresponding post ID(s) for term retrieval or "current" for current post',
        'target_name' => 'object_ids',
        'type'        => ['number', 'array']
      ],

      'include' => [
        'description' => 'Include terms by ID(s) or slug(s)',
        'type'        => ['string', 'array']
      ],
      'exclude' => [
        'description' => 'Exclude terms by ID(s) or slug(s)',
        'type'        => ['string', 'array'],
      ],
      'terms' => [
        'description' => 'Alias for "include"',
        'type'        => ['string', 'array'],
        'target_name' => 'include',
      ],

      'parent' => [
        'description' => 'Get terms by its parent term\'s ID or slug',
        'type'        => ['number', 'string']
      ],

      'parents' => [
        'description' => 'Set true to include only top-level parent terms',
        'type'        => ['boolean'],
        'target_name' => false,
      ],
      'children' => [
        'description' => 'Set true to include only child terms',
        'type'        => ['boolean'],
        'target_name' => false, // Don't pass to taxonomy term query
      ],

      'orderby'       => [
        'description' => 'Order by one of: name, title (default), term_id, menu_order, count',
        'type'        => 'string',
        'default'     => 'title',
      ],

      'order'         => [
        'description' => 'Order: asc (ascending) or desc (descending)',
        'type'        => 'string',
        'default'     => 'asc',
        'enum'        => ['asc', 'desc'],
      ],

      'orderby_field' => [
        'description' => 'Order by custom field',
        'type'        => 'string',
      ],

      'orderby_field_number' => [
        'description' => 'Order by custom field whose value is a number',
        'type'        => 'string',
      ],

      'hide_empty' => [
        'description' => 'Hide terms not assigned to any post - true or false (default)',
        'type'        => 'boolean'
      ],
    ],
    'fields'     => [
      'id' => [ 'description' => 'Term ID' ],
      'name' => [ 'description' => 'Term name' ],
      'title' => [ 'description' => 'Term title' ],
      'url' => [ 'description' => 'URL to term archive page' ],
      'count' => [ 'description' => 'Post count' ],
      'taxonomy' => [ 'type' => 'taxonomy', 'description' => 'Taxonomy name (or loop instance)' ],
      'parent' => [ 'type' => 'taxonomy_term', 'description' => 'Parent term ID (or loop instance)' ],
      'children' => [ 'type' => 'taxonomy_term', 'description' => 'Children term IDs (or loop instance)' ],
      'ancestors' => [ 'type' => 'taxonomy_term', 'description' => 'Ancestor term IDs (or loop instance) from lowest to highest level; Set reverse=true to go from top-level down' ],
      'posts' => [ 'type' => 'post', 'description' => 'Loop instance of posts that belong to current term' ]
    ],

    'default_orderby_fields' => [
      'name',
      'slug',
      'term_group',
      'term_id',
      'id',
      'description',
      'parent',
      'menu_order',
      'term_order',
      'include', // Order as given in "include" query
      'count'
    ],
  ];

  function create_query_args( $args ) {

    /**
     * By parent term
     */
    if ( isset($args['parent']) ) {

      if (is_numeric($args['parent'])) {

        $args['parent'] = (int) $args['parent'];

      } else {

        // Add support for passing parent term slug

        $parent = get_term_by(
          'slug',
          $args['parent'],
          isset($args['taxonomy']) ? $args['taxonomy'] : ''
        );

        $args['parent'] = $parent===false
          ? -1 // Not found - Force empty
          : $parent->term_id
        ;
      }
    }

    // Get top-level parents
    if (isset($args['parents']) && $args['parents']==='true') {
      $args['parent'] = 0;
    }

    if (isset($args['taxonomy'])) {

      // Aliases

      if ($args['taxonomy']==='tag') {
        $args['taxonomy'] = 'post_tag';
      }
    }

    return parent::create_query_args( $args );
  }

  function get_items_from_query( $query_args ) {

    // Taxonomy property is not required if term ID is given
    $taxonomy = isset($query_args['taxonomy']) ? $query_args['taxonomy'] : '';

    $defaults = [
      'hide_empty' => false,
    ];

    /**
     * By post(s) - By this point, query args have been processed
     */
    if ( isset($query_args['object_ids']) ) {

      if( ! is_array($query_args['object_ids']) ) {
        $query_args['object_ids'] = format\multiple_values($query_args['object_ids']);
      }

      foreach ($query_args['object_ids'] as $index => $value) {
        if ($value === 'current') { // Current post ID
          global $post;
          $query_args['object_ids'][$index] = !empty($post) ? $post->ID : -1;
        }
      }
    }

    // Convert slugs to IDs

    foreach ([
      'include',
      'exclude',
    ] as $key) {

      if ( ! isset($query_args[ $key ])) continue;

      if (!is_array($query_args[ $key ])) {
        $query_args[ $key ] = [$query_args[ $key ]];
      }

      foreach ($query_args[ $key ] as $index => $value) {

        if (is_integer( $value ) || is_numeric( $value )) {
          // ID
        } else {

          $term = null;

          if ($value==='current') {

            /**
             * Current taxonomy term when in taxonomy archive
             */

            $object = get_queried_object();

            if ( $object instanceof \WP_Term ) {
              $term = $object;
            }

          } else {
            // Slug
            $term = get_term_by('slug', $value, $taxonomy);
          }

          if (empty($term)) {

            // Not found by slug or current
            unset( $query_args[ $key ][ $index ] );

          } else {
            $query_args[ $key ][ $index ] = $term->term_id;
          }
        }
      }

      if ($key==='include') {

        if (empty( $query_args[$key] )) {

          // Ensure empty result when slug or current not found

          unset( $query_args[$key] );
          $query_args['object_ids'] = -1;

        } elseif (!isset($this->args['orderby'])) {

          // Default orderby, if not given in original arguments
          $query_args['orderby'] = 'include';
        }
      }
    }

    /**
     * Order by field
     *
     * Only pass through supported orderby fields. For extended fields, manually sort afterwards.
     */

    if (isset($query_args['order'])) {
      $query_args['order'] = strtoupper( $query_args['order'] );
    }

    $custom_orderby = false;

    // Aliases

    if ($query_args['orderby']==='name') {
      $query_args['orderby'] = 'slug';
    } elseif ($query_args['orderby']==='menu') {
      $query_args['orderby'] = 'menu_order';
    }

    if (isset($query_args['orderby_field'])) {

      $custom_orderby = $query_args['orderby_field'];
      unset($query_args['orderby_field']);

      if (!isset($query_args['order_type'])) $query_args['order_type'] = 'string';

    } elseif (isset($query_args['orderby_field_number'])) {

      $custom_orderby = $query_args['orderby_field_number'];
      unset($query_args['orderby_field_number']);

      if (!isset($query_args['order_type'])) $query_args['order_type'] = 'number';

    } elseif ( ! in_array($query_args['orderby'], self::$config['default_orderby_fields']) ) {

      $custom_orderby = $query_args['orderby'];
      unset($query_args['orderby']);
    }

    /**
     * Hide empty
     *
     * Must manually filter after query, because WP_Term_Query is incorrectly
     * hiding terms that actually have posts.
     */

    $hide_empty = false;

    if (!empty($query_args['hide_empty'])) {
      $hide_empty = true;
      unset($query_args['hide_empty']);
    }


    // Query

    $query = $this->query = new \WP_Term_Query( $query_args + $defaults );

    $items = $query->get_terms();

    // Filter

    if ($hide_empty) {
      $items = array_values(array_filter($items, function($item) {
        return $item->count > 0;
      }));
    }

    // Only child terms
    if ((isset($this->args['parents']) && $this->args['parents']==='false')
      || (isset($this->args['children']) && $this->args['children']==='true')
    ) {
      $items = array_values(array_filter($items, function($item) {
        return !empty($item->parent);
      }));
    }

    /**
     * Sort: Extended orderby fields not supported by WP_Term_Query
     * @see loop/types/base.php, BaseLoop::__construct()
     */

    if (!empty($custom_orderby)) {
      $this->sort_field = $custom_orderby;
      $this->sort_order = $query_args['order'];
      $this->sort_type  = isset($query_args['order_type']) ? $query_args['order_type'] : 'string';
    }

    return $items;
  }

  /**
   * Field
   *
   * Inherited `get_field` method runs a filter for extended fields, then
   * calls `get_item_field` as needed.
   */
  function get_item_field( $item, $field_name, $args = [] ) {
    return self::$loop->get_taxonomy_term_field( $item, $field_name, $args );
  }
};

$loop->taxonomy_aliases = [];

/**
 * Custom loop type creator to instantiate registered taxonomy loop type classes
 */

 TaxonomyTermLoop::$config['create'] = function( $args = [] ) use($loop) {

  $taxonomy = isset($args['taxonomy']) ? $args['taxonomy'] : '';

  if( isset( $loop->taxonomy_aliases[$taxonomy] ) ) {
    $taxonomy = $loop->taxonomy_aliases[$taxonomy];
    $args['taxonomy'] = $taxonomy;
  }

  $class_name = isset(TaxonomyTermLoop::$taxonomy_loop_types[ $taxonomy ])
    ? TaxonomyTermLoop::$taxonomy_loop_types[ $taxonomy ]
    : TaxonomyTermLoop::class
  ;

  return new $class_name( $args );
};

/**
 * Register taxonomy loop type
 */

$loop->register_taxonomy = function( $class_name ) {
  TaxonomyTermLoop::$taxonomy_loop_types[
    $class_name::$config['name']
  ] = $class_name;
};

$loop->register_type( TaxonomyTermLoop::class );
