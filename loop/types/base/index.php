<?php

namespace Tangible\Loop;

use tangible\date;

require_once __DIR__ . '/interface.php';

/**
 * Generic loop with query, items, cursor, field, pagination
 *
 * All loop types extend BaseLoop to wrap WordPress query classes (like WP_Query,
 * WP_User_Query, WP_Taxonomy) - or arbitrary items.
 *
 * Main methods to override are: run_query and get_item_field.
 *
 * A loop is typicaly used like:
 *
 * ```php
 * $user_loop = tangible_loop('user', [
 *   'orderby' => 'full_name',
 *   'order'   => 'asc'
 * ]);
 *
 * $results = $user_loop->map(function($user) {
 *   return [
 *     'id'        => $this->get_field( 'id' ),
 *     'full_name' => $this->get_field( 'full_name' ),
 *   ];
 * });
 * ```
 */

class BaseLoop extends \StdClass implements BaseLoopInterface {

  static $loop; // tangible_loop()
  static $html; // tangible_template()

  // Required config
  static $config = [
    'name'       => 'base',
    'query_args' => [

      /**
       * Generic query arguments supported for all loop types
       *
       * They all have target_name as false, to remove them from specific loop type queries.
       */

      'count'         => [
        'target_name' => false,
        'description' => 'Limit number of items',
        'type'        => 'number',
      ],

      'offset'        => [
        'target_name' => false,
        'description' => 'Offset loop by number of items to skip',
        'type'        => 'number',
      ],

      // Filter by field

      'field'         => [
        'target_name' => false,
        'description' => 'Filter by given field - If value is not set, it queries for posts whose field value exists',
        'type'        => 'string',
      ],
      'field_value'   => [
        'target_name' => false,
        'description' => 'Filter by given field value',
        'type'        => 'string',
      ],
      'field_compare' => [
        'target_name' => false,
        'description' => 'Compare using one of: "is" (default), "is_not", "before", "before_inclusive", "after", "after_inclusive", "in", "not_in", "exists", "not_exists"',
        'type'        => 'string',
      ],
      'field_type'    => [
        'target_name' => false,
        'description' => 'For field query, one of: string (default), number, date, time, datetime',
        'type'        => 'string',
      ],

      // Sort by field
      'sort_field'    => [
        'target_name' => false,
        'description' => 'Sort by given field name',
        'type'        => 'string',
      ],
      'sort_order'    => [
        'target_name' => false,
        'description' => 'Sort order: asc (ascending) or desc (descending)',
        'type'        => 'string',
        'default'     => 'asc',
        'accepts'     => [ 'asc', 'desc' ],
      ],
      'sort_type'     => [
        'target_name' => false,
        'description' => 'For sort query, one of: string (default), lowercase, number, date',
        'type'        => 'string',
      ],

    ],
    'fields'     => [],
  ];

  // Item operations
  static function get_item( $args ) {}
  static function create_item( $args ) {}
  static function update_item( $args ) {}
  static function remove_item( $args ) {}

  public $args = []; // Original arguments for constructor

  public $index      = -1;
  public $query      = [];
  public $query_args = [];

  public $items       = []; // Current paged items
  public $total_items = [];
  public $current     = null; // Current item

  public $page_query_var;
  public $current_page    = 1;
  public $items_per_page  = -1;
  public $items_offset    = 0;
  public $max_items_count = -1;

  public $filter_fields = [];

  public $sort_field = '';
  public $sort_order = 'asc';
  public $sort_type  = '';

  function __construct( $args = [] ) {

    $this->args = $args;

    $this->total_items = $this->get_items_from_query(
      $this->run_query( $this->args )
    );

    // Filter by fields

    if ( ! empty( $this->filter_fields ) ) {
      foreach ( $this->filter_fields as $field ) {
        $this->filter_by_field(
          $field['name'],
          $field['compare'],
          $field['value'],
          $field['type']
        );
      }
    }

    // Sort by field
    if ( ! empty( $this->sort_field ) ) {
      $this->sort_by_field(
        $this->sort_field,
        $this->sort_order,
        $this->sort_type
      );
    }

    // Offset

    if ( $this->items_offset > 0 ) {
      $this->total_items = array_slice( $this->total_items, $this->items_offset );
    }

    // Count

    if ( $this->max_items_count >= 0 ) {
      $this->total_items = array_slice( $this->total_items, 0, (int) $this->max_items_count );
    }

    $this->items = $this->get_current_page_items();

    return $this;
  }

