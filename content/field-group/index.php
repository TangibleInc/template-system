<?php

use tangible\format;

/**
 * Register field group and field types
 *
 * Depends on Advanced Custom Fields
 *
 * @see https://www.advancedcustomfields.com/resources/register-fields-via-php/
 */

$html->registered_field_groups = []; // name => config

$html->register_field_group = function( $name, $config ) use ( $html ) {
  $html->registered_field_groups[ $name ] = $config;
};

// Call from "init" action
$html->init_field_groups = function() use ( $html ) {

  if ( ! function_exists( 'acf_add_local_field_group' )
    || empty( $html->registered_field_groups )
  ) return;

  require_once __DIR__ . '/field.php';
  require_once __DIR__ . '/field-type-defaults.php';

  foreach ( $html->registered_field_groups as $name => $config ) {
    $html->create_field_group( $name, $config );
  };
};

$html->create_field_group = function( $name, $config ) use ( $html ) {

  // key - Unique group key
  $config['key'] = "tangible_template_field_group__{$name}";

  // title - Visible in metabox handle
  $config['title'] = isset( $config['title'] ) ? $config['title']
    : ucfirst( str_replace( [ '-', '_' ], ' ', $name ) ); // From slug

  // fields
  if ( isset( $config['fields'] ) ) {
    foreach ( $config['fields'] as $index => $field_config ) {
      $config['fields'][ $index ] = $html->create_field_config( $field_config, $config['key'] );
    }
  }

  // menu_order (int) - Field groups are shown in order from lowest to highest. Defaults to 0
  if ( isset( $config['menu_order'] ) ) {
    $config['menu_order'] = (int) $config['menu_order'];
  }

  // position (string) - Determines the position on the edit screen. Defaults to normal. Choices of 'acf_after_title', 'normal' or 'side'
  if ( isset( $config['position'] ) ) {
    // Alias
    if ( $config['position'] === 'after_title' ) {
      $config['position'] = 'acf_after_title';
    }
  }

  // style (string) - Determines the metabox style. Defaults to 'default'. Choices of 'default' or 'seamless'

  // label_placement (string) - Determines where field labels are places in relation to fields. Defaults to 'top'.
  // Choices of 'top' (Above fields) or 'left' (Beside fields)

  // instruction_placement (string) - Determines where field instructions are places in relation to fields. Defaults to 'label'.
  // Choices of 'label' (Below labels) or 'field' (Below fields)

  /**
   * hide_on_screen (array) - An array of elements to hide on the screen
   *
   * @see advanced-custom-fields/includes/admin/views/field-group-options.php
   */
  $screen_elements = [
    'permalink',
    'the_content',
    'excerpt',
    'custom_fields',
    'discussion',
    'comments',
    'revisions',
    'slug',
    'author',
    'format',
    'page_attributes',
    'featured_image',
    'categories',
    'tags',
    'send-trackbacks',
  ];

  // Alias: show, hide

  if ( isset( $config['show'] ) ) {

    $show_elements = is_array( $config['show'] ) ? $config['show']
      : format\multiple_values($config['show']);

    unset( $config['show'] );

    if ( ! isset( $config['hide_on_screen'] ) ) {
      $config['hide_on_screen'] = [];
    }

    foreach ( $screen_elements as $key ) {
      if ( ! in_array( $key, $show_elements ) ) {
        $config['hide_on_screen'] [] = $key;
      }
    }
  }

  if ( isset( $config['hide'] ) ) {

    $hide_elements = is_array( $config['hide'] )
      ? $config['hide']
      : ( $config['hide'] === 'all'
        ? $screen_elements
        : format\multiple_values($config['hide'])
      );

    unset( $config['hide'] );

    if ( ! isset( $config['hide_on_screen'] ) ) {
      $config['hide_on_screen'] = [];
    }

    foreach ( $hide_elements as $key ) {
      $config['hide_on_screen'] [] = $key;
    }
  }

  /**
   * location (array) - Location rule groups
   *
   * Array of rule groups, where a group is an array of rules.
   * Each group is considered an "or". Each rule is considered an "and".
   */

  // post_type (string or array) Shortcut to add location rules
  if ( isset( $config['post_type'] ) ) {

    $types = is_array( $config['post_type'] )
      ? $config['post_type']
      : format\multiple_values($config['post_type']);

    foreach ( $types as $type ) {
      $html->add_post_type_to_field_group( $type, $name );
    }

    $config['location'] = $html->registered_field_groups[ $name ]['location'];
  }

  acf_add_local_field_group( $config );
};

/**
 * Add post type to location rule groups
 */
$html->add_post_type_to_field_groups = function( $name, $field_groups ) use ( $html ) {
  foreach ( $field_groups as $group_name ) {
    $html->add_post_type_to_field_group( $name, $group_name );
  }
};

$html->add_post_type_to_field_group = function( $name, $group_name ) use ( $html ) {

  if ( ! isset( $html->registered_field_groups[ $group_name ] ) ) {
    return; // Unknown field group
  }

  $group = &$html->registered_field_groups[ $group_name ];

  $location_rule_groups = isset( $group['location'] )
    ? $group['location']
    : [];

  $location_rule_groups [] = [
    [
      'param'    => 'post_type',
      'operator' => '==',
      'value'    => $name,
    ],
  ];

  $group['location'] = $location_rule_groups;
};
