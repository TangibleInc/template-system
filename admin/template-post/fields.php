<?php

$plugin->template_field_defaults = [

  'style'             => '',
  'script'            => '',

  'assets'            => [],

  'location'          => [],
  'theme_position'    => '',
  'theme_header'      => '',
  'theme_footer'      => '',

  'controls_template' => '',
  'controls_settings' => [],

  /**
   * Universal ID - Unique and immutable across sites
   *
   * @see /includes/template/universal-id/index.php
   */
  'universal_id'      => '',

  'atomic_css'        => '',
];

$plugin->get_template_fields = function( $post ) use ( $plugin ) {

  if (is_numeric( $post )) $post = get_post( $post ); // Accept post ID
  if (empty( $post )) return [];

  $post_id = $post->ID;

  $fields = array_merge(
    [
      'id'      => $post_id,
      'name'    => $post->post_name,
      'title'   => $post->post_title,
      'content' => $post->post_content,
    ],
    $plugin->template_field_defaults
  );

  /**
   * Check only fields used by post type
   *
   * Similar logic to ../ editor/fields.php for edit screen tabs - TODO: Consolidate somehow?
   */

  $post_type = $post->post_type;

  $has_style    = $post_type !== 'tangible_script';
  $has_script   = $post_type !== 'tangible_style';
  $has_location = in_array( $post_type, $plugin->template_post_types_with_location );
  $is_block     = $post_type === 'tangible_block';

  foreach ( $plugin->template_field_defaults as $field_name => $default_value ) {

    if (
      ( $field_name === 'style' && ! $has_style )
      || ( $field_name === 'script' && ! $has_script )
      || ( $field_name === 'location' && ! $has_location )
      || ( substr( $field_name, 0, 6 ) === 'theme_' && $post_type !== 'tangible_layout' )
      || ( substr( $field_name, 0, 9 ) === 'controls_' && ! $is_block )
    ) continue;

    $value = get_post_meta( $post_id, $field_name, true );

    if ( is_array( $default_value ) && ! is_array( $value ) ) {
      try {

        $value = json_decode( $value, true );

        if ( ! is_array( $value ) ) {
          $value = $default_value;
        }
      } catch ( \Throwable $th ) {
        $value = $default_value;
      }
    }

    /**
     * Ensure valid asset names
     * Needed here for backward compatibility with previously saved assets.
     */
    if ( $field_name === 'assets' ) {
      if ( is_array( $value ) ) {
        $ensure_valid_asset_name = $plugin->ensure_valid_asset_name;
        foreach ( $value as $index => $asset ) {
          if ( ! empty( $asset['name'] ) ) {
            $name                    = $ensure_valid_asset_name( $asset['name'] );
            $value[ $index ]['name'] = $name;
          }
        }
      } else {
        $value = [];
      }
    }

    $fields[ $field_name ] = $value;
  }

  /**
   * Keep post order to ensure template location rules are applied in the correct order
   */
  $fields['menu_order'] = $post->menu_order;

  return $fields;
};
