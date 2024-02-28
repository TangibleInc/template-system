<?php
use tangible\format;

/**
 * These attributes are of the same loop type as its name
 *
 * Used in loop tag context below, as well as tags/field
 */
$html->loop_tag_attributes_for_type = [
  'calendar',
  'field',
  'field_keys',
  'items', // Shortcut for type=list items=".."
  'list',
  'map',
  'map_keys',
  'menu',
  'taxonomy',
  'user', // Alias to user_field
  'user_field',
];

/**
 * Create context for Loop tag, an instance of loop type based on attributes
 */

$html->create_loop_tag_context = function( $atts ) use ( $loop, $html ) {

  $type_name = isset( $atts['keys'][0] ) ? $atts['keys'][0]
    : ( isset( $atts['type'] ) ? $atts['type'] : '' );

  // Determine content type

  /**
   * Attribute "post_type" is now the recommended way to create a post loop
   * of a given post type, to distinguish it from attribute "type" which is
   * used for defined loop types and only falls back to post type if there is
   * no loop type with the same name.
   */
  if ( empty( $type_name ) && isset($atts['post_type']) ) {
    $type_name = 'post';
  }

  if ( empty( $type_name ) ) {

    /**
     * Times - List loop of X times
     */

    if ( isset( $atts['times'] ) ) {

      $times = (int) $atts['times'];

      $items = [];
      for ( $i = 1; $i <= $times; $i++ ) {
        $items [] = $i;
      }

      return $loop( 'list', $items );
    }

    /**
     * Support from=options - Get ACF field from options page
     */
    if ( isset( $atts['from'] ) ) {

      // Ensure ACF text field type as default
      if ( isset( $atts['field'] ) ) {
        $atts['acf_text'] = $atts['field'];
        unset( $atts['field'] );
      }
    }

    foreach ( $atts as $key => $value ) {

      /**
       * ACF fields
       *
       * @see tags/field/acf.php
       */
      if ( substr( $key, 0, 4 ) === 'acf_' ) {

        $acf_field_type = substr( $key, 4 ); // After "acf_"

        if ( $acf_field_type === 'select' ) {
          $acf_field_type = 'multi_select'; // Ensure list
        }

        $field_name = $value;

        $acf_field_options = [
          'tag_attributes' => $atts,
        ];

        /**
         * Support from=options - Pass to field options
         * See ../field/acf.php
         */
        if ( isset( $atts['from'] ) ) {
          $acf_field_options['from'] = $atts['from'];
        }

        // Return loop instance

        $value = $html->get_acf_field_type( $acf_field_type, $field_name, $acf_field_options );

        // Subfield
        if ( isset( $atts['field'] ) ) {
          $subfield = $atts['field'];
          $value    = is_array( $value ) && isset( $value[ $subfield ] )
            ? $value[ $subfield ]
            : '';
        }

        if ($loop->is_instance( $value )) return $value;

        if ( is_array( $value ) ) {

          if ( empty( $value ) || isset( $value[0] ) ) {
            // Array
            return $loop->create_type( 'list', $value );
          }

          // Map
          return $loop->create_type( 'map', $value );
        }

        return $loop->create_type( 'list', [] ); // Empty loop
      }

      if ( ! in_array( $key, $html->loop_tag_attributes_for_type ) ) continue;

      /**
       * Attributes of the same loop type as its name
       */

      if ( $key === 'user_field' || $key === 'user' ) {

        $user_loop  = $loop( 'user', [ 'id' => 'current' ] );
        $user_field = $value;

        if ( ! $user_loop->has_next() ) {
          return $loop->create_type( 'list', [] ); // Empty loop
        }

        $user_loop->next();

        $user_field_value = $user_loop->get_field(
          $user_field,
          $atts // Some user fields accept options
        );

        $user_loop->reset();

        // Field value is a loop instance
        if ( $loop->is_instance( $user_field_value ) ) {
          return $user_field_value;
        }

        if ( ! is_array( $user_field_value ) ) {
          // List of single item
          $user_field_value = [ $user_field_value ];
        }

        return $loop->create_type('field', [
          'items' => $user_field_value,
        ]);
      }

      // If taxonomy is given, loop that taxonomy's terms
      if ($key === 'taxonomy') $key = 'taxonomy_term';
      if ($key === 'items') $key    = 'list';

      $type_name = $atts['type'] = $key;
      break;
    }
  }

  if ( empty( $type_name ) ) {

    // Without query parameter "type", Loop inherits from <If loop exists>, if any

    $current_context = $html->get_loop_exists_context();

    if ( $current_context !== false ) {
      return $current_context;
    }

    /**
     * Fallback to default context from global $wp_query
     */

    if ( ! isset( $atts['sort_field'] ) && ! isset( $atts['paged'] ) ) {

      // Without sort or paginate

      $current_context = $loop->get_default_context(); // See Loop module, context/index.php

      /**
       * Apply offset and count, if any.
       *
       * Using custom and minimal implementation, since there's no simple way to modify and re-run WP_Query.
       */

      if ( isset( $atts['offset'] ) ) {
        $offset                       = (int) $atts['offset'];
        $current_context->total_items = array_slice( $current_context->total_items, $offset );
        $current_context->items       = $current_context->get_current_page_items();
      }

      if ( isset( $atts['count'] ) ) {
        $count                        = (int) $atts['count'];
        $current_context->total_items = array_slice( $current_context->total_items, 0, $count );
        $current_context->items       = $current_context->get_current_page_items();
      }
    } else {

      /**
       * With sort or paginate: Create new loop context to get all items of this type
       */

      global $post, $wp_query;

      if (empty( $wp_query )) return $loop( 'list', [] ); // Empty loop

      $post_type = 'post';

      // Archive or single post
      if ( ! empty( $post ) ) {
        $post_type = $post->post_type;
      } elseif ( ! empty( $wp_query->query_vars['post_type'] ) ) {
        $post_type = $wp_query->query_vars['post_type'];
      }

      // TODO: Copy query parameters from $wp_query?

      // tangible\see($wp_query);

      $current_context = $loop( $post_type, $atts );
    }

    return $current_context;
  }

  if ( $type_name === 'list' || $type_name === 'map' || $type_name === 'map_keys' ) {

    /**
     * Data types
     *
     * Get value from variable name of that type, or JSON string for raw data.
     * 
     * For backward compatibility, the loop type class (ListLoop, etc.) expects to be created
     * with its query arguments being the items themselves. Pass the tag attributes as additional 
     * options to the class constructor. @see /loop/types/list/index.php
     */

    $data      = [];
    $data_name = isset( $atts[ $type_name ] )
      ? $atts[ $type_name ]
      : null;

    if ( is_string( $data_name ) ) {

      if ( @$data_name[0] === '[' || @$data_name[0] === '{' ) {
        try {
          $data = json_decode( $data_name, true );
        } catch ( \Exception $e ) {
          $data = [];
        }
      } else {
        $data = $html->get_variable_type(
          $type_name === 'map_keys' ? 'map' : $type_name,
          $data_name
        );
      }
    } elseif ( $type_name === 'list' && isset( $atts['items'] ) ) {
      return $loop->create_type(
        $type_name,
        format\multiple_values($atts['items']),
        $atts
      );
    }

    // Create query arguments from tag attributes
    unset($atts['keys']);
    unset($atts['type']);
    unset($atts[ $type_name ]);

    return $loop->create_type( $type_name, $data, $atts );

  } elseif ( $type_name === 'calendar' ) {
    $type_name = 'calendar_' . $atts['calendar'];
  }

  $atts['type'] = $type_name;
  unset( $atts['keys'] ); // Don't pass to loop

  return $loop->create_type( $type_name, $atts );
};
