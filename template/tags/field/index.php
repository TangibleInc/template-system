<?php

require_once __DIR__ . '/acf.php';

$html->field_tag = function( $atts ) use ( $loop, $html ) {

  $current_loop = $loop;

  /**
   * If "type" attribute is present, the rest of attributes are passed
   * to Loop tag by default.
   */
  $pass_attributes_to_field = false;

  $field_name = isset( $atts['keys'][0] )
    ? array_shift( $atts['keys'] ) // Remove field name
    : ( isset( $atts['name'] ) ? $atts['name'] : '' );

  // Attributes to format field value

  if ( isset( $atts['date_format'] ) ) {
    $atts['format_date'] = $atts['date_format'];
    unset( $atts['date_format'] );
  } elseif ( isset( $atts['timezone'] ) ) {
    $atts['format_date'] = 'default';
  }

  if ( isset( $atts['template'] ) ) {
    $field_name     = $atts['template'];
    $atts['format'] = 'template';
    unset( $atts['template'] );
  }

  $original_atts = $atts;

  $is_acf_field   = false;
  $acf_field_type = '';
  $has_field_name = ! empty( $field_name ) || $field_name == '0'; // Accept numeric index 0 for list

  // Format attribute

  $should_format  = false;
  $format_type    = isset( $atts['format'] ) ? $atts['format'] : '';
  $format_options = [];

  if ( empty( $format_type ) ) {

    if ( isset( $atts['replace'] ) ) {
      $should_format  = true;
      $format_type    = 'replace';
      $format_options = [
        'replace' => $atts['replace'],
        'with'    => isset( $atts['with'] ) ? $atts['with'] : '',
      ];

      unset( $atts['replace'] );
      unset( $atts['with'] );
    }
  } elseif ( isset( $atts['acf_date'] ) || isset( $atts['acf_date_time'] )
     || isset( $atts['acf_time'] )
  ) {
    // "format" attribute is desired date format
    $atts['format_date'] = $format_type;
    $format_type         = 'date';
    unset( $atts['format'] );
  }

  /**
   * Loop type shortcut attributes - Creates a loop of that type and get a field.
   *
   * @see ../loop/context
   */
  $loop_type_shortcut_attributes = array_merge( [ 'type' ], $html->loop_tag_attributes_for_type );
  $loop_type_shortcut_attribute  = false;

  foreach ( $atts as $key => $atts_value ) {

    // Attribute for ACF field type - Must be only one

    if ( ! $has_field_name && ! $is_acf_field && substr( $key, 0, 4 ) === 'acf_' ) {

      $is_acf_field   = true;
      $acf_field_type = substr( $key, 4 ); // After "acf_"
      $field_name     = $atts_value;

      // See below for "ACF field value"

      continue;
    }

    if ( in_array( $key, $loop_type_shortcut_attributes ) ) {

      // Alias/shortcut
      if ( $key === 'user' ) {
        $key                = 'user_field';
        $atts['user_field'] = $atts['user'];
        unset( $atts['user'] );
      }

      $loop_type_shortcut_attribute = $key;
      continue;
    }

    // Attributes for format

    if (substr( $key, 0, 6 ) !== 'format') continue;

    $should_format = true;
    $suffix        = substr( $key, 7 ); // After "format_"

    unset( $atts[ $key ] ); // Don't pass to get_field

    if ( empty( $format_type ) ) {

      $format_type = $suffix;

      if ( empty( $format_type ) ) {
        $format_type = $atts_value;
      }
    }

    $format_options = [
      $suffix => $atts_value,
    ];
  }

  // Ensure this format type exists
  if ( $should_format && $format_type !== 'template' ) {

    $format_name = "format_{$format_type}";

    if ( ! isset( $html->$format_name ) ) {

      // Unknown format type
      $atts          = $original_atts;
      $should_format = false;
    }
  }

  if ( isset( $atts['from'] ) && $has_field_name && ! $is_acf_field ) {

    // Support from=options - Always get ACF field from options page

    $is_acf_field                                 = true;
    if (empty( $acf_field_type )) $acf_field_type = 'text';
  }

  // Other ways to specify field name

  if ( ! $is_acf_field && ! $has_field_name ) {

    if ( isset( $atts['custom'] ) ) {

      /**
       * Support attribute "custom" to get custom field whose name may conflict
       * with an alias, for example, "name".
       */
      $field_name = $atts['custom'];

      $has_field_name           = true;
      $pass_attributes_to_field = true; // Pass the rest of attributes to Field tag

    } elseif ( ! isset( $atts['type'] ) ) {

      /**
       * Support loop type field, like <Field user=full_name />
       */
      foreach ( $atts as $key => $value ) {

        if ( ! $loop->get_type_config( $key, false ) ) continue;

        // See if we're inside a loop of this type
        $current_loop = $loop->get_context( $key );

        // If not, create new loop
        if ( ! $current_loop ) {
          $atts['type'] = $key;
          $current_loop = $loop;
        }

        $field_name = $value;

        $has_field_name           = true;
        $pass_attributes_to_field = true; // Pass the rest of attributes to Field tag

        break;
      }
    }
  }

  /**
   * Loop type shortcut - Get a field from new loop
   */
  if ( ! $is_acf_field && ! empty( $loop_type_shortcut_attribute ) ) {

    /**
     * Loop and field attributes
     */

    $loop_type_key = $loop_type_shortcut_attribute;
    $loop_atts     = [];

    if ( ! $pass_attributes_to_field ) {

      // Loop type attributes

      $loop_atts  = $atts;
      $field_atts = [];

    } else {

      $loop_atts[ $loop_type_key ] = $atts[ $loop_type_key ];

      $field_atts = $atts;

      // Exclude these to prevent recursion in Field tag
      foreach ( [
        'name',
        'type',
        $loop_type_key,
      ] as $key ) {
        unset( $field_atts[ $key ] );
      }
    }

    $current_loop = $html->loop_tag([
      'instance' => true,
    ] + $loop_atts, []);

    if (empty( $current_loop ) || ! $current_loop->has_next()) return;

    if ( $loop_type_key === 'list' ) {

      // List item by index

      if ( ! is_numeric( $field_name ) ) {

        if ( ! isset( $atts['item'] )) return; // Unknown index

        /**
         * Item index starting with 1
         *
         * This makes it easier to do things like:
         *
         * <Field list=list_name item="{Get loop=count}" />
         */
        $field_name = (int) $atts['item'] - 1;
      }

      $list  = $current_loop->get_items();
      $index = (int) $field_name;

      if ( ! isset( $list[ $index ] )) return;

      return $list[ $index ];
    }

    $current_loop->next();

    return $current_loop->get_field( $field_name, $field_atts );
  }

  /**
   * ACF field value
   */

  if ( $is_acf_field ) {

    $subfield = isset( $atts['field'] ) ? $atts['field'] : '';

    $acf_field_options = [
      // Format for display, instead of raw value
      'display'        => empty( $subfield ) && $format_type !== 'date',
      'tag_attributes' => $atts,
    ];

    if ( isset( $atts['from'] ) ) {
      $acf_field_options['from'] = $atts['from'];
    }

    $value = $html->get_acf_field_type( $acf_field_type, $field_name, $acf_field_options );

    // Subfield
    if ( ! empty( $subfield ) ) {

      if ( $loop->is_instance( $value ) ) {
        // Loop instance
        $current_loop = $value;

        if ( $current_loop->has_next() ) {

          $current_loop->next();
          $value = $current_loop->get_field( $subfield );
          $current_loop->reset();

        } else {
          $value = null;
        }
      } elseif ( is_object( $value ) ) {

        // Object
        $value = isset( $value->$subfield )
          ? $value->$subfield
          : null;

      } elseif ( is_array( $value ) ) {

        // Array
        $value = isset( $value[ $subfield ] )
          ? $value[ $subfield ]
          : null;

      } else {
        $value = null;
      }
    }
  } else {

    /**
     * Normal field (not ACF)
     */

    $value = $current_loop->get_field(
      $field_name,
      $atts
    );
  }

  /**
   * Process result
   */

  // Field value is loop instance

  if ( $loop->is_instance( $value ) ) {

    /**
     * Loop type can optionally define method "get_as_field_value" to display a suitable value
     * for loop instance as field.
     *
     * This is to support <Loop field=X> and <Field X /> at the same time. Most loop types can
     * leave it undefined, to default to a list of IDs.
     *
     * Current use cases:
     * - <Field image /> as attachment loop returns an img element
     * - <Field taxonomy /> returns a taxonomy slug
     */

    if ( method_exists( $value, 'get_as_field_value' )
      && ! is_null( $subfield = $value->get_as_field_value( $atts ) )
    ) {

      $value = $subfield;

    } else {

      // Default to list of IDs

    $ids = $value->map(function() use ( $value ) {
        return $value->get_field( 'id' );
      });

      $value->reset();
      $value = $ids;
    }
  } elseif ( is_bool( $value ) ) {

    // Boolean: Cast to string that works with If tag
    return $value ? 'TRUE' : '';
  }

  if ( ! is_string( $value ) && ! is_null( $value ) ) {

    if ( isset( $atts['format'] ) && $atts['format'] === 'join' ) {
    return implode(
        isset( $atts['glue'] ) ? $atts['glue'] : ', ',
        $value
      );
    }

    // Cast arrays and objects to JSON string

    return json_encode( $value );
  }

  if ( $should_format ) {

    // Template field
    if ( $format_type === 'template' ) {
      return $html->render( $value );
    }

    if ( $format_type === 'date' ) {

      if (empty( $value )) return $value; // Prevent falling back to now

      // Pass date format options
      foreach ( [
        'timezone',
        'from_format',
      ] as $key ) {
        if ( isset( $atts[ $key ] ) ) {
          $format_options[ $key ] = $atts[ $key ];
        }
      }
    }

    return $html->format( $format_type, $value, $format_options );
  }

  return $value;
};

return $html->field_tag;
