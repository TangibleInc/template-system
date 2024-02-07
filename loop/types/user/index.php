<?php
namespace Tangible\Loop;

use tangible\format;

require_once __DIR__ . '/field.php';

class UserLoop extends BaseLoop {

  static $config = [
    'name'       => 'user',
    'title'      => 'User',
    'category'   => 'core',
    'query_args' => [

      // @see https://developer.wordpress.org/reference/classes/wp_user_query/
      // @see https://developer.wordpress.org/reference/classes/WP_User_Query/prepare_query/

      'id'       => [
        'target_name' => 'include',
        'description' => 'User by ID',
        'type'        => [ 'string', 'array' ],
      ],

      'name'     => [
        'target_name' => 'login__in',
        'description' => 'User by name/slug',
        'type'        => [ 'string', 'array' ],
      ],

      'include'  => [
        'description' => 'Include users by ID or name',
        'type'        => [ 'string', 'array' ],
      ],

      'exclude'  => [
        'description' => 'Exclude users by ID or name',
        'type'        => [ 'string', 'array' ],
      ],

      'orderby'  => [
        'description' => 'Order by field',
        'type'        => [ 'string', 'array' ],
        'default'     => 'display_name', // Accepted values are 'ID', 'display_name' (or 'name'), 'include', 'user_login' (or 'login'), 'login__in', 'user_nicename' (or 'nicename'), 'nicename__in', 'user_email (or 'email'), 'user_url' (or 'url'), 'user_registered' (or 'registered'), 'post_count', 'meta_value', 'meta_value_num', the value of $meta_key, or an array key of $meta_query. To use 'meta_value' or 'meta_value_num', $meta_key must be also be defined. Default 'user_login'.
      ],

      'order'    => [
        'description' => 'Order: asc (ascending) or desc (descending)',
        'type'        => 'string',
        'default'     => 'asc',
        'accepts'     => [ 'asc', 'desc' ],
      ],

      'paged'    => [
        'target_name' => false,
        'description' => 'Items per page',
        'type'        => 'number',
        'default'     => 10,
      ],

      'role'     => [
        'target_name' => 'role__in',
        'description' => 'User role(s)',
        'type'        => [ 'string', 'array' ],
      ],

      'not_role' => [
        'target_name' => 'role__not_in',
        'description' => 'Exclude user role(s)',
        'type'        => [ 'string', 'array' ],
      ],

      // Important for handling large number of posts
      'fields'   => [
      'value'    => 'ids',
      'internal' => true, // Don't show in documentation
      ],
    ],
    'fields'     => [
      'id'                => [ 'description' => 'ID' ],
      'name'              => [ 'description' => 'Name' ],
      'full_name'         => [ 'description' => 'Full name' ],
      'email'             => [ 'description' => 'Email' ],
      'url'               => [ 'description' => 'URL' ],
      'archive_url'       => [ 'description' => 'Post archive URL' ],
      'edit_url'          => [ 'description' => 'Edit URL' ],
      'post_count'        => [ 'description' => 'Post count' ],
      'avatar'            => [ 'description' => 'Avatar image' ],
      'avatar_url'        => [ 'description' => 'Avatar URL' ],
      'registration_date' => [ 'description' => 'Registration date' ],
      'roles'             => [ 'description' => 'User role(s)' ],
      'locale'            => [ 'description' => 'User locale from the Language setting in profile edit screen' ],
    ],
  ];

  public $is_current_user = false;

  function run_query( $args ) {

    // Optimize for getting current user
    if ( isset( $args['id'] ) ) {
      $current_user_id = get_current_user_id();
      if ( $args['id'] === 'current' || $args['id'] === $current_user_id ) {

        // Passed to set_current() below
        $this->is_current_user = true;
        $this->current         = wp_get_current_user();

        return $this->items = [
          $current_user_id,
        ];
      }
    }

    $this->query_args = $this->create_query_args( $args );

    $this->query = isset( $this->query_args['query'] )
      ? $this->query_args['query'] // Query instance passed
      : new \WP_User_Query( $this->query_args );

    return $this->items = $this->query->get_results();
  }

  function create_query_args( $args = [] ) {

    $query_args = parent::create_query_args( $args );

    // Add support to handle ID or name
    foreach ( [
      'include' => 'login__in',
      'exclude' => 'login__not_in',
    ] as $key_for_id => $key_for_slug ) {

      if ( ! isset( $query_args[ $key_for_id ] ) ) continue;

      $values = $query_args[ $key_for_id ];
      unset( $query_args[ $key_for_id ] );

      if ( ! is_array( $values ) ) {
        $values = format\multiple_values($values);
      }

      foreach ( $values as $value ) {

        if ( $value === 'current' ) $value = get_current_user_id();

        if ( is_numeric( $value ) ) {

          // User ID

          if ( ! isset( $query_args[ $key_for_id ] ) ) {
            $query_args[ $key_for_id ] = [];
          }
          $query_args[ $key_for_id ] [] = $value;

        } else {
          // User slug
          if ( ! isset( $query_args[ $key_for_slug ] ) ) {
            $query_args[ $key_for_slug ] = [];
          }
          $query_args[ $key_for_slug ] [] = $value;
        }
      }
    }

    return $query_args;
  }

  function set_current( $id = false ) {

    // Optimize for getting current user - From run_query() above
    if ($this->is_current_user) return $this->current;

    $user          = get_user_by( 'id', $id );
    $this->current = &$user;

    return $user;
  }

  /**
   * Field - Override BaseLoop's get_field, since get_user_field() checks filtered field
   */
  function get_field( $field_name, $args = [] ) {

    // Ensure that current item exists
    if (empty( $this->current )) return;

    // If field name is empty, return the whole item
    if (empty( $field_name )) return $this->current;

    return $this->get_item_field( $this->current, $field_name, $args );
  }

  function get_item_field( $item, $field_name, $args = [] ) {
    return self::$loop->get_user_field( $item, $field_name, $args );
  }
};

$loop->register_type( UserLoop::class );
