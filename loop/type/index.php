<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/action.php';
require_once __DIR__ . '/register.php';

/**
 * Create loop of type
 */
$loop->create_type = function( $type_name, $args = [], $context = [] ) use ( $loop ) {

  /**
   * Support fields that return a loop instance
   *
   * This must be done outside FieldLoop, because it can be a different loop type.
   */
  if (
    ( $type_name === 'field' || $type_name === 'field_keys' ) && ! isset( $args['items'] )
  ) {

    $field_name = isset( $args[ $type_name ] ) ? $args[ $type_name ] : '';

    /**
     * Support getting currently queried object on an archive page as field loop:
     * archive_author, archive_term, archive_post_type
     *
     * @see https://developer.wordpress.org/reference/functions/get_queried_object/
     */
    if ( substr( $field_name, 0, 8 ) === 'archive_' ) {

      $object_id = get_queried_object_id();

      if (empty( $object_id )) return new \Tangible\Loop\BaseLoop( [] ); // Empty loop

      $type = substr( $field_name, 8 );

      if ($type === 'author') $type   = 'user';
      elseif ($type === 'term') $type = 'taxonomy_term';
      // ..or post_type

      return $loop->create_type($type, [
        'id' => $object_id,
      ]);
    }

    // Pass possible Field options, excluding Loop attributes
    $field_atts = $args;
    foreach ( [ 'type', 'field' ] as $key ) {
      unset( $field_atts[ $key ] );
    }

    $value = $loop->get_field( $field_name, $field_atts );

    if ( $loop->is_instance( $value ) ) {

      if ($type_name === 'field'
        || ! $value->has_next() // Empty
      ) return $value;

      $value->next(); // Forward cursor to first item

      // Field keys

      $instance = new class extends FieldKeysLoop {

        static $field_loop;
        static $field_loop_fields;

        function get_items_from_query( $items ) {
          $this->items = $items;
        }

        function get_item_field( $key, $field_name, $args = [] ) {
          // Field key
          if ( $field_name === 'key' ) return $key;
          // Field value
          return $this::$field_loop->get_field( $key );
        }
      };

      $instance::$field_loop = $value;

      $instance->get_items_from_query(
        array_keys( $value::$config['fields'] )
      );

      $value->reset();

      return $instance;
    }

    // Not a loop instance - Pass it to FieldLoop
    $args['items'] = $value;
  }

  $type = $loop->get_type_config( $type_name );

  // If it defaulted to post, pass the type name
  if ( $type['name'] !== $type_name ) {
    $args = $args + [ 'type' => $type_name ];
  }

  $instance = $type['create']( $args, $context );

  if ( is_array( $instance ) ) {

    // Create function can return array of items

    $instance = new \Tangible\Loop\BaseLoop( $instance );
  }

  return $instance;
};

/**
 * Check if value is a loop class instance
 */
$loop->is_instance = function( $value ) {
  return is_a( $value, Tangible\Loop\BaseLoop::class );
};
