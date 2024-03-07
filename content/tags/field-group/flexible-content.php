<?php

/**
 * Flexible content field: Layout
 */

$html->content_field_flexible_content_layout_tag = function( $atts, $nodes ) use ( $html ) {

  $name = isset( $atts['name'] ) ? $atts['name'] : array_shift( $atts['keys'] );

  // Must be inside flexible content field
  $config = $html->current_field_config;

  // Create new field config
  $html->current_field_config = [
    'name'   => $name,
    'fields' => [],
  ];

  $html->render_tag('Map', [
    'name'   => 'current_field',
    'parent' => false,
  ], $nodes);

  $layout_config = array_merge( $html->current_field_config, $html->get_map( 'current_field' ) );

  if ( ! isset( $config['layouts'] ) ) {
    $config['layouts'] = [];
  }

  $config['layouts'] [] = $layout_config;

  $html->current_field_config = $config;
};
