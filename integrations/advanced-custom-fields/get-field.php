<?php
namespace tangible\template_system;
use tangible\template_system;

/**
 * Get ACF field value
 *
 * @see https://www.advancedcustomfields.com/resources/#field-types
 * @see https://www.advancedcustomfields.com/resources/get_field/
 *
 * @see ./logic/index.php
 * @see /language/tags/field
 * @see /language/tags/loop/context
 * @see /language/tags/loop/loop-variable
 * @see /content/field-group/field.php
 */

$html->get_acf_field_type = function( $acf_field_type, $field_name, $options = [] ) use ( $loop, $html ) {

  if ( ! $html->is_acf_active ) return;

  $current_loop = isset( $options['loop'] )
    ? $options['loop']
    : $loop->get_context();

  $display        = isset( $options['display'] ) ? $options['display'] : false;
  $tag_attributes = isset( $options['tag_attributes'] ) ? $options['tag_attributes'] : [];

  // Alias - @see /integrations/advanced-custom-fields/logic/rules.php, /content/field-group/field.php

  switch ( $acf_field_type ) {
    case 'editor':
          $acf_field_type = 'wysiwyg';
        break;
    case 'post':
          $acf_field_type = 'post_object';
        break;
    case 'flexible':
          $acf_field_type = 'flexible_content';
        break;
    case 'date':
          $acf_field_type = 'date_picker';
        break;
    case 'date_time':
          $acf_field_type = 'date_time_picker';
        break;
    case 'time':
          $acf_field_type = 'time_picker';
        break;
  }

  // Support fields from different objects: post, user, taxonomy, ..

  $loop_type  = $current_loop->get_name();
  $acf_object_id = template_system\get_current_acf_object_id(
    $options
  );

  // Format these field types. All others get raw value regardless of return type
  $format_field_types = [ 'oembed', 'textarea', 'wysiwyg' ];

  $format_value = in_array( $acf_field_type, $format_field_types );

  if ( $html->is_acf_field_type_with_sub_field( $loop_type ) ) {

    if ( $acf_field_type === 'key' ) {

      // Get sub-field by ACF key
      // https://www.advancedcustomfields.com/resources/get_field_object/
      $result = get_sub_field_object($field_name, $acf_object_id,
        $format_value, // format value
        true   // load value
      );

      $value = $result['value'];

    } else {
      $value = get_sub_field( $field_name, $format_value );
    }

    $get_field_config = function() use ( $field_name, $acf_object_id ) {
      return get_sub_field_object($field_name, $acf_object_id,
        false, // format value
        false  // load value
      );
    };

  } elseif ( $acf_field_type === 'key' ) {

    // Get field by ACF key
    // https://www.advancedcustomfields.com/resources/get_field_object/
    $result = get_field_object($field_name, $acf_object_id,
      false, // format value
      true   // load value
    );

    $value = is_array( $result ) ? $result['value'] : $result;

    $get_field_config = function() use ( $value ) {
      return $value;
    };

  } else {

    $value = get_field( $field_name, $acf_object_id, $format_value );

    $get_field_config = function() use ( $field_name, $acf_object_id ) {
      return get_field_object(
        $field_name,
        $acf_object_id,
        false, // format value
        false  // load value
      );
    };
  }

  // Support attributes from Field or Loop tag

  if ( isset( $tag_attributes['count'] ) & is_array( $value ) ) {
    $value = array_slice( $value, 0, (int) $tag_attributes['count'] );
  }

  /**
   * Special subfields
   *
   * The return value must be an object with the subfield name as key,
   * as expected by the Field and Loop tags as they process the "field"
   * attribute.
   *
   * @see ./index.php for Field tag
   * @see /tags/loop/context.php for Loop tag
   */
  if ( isset( $tag_attributes['field'] ) ) {

    $subfield       = $tag_attributes['field'];
    $field_config   = $get_field_config();
    $subfield_value = '';

    if ( $subfield === 'config' ) {
      // The whole field config object
      return [
        $subfield => $field_config,
      ];
    }

    if ( $subfield === 'field_label' ) {
      return [
        $subfield => $field_config['label'],
      ];
    }

    if ( in_array($acf_field_type,
      [ 'select', 'multi_select', 'checkbox', 'radio' ]
    ) ) {

      // Choice field types

      $choices = isset( $field_config['choices'] )
        ? $field_config['choices']
        : [];

      if ( $subfield === 'label' ) {

        // Label for selected value

        if (is_array( $value )) $value = $value[0];

        $subfield_value = isset( $choices[ $value ] )
          ? $choices[ $value ]
          : '';

      } elseif ( $subfield === 'labels' ) {

        // List of labels for selected values

        $subfield_value = [];

        if ( ! is_array( $value )) $value = [ $value ];
        foreach ( $value as $subvalue ) {
          $label             = isset( $choices[ $subvalue ] )
            ? $choices[ $subvalue ]
            : '';
          $subfield_value [] = $label;
        }
      } elseif ( $subfield === 'choices' ) {

        // Choices as a list of key-value pairs

        $subfield_value = [];
        foreach ( $choices as $key => $value ) {
          $subfield_value [] = [
            'value' => $key,
            'label' => $value,
          ];
        }
      } elseif ( $subfield === 'choices_map' ) {

        // Choices as a map
        $subfield_value = $choices;
      }

      return [
        $subfield => $subfield_value,
      ];
    }

    // Otherwise, Field tag will get subfield from return value

  } // Special subfields

  /**
   * Return value based on field type: empty list, loop instance, string, etc.
   */

  switch ( $acf_field_type ) {

    // Basic

    case 'image':
      return empty( $value ) ? $loop( 'list', [] ) : $loop('attachment', [
        'id' => $value,
      ]);

    case 'link':
      // Define default target
      if ( ! empty( $value ) && empty( $value['target'] ) ) {
        $value['target'] = '_self';
      }
        return $value;

    case 'gallery':
        return $display ? $value : ( empty( $value ) ? $loop( 'list', [] )
        : $loop('attachment', [
          'include' => $value,
        ])
      );

    case 'template':
        return $html->render( $value );

    case 'file':
      $current_loop = empty( $value ) ? $loop( 'list', [] )
        : $loop('attachment', [
          'id' => $value,
        ]
      );

      // File field returns download URL by default
      if ( $display ) {
        if ( $current_loop->has_next() ) {
          $current_loop->next();
          $value = $current_loop->get_field( 'url' );
          $current_loop->reset();
          return $value;
        }
        return;
      }

        return $current_loop;

    // For date and date-time field, attribute "format" is handled by Field tag - @see ./index.php

    case 'date_picker':
      if ( ! $format_value ) {

        // Convert from default format "Ymd" to "Y-m-d", to **prevent getting treated as timestamp**

        $year  = substr( $value, 0, 4 );
        $month = substr( $value, 4, 2 );
        $day   = substr( $value, 6, 2 );

        $value = "$year-$month-$day";
      }

        return $value;

    case 'date_time_picker':
        return $value; // Default format "Y-m-d H:i:s"
    case 'time_picker':
        return $value; // Default format "H:i:s"

    // Choices

    case 'radio':
    case 'select':
        return is_array( $value ) ? array_shift( $value ) : $value;

    case 'multi_select':
    case 'checkbox':
        return $display ? $value : $loop( 'list', is_array( $value ) ? $value : [ $value ] );

    case 'true_false':
        return $display ? ( ! empty( $value ) ? 'TRUE' : '' ) : ! empty( $value );

    // Relational

    case 'post':
    case 'post_object':
    case 'relationship':
      if ($display) return $value;
      if (empty( $value )) return $loop( 'list', [] );

      $post_type = ( ( $field_config = $get_field_config() ) && isset( $field_config['post_type'] ) )
        ? $field_config['post_type']
        : 'any';
      $loop_args = [
        'type'    => $post_type,
        'include' => $value,
      ];

      // Pass any loop query parameters
      foreach ( $tag_attributes as $key => $value ) {
        if (substr( $key, 0, 4 )!=='acf_') {
          $loop_args[ $key ] = $value;
        }
      }

      return $loop(
        $post_type === 'any' ? 'post' : $post_type,
        $loop_args
      );

    case 'taxonomy':
        return $display ? $value : ( empty( $value ) ? $loop( 'list', [] )
        : $loop('taxonomy_term', [
          'taxonomy' => ( ( $field_config = $get_field_config() ) && isset( $field_config['taxonomy'] ) )
            ? $field_config['taxonomy']
            : 'any',
          'include'  => $value,
        ])
      );

    case 'user':
        return $display ? $value : ( empty( $value ) ? $loop( 'list', [] )
        : $loop('user', [
          'include' => $value,
        ])
      );

    // Nested - @see integrations/advanced-custom-fields/types

    case 'repeater':
    case 'flexible_content':
    case 'group':
      if ($display) return $value;
      if (empty( $value )) return $loop( 'list', [] );

      $args = [
        'field' => $field_name,
        'id'    => $acf_object_id,
      ];

      // Pass integer values
      foreach ( [
        'count',
        'paged',
      ] as $key ) {
        if ( isset( $tag_attributes[ $key ] ) ) {
          $args[ $key ] = (int) $tag_attributes[ $key ];
        }
      }

      $context = [];

      // Pass attributes to sort/filter by field
      foreach ($tag_attributes as $key => $value) {
        if (strpos($key, 'field')===0 || strpos($key, 'sort')===0) {
          $context[ $key ] = $value;
        }
      }

      $loop_type = $acf_field_type === 'repeater'
        ? 'acf_repeater'
        : ( $acf_field_type === 'flexible_content'
          ? 'acf_flexible_content'
          : 'acf_group'
        );

      return $loop(
        $loop_type,
        $args,
        $context
      );
  }

  // tangible\see('ACF field', 'type='.$loop_type, 'id='.$acf_object_id, 'field='.$field_name, $value);

  return $value;
};
