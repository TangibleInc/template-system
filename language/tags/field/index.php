<?php
/**
 * Field tag
 * 
 * TODO:
 * - Separate ACF-specific logic to /integrations/advanced-custom-fields
 * - Integrate Tangible Fields module
 * - Filter/hook system to support both?
 */
use tangible\template_system;

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

  /**
   * ACF Date field types
   * 
   * The field value is always formatted by our Date module and **not ACF**, because we
   * need to apply the locale, timezone, and format attributes.
   * 
   * If no format is given, the default format is determined by ACF field setting for
   * return value. For the Date field, previously we got the date format from Settings ->
   * General -> Date Format, using `get_option( 'date_format' )`.
   * 
   * The date format for the raw value as ACF stores it:
   * 
   * @see https://www.advancedcustomfields.com/resources/date-picker/#database-format
   * @see https://www.advancedcustomfields.com/resources/date-time-picker/#database-format
   * @see https://www.advancedcustomfields.com/resources/time-picker/#database-format
   * 
   * For the Date field, we convert the value from ACF default "Ymd" to "Y-m-d" to prevent
   * it from being treated as timestamp by date formatting.
   * 
   * @see /integrations/advanced-custom-fields/get-field
   */
  if (isset( $atts['acf_date'] )
    || isset( $atts['acf_date_time'] )
    || isset( $atts['acf_time'] )
  ) {

    if (isset( $atts['acf_date'] )) {

      $field_name = $atts['acf_date'];
      $format_options['from_format'] = 'Y-m-d';

    } elseif (isset( $atts['acf_date_time'] )) {

      $field_name = $atts['acf_date_time'];
      $format_options['from_format'] = 'Y-m-d H:i:s';

    }  elseif (isset( $atts['acf_time'] )) {

      $field_name = $atts['acf_time'];
      $format_options['from_format'] = 'H:i:s';
    }

    if (empty($format_type)) {
      /**
       * Get default format from ACF field settings
       * 
       * Fall back to known default format for this field type if ACF returns false for
       * unknown field or when field is not initialized.
       */
      $field_settings = template_system\get_acf_field_settings($field_name);
      $format_options['format'] = $field_settings['return_format']
        ?? $format_options['from_format']
      ;

    } else {

      // Given date format
      $format_options['format'] = $format_type;
      unset( $atts['format'] );
    }

    // Set default locale from Settings -> General -> Site Language
    if (!isset($atts['locale'])) {
      $format_options['locale'] = get_locale();
    }

    $should_format = true;
    $format_type = 'date';
  }


  if ( empty( $format_type ) ) {

      // Check other format type shortcuts

    if (isset( $atts['replace'] ) || isset( $atts['replace_pattern'] )) {

      foreach (['replace', 'replace_pattern'] as $check_key) {

        if ( !isset( $atts[$check_key] ) ) continue;

        $should_format  = true;
        $format_type    = $check_key;
        $format_options = [];

        for ($i=0; $i < 3; $i++) {

          $suffix = $i > 0 ? '_' . ($i+1) : '';

          $key = $format_type . $suffix;
          $key_with = 'with' . $suffix;

          if (!isset($atts[ $key ]) || !isset($atts[ $key_with ])) {
            break;
          }

          $format_options[ $key ] = $atts[ $key ];
          $format_options[ $key_with ] = $atts[ $key_with ];

          unset( $atts[ $key ] );
          unset( $atts[ $key_with ] );
        }

        break;
      }

    } elseif (isset( $atts['join'] )) {

      $should_format  = true;
      $format_type    = 'join';
      $format_options = [
        'join' => $atts['join']
      ];

      unset( $atts['join'] );
    }
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

  $field_atts = $atts;

  // Exclude these to prevent recursion in Field tag
  foreach ( [
    'name',
    'type',
  ] as $key ) {
    unset( $field_atts[ $key ] );
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

      unset( $field_atts[ $loop_type_key ] );
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
      'display'        => empty( $subfield ),
      'tag_attributes' => $field_atts,
    ];

    // For Date field types, always get raw value so we can apply format and locale
    if ($format_type === 'date') {
      $acf_field_options['display'] = false;
    }

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
          $value = $current_loop->get_field( $subfield, $field_atts );
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

  if ( $should_format ) {

    // Template field
    if ( $format_type === 'template' ) {
      return $html->render( $value );
    }

    if ( $format_type === 'date' ) {

      if (empty( $value )) return $value; // Prevent falling back to now

      // Pass date format options
      foreach ( [
        'locale',
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

  if ( ! is_string( $value ) && ! is_null( $value ) ) {

    // Deprecated <Field format=join /> in favor of <Field join />
    if ( isset( $atts['format'] ) && $atts['format'] === 'join' ) {
    return implode(
        isset( $atts['glue'] ) ? $atts['glue'] : ', ',
        $value
      );
    }

    // Cast arrays and objects to JSON string

    return json_encode( $value );
  }
  
  return $value;
};

return $html->field_tag;
