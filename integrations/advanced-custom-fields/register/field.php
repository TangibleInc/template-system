<?php
use tangible\format;

/**
 * Field
 *
 * @see https://www.advancedcustomfields.com/resources/register-fields-via-php/
 *
 * @see /tags/field/acf.php
 * @see /integrations/advanced-custom-fields/logic/rules.php
 */

$html->create_field_config = function( $config, $key_prefix = 'tangible_template' ) use ( $html ) {

    // name (string) Used to save and load data. Single word, no spaces. Underscores and dashes allowed
  $name = $config['name'];

    // type (string) Type of field (text, textarea, image, etc)
  if ( ! isset( $config['type'] ) ) {
    $config['type'] = 'text';
  }

  $supports_date_format = false;

  // Type alias
  switch ( $config['type'] ) {
    case 'editor':
          $config['type'] = 'wysiwyg';
        break;
    case 'post':
          $config['type'] = 'post_object';
        break;
    case 'flexible':
          $config['type'] = 'flexible_content';
        break;
    case 'date':
      $config['type']       = 'date_picker';
      $supports_date_format = true;
        break;
    case 'date_time':
      $config['type']       = 'date_time_picker';
      $supports_date_format = true;
        break;
    case 'time':
      $config['type']       = 'time_picker';
      $supports_date_format = true;
        break;
  }

  $type = $config['type'];

  // key (string) Unique identifier for the field. Must begin with 'field_'
  if ( ! isset( $config['key'] ) ) {
    $config['key'] = "field_{$key_prefix}__{$name}";
  }

    // label (string) Visible when editing the field value

  // Alias
  if ( isset( $config['title'] ) ) {
    $config['label'] = $config['title'];
    unset( $config['title'] );
  }

  if ( ! isset( $config['label'] ) ) {
    $config['label'] = ucfirst( str_replace( [ '-', '_' ], ' ', $name ) ); // From slug
  }

    // instructions (string) Instructions for authors. Shown when submitting data

    // required (int) Whether or not the field value is required. Defaults to 0
  if ( isset( $config['required'] ) ) {
    $config['required'] = ( $config['required'] === 'true' || $config['required'] === true )
      ? 1
      : 0;
  }

    // conditional_logic (mixed) Conditionally hide or show this field based on other field's values.
    // Best to use the ACF UI and export to understand the array structure. Defaults to 0

    // wrapper (array) An array of attributes given to the field element
    // 'wrapper' => array (
    // 'width' => '',
    // 'class' => '',
    // 'id' => '',
    // ),

    // default_value (mixed) A default value used by ACF if no value has yet been saved

  // Repeater: Subfields

  if ( isset( $config['fields'] ) ) {

    $config['sub_fields'] = [];

    foreach ( $config['fields'] as $field_config ) {
    $config['sub_fields'] [] = $html->create_field_config(array_merge($field_config, [
        'key' => $config['key'] . '__' . $field_config['name'],
      ]));
    }

    unset( $config['fields'] );
  }

  // Flexible content: Layouts and subfields

  if ( isset( $config['layouts'] ) ) {

    foreach ( $config['layouts'] as $index => &$layout ) {

      if ( isset( $layout['title'] ) ) {
        $layout['label'] = $layout['title'];
        unset( $layout['title'] );
      }

      $layout['sub_fields'] = [];

      if ( isset( $layout['fields'] ) ) {
        foreach ( $layout['fields'] as $field_config ) {
        $layout['sub_fields'] [] = $html->create_field_config(array_merge($field_config, [
            'key' => $config['key'] . '__layout_' . $layout['name'] . '__' . $field_config['name'],
          ]));
        }

        unset( $layout['fields'] );
      }
    }
  }

  // Media library option: all or post (uploaded to current post)

  if ( isset( $config['library'] ) && $config['library'] === 'post' ) {
    $config['library'] = 'uploadedTo';
  }

  // File extensions
  if ( $type === 'file' && isset( $config['extensions'] ) ) {

    $config['mime_types'] = implode(',',
      is_array( $config['extensions'] )
        ? $config['extensions']
        : format\multiple_values($config['extensions'])
    );
    unset( $config['extensions'] );
  }

  // Date and date-time
  if ( $supports_date_format && isset( $config['format'] ) ) {

    // Shortcut to set both display and return format

    if ( $config['format'] === 'default' ) {
      // Default date format from WP settings
      $config['format'] = get_option( 'date_format' );
    }

    $config['display_format'] = $config['format'];
    $config['return_format']  = $config['format'];

    unset( $config['format'] );
  }

  // Field type defaults

  if ( isset( $html->field_type_defaults[ $type ] ) ) {

    // Convert given value based on default

    $default_config = &$html->field_type_defaults[ $type ];

    foreach ( $default_config as $key => $default_value ) {

      if ( ! isset( $config[ $key ] ) ) {
        $config[ $key ] = $default_value;
        continue;
      }

      if ( is_integer( $default_value ) ) {
        $config[ $key ] = (int) $config[ $key ];
        continue;
      }

      if ( is_bool( $default_value ) ) {
        $config[ $key ] = $config[ $key ] === true || $config[ $key ] === 'true';
        continue;
      }

      // Array

      if ( ! is_array( $default_value )) continue;
      if (is_array( $config[ $key ] )) continue;

      if ( empty( $config[ $key ] ) ) {
        $config[ $key ] = [];
        continue;
      }

      $char = substr( $config[ $key ], 0, 1 );

      if ( $char === '{' ) {
        // JSON string
        $config[ $key ] = json_decode( $config[ $key ], true );
      } else {
        // Comma-separated list
        $config[ $key ] = format\multiple_values($config[ $key ]);
      }
    }
  }

  return $config;
};