  function __invoke( $fn ) {
    return $this->loop( $fn );
  }

  // Dynamic methods
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) {
      return call_user_func_array( $this->$method, $args );
    }
    $caller = current( debug_backtrace() );
    $name   = self::class;
    echo "Warning: Undefined method \"$method\" for {$name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>";
  }

  // Loop type name
  function get_name() {
    return $this::$config['name'];
  }

  // Loop type config
  function get_config() {
    return $this::$config;
  }

  // Query

  function create_query_args( $args ) {

    // Prepare custom filter, sort, pagination

    if ( isset( $args['page'] ) ) {
      $this->current_page = (int) $args['page'];
      unset( $args['page'] );
    }

    if ( isset( $args['paged'] ) ) {
      $this->items_per_page = (int) $args['paged'];
      unset( $args['paged'] );
    }

    if ( isset( $args['offset'] ) ) {
      $this->items_offset = (int) $args['offset'];
      unset( $args['offset'] );
    }

    if ( isset( $args['count'] ) ) {
      $this->max_items_count = (int) $args['count'];
      unset( $args['count'] );
    }

    // Filter by field(s)

    for ( $i = 1; $i <= 3; $i++ ) {

      $postfix = $i === 1 ? '' : '_' . $i;

      if ( ! isset( $args[ 'field' . $postfix ] )) break;

      $field = [
        'name'    => $args[ 'field' . $postfix ],
        'compare' => 'exists',
        'value'   => '',
        'type'    => 'string',
      ];

      unset( $args[ 'field' . $postfix ] );

      if ( isset( $args[ 'field_value' . $postfix ] ) ) {
        $field['value'] = $args[ 'field_value' . $postfix ];
        unset( $args[ 'field_value' . $postfix ] );

        // Default compare is "is", not "exists", if value is set
        if ( ! isset( $args[ 'field_compare' . $postfix ] ) ) {
          $field['compare'] = 'is';
        }
      }

      if ( isset( $args[ 'field_compare' . $postfix ] ) ) {
        $field['compare'] = $args[ 'field_compare' . $postfix ];
        unset( $args[ 'field_compare' . $postfix ] );
      }

      if ( isset( $args[ 'field_type' . $postfix ] ) ) {
        $field['type'] = $args[ 'field_type' . $postfix ];
        unset( $args[ 'field_type' . $postfix ] );
      }

      $this->filter_fields [] = $field;
    }

    // Sort by field

    if ( isset( $args['sort_field'] ) ) {
      $this->sort_field = $args['sort_field'];
      unset( $args['sort_field'] );
    }

    if ( isset( $args['sort_type'] ) ) {
      $this->sort_type = $args['sort_type'];
      unset( $args['sort_type'] );
    }

    if ( isset( $args['sort_order'] ) ) {
      $this->sort_order = $args['sort_order'];
      unset( $args['sort_order'] );
    }

    if ( isset( $args['query'] ) ) return [
      'query' => $args['query'],
    ];

    if ( ! isset( $this::$config['query_args'] )) return $args;

    /**
     * Pre-process given args based on defined query args
     *
     * @see utils/args.php
     */
    $query_args = self::$loop->get_args_from_config(
      $args,
      $this::$config['query_args']
    );

    return $query_args;
  }

  function create_query( $query_args ) {
    // By default, pass through query args -> query
    return $query_args;
  }

  function run_query( $args ) {

    $this->query_args = $this->create_query_args( $args );

    $this->query = isset( $this->query_args['query'] )
      ? $this->query_args['query'] // Query instance passed
      : $this->create_query( $this->query_args );

    // By default, pass through args from constructor -> query

    return $this->query;
  }

  function get_items_from_query( $query ) {
    // By default, pass through query -> items
    return $query;
  }

  // Loop

  function loop( $fn ) {

    $loop = self::$loop;

    if ( ! $this->has_next() ) {
      /**
       * Ensure last context is set even if loop is empty, so previous loop total
       * is correctly set to 0.
       */
      $loop->last_context = $this;
      return;
    }

    $loop->push_context( $this );

    $callback = $fn->bindTo( $this, $this );

    while ( $this->has_next() ) {
      $this->next();
      $callback( $this->current );
    }

    $this->reset();

    $loop->pop_context();
  }

  // Array utilities

  function each( $fn ) {
    return $this->loop( $fn ); } // Alias

  function map( $fn ) {

    $results  = [];
    $callback = $fn->bindTo( $this, $this );

    $this->loop(function( $item ) use ( &$results, $callback ) {
      if (is_null( $result = $callback( $item ) )) return;
      $results [] = $result;
    });
    return $results;
  }

  function reduce( $fn, $acc = [] ) {

    $callback = $fn->bindTo( $this, $this );

    $this->loop(function( $item ) use ( &$acc, $callback ) {
      if (is_null( $result = $callback( $item, $acc ) )) return;
      $acc = $result;
    });

    return $acc;
  }

  function filter( $fn ) {

    $current  = $this->current;
    $callback = $fn->bindTo( $this, $this );

    $this->items = array_filter( $this->items, $callback );

    $this->current     = $current;
    $this->total_items = $this->items;

    return $this->items;
  }

  function sort( $fn ) {

    $current  = $this->current;
    $callback = $fn->bindTo( $this, $this );

    usort( $this->items, $callback );

    $this->current     = $current;
    $this->total_items = $this->items;

    return $this->items;
  }

  function loop_current_item( $fn ) {

    $current = $this->current;
    $items   = $this->items;

    $this->items = [ $this->current ];

    $this->loop( $fn );

    $this->current = $current;
    $this->items   = $items;
  }

  // Cursor

  function get_current() {
    return $this->current;
  }

  function set_current( $item ) {
    return $this->current = &$item;
  }

  function next() {
    $this->index++;
    return $this->set_current(
      isset( $this->items[ $this->index ] )
        ? $this->items[ $this->index ]
        : null // Loop is empty
    );
  }

  function has_next() {
    return isset( $this->items[ $this->index + 1 ] );
  }

  function reset() {
    $this->index = -1;
  }

  // Field

  /**
   * Get current item's field value.
   *
   * Loop classes can override this, or the `get_item_field` method below.
   *
   * The latter is recommended, to allow the BaseLoop to check if current item exists,
   * and to automatically support extended fields by calling `get_filtered_field`.
   */
  function get_field( $field_name, $args = [] ) {

    // Ensure that current item exists
    if ( empty( $this->current ) ) {
      if ($this->index !== -1) return;

      // Start loop if it hasn't yet
      $this->next();
      if (empty( $this->current )) return;
    }

    // If field name is empty, return the whole item
    if (empty( $field_name )) return $this->current;

    /**
     * All get_field methods should call parent::get_filtered_field, to
     * allow plugins and integrations to add extended fields for a loop type.
     *
     * For example, a plugin may extend the `user` content type with additional
     * profile fields.
     *
     * @see $loop->get_filtered_field in /field/index.php
     */

    if ( ! is_null(
      $value = $this->get_filtered_field( $field_name, $args )
    )) return $value;

    // After all above checks passed, get current item's field

    return $this->get_item_field( $this->current, $field_name, $args );
  }

  function get_filtered_field( $field_name, $args = [] ) {
    return self::$loop->get_filtered_field(
      $this::$config['name'], // Loop type name
      $this->current,         // Current item
      $field_name,
      $args
    );
  }

  /**
   * Get a field value from given item.
   */

  function get_item_field( $item, $field_name, $args = [] ) {

    // By default, get field from object or associative array

    // Object
    if ( is_object( $item ) ) {
      if ( ! isset( $item->$field_name )) return;
      return $item->$field_name;
    }

    // Array
    if ( is_array( $item ) ) {
      if ( ! isset( $item[ $field_name ] )) return;
      return $item[ $field_name ];
    }

    /**
     * Special field name `value` gets the item itself
     * This supports `sort_field=value` for lists of string, number, etc. 
     */
    if ($field_name==='value') {
      return $item;
    } 
  }

  // Pagination

  function get_items() {
    return $this->items;
  }

  function get_items_count() {
    return count( $this->items );
  }

  function get_items_per_page() {
    return $this->items_per_page;
  }

  function get_total_items() {
    return $this->total_items;
  }

  function get_total_items_count() {
    return count( $this->total_items );
  }

  function get_total_pages() {
    return $this->items_per_page > 0
    ? ceil( $this->get_total_items_count() / $this->items_per_page )
    : 1;
  }

  function get_current_page() {
    return $this->current_page;
  }

  function get_current_page_items() {

    $items = $this->total_items;

    if ($this->items_per_page < 0) return $items;

    $per_page     = $this->items_per_page;
    $current_page = $this->current_page;

    $index = ( $current_page - 1 ) * $per_page;

    return array_slice( $items, $index, $per_page );
  }


  function set_items_per_page( $items_per_page ) {
    $this->items_per_page = $items_per_page;
  }

  function set_current_page( $current_page = 1 ) {
    $this->current_page = $current_page;
    $this->items        = $this->get_current_page_items();
    return $this;
  }


  // Sort

  function sort_by_field( $field_name, $order = 'asc', $sort_type = 'string' ) {

    $current = $this->current;
    $order = strtolower( $order ) === 'asc' ? 1 : -1;
    $date = \tangible\date();

    usort($this->total_items, function( $a, $b ) use ( $field_name, $order, $sort_type, $date ) {

      $this->current = $a;
      $a_value       = $this->get_field( $field_name );
      $this->current = $b;
      $b_value       = $this->get_field( $field_name );

      switch ( $sort_type ) {

        case 'date':
          if ( isset( $this->args['sort_date_format'] ) ) {

            // Convert from date format using Date module
            $format = $this->args['sort_date_format'];
            try {
              $a_value = $date
                ->createFromFormat( $format, $a_value )
                ->format( 'U' );
              $b_value = $date
                ->createFromFormat( $format, $b_value )
                ->format( 'U' );

            } catch ( \Throwable $th ) {
              $a_value = 0;
              $b_value = 0;
            }
          } else {
            $a_value = strtotime( $a_value );
            $b_value = strtotime( $b_value );
          }

          // Fall through

        case 'number':
          if ($a_value == $b_value) return 0;
            return ( $a_value < $b_value ? -1 : 1 ) * $order;
        break;

        case 'lowercase':
          $a_value = strtolower( $a_value );
          $b_value = strtolower( $b_value );
          // Fall through

        case 'string':
        default:
            return strcmp( $a_value, $b_value ) * $order;
        break;
      }
    });

    $this->current = $current;

    return $this->total_items;
  }

  // Filter

  function filter_by_field( $field_name, $field_compare = 'is', $field_value = '', $field_type = 'string' ) {

    $filtered_items = [];

    $field_compare = strtolower( $field_compare );

    $html = self::$html; // tangible_template();

    foreach ( $this->total_items as $item ) {

      $this->current = $item;
      $current_value = $this->get_field( $field_name );

      /**
       * Evaluate comparison using same logic as If tag
       *
       * @see /language/logic/comparison.php
       */

      $keep = $html->evaluate_logic_comparison(
        $field_compare, $field_value, $current_value
      );
  
      if ($keep) $filtered_items [] = $item;
    }

    $this->reset();
    $this->total_items = $filtered_items;

    return $this->total_items;
  }

}

/**
 * Provide Loop module as static property to all loop type classes
 */
BaseLoop::$loop = $loop; // tangible_loop()

// Provided by /core.php after Template module loaded
// BaseLoop::$html = $html; // tangible_template()
