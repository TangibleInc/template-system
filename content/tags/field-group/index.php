<?php

$html->current_field_group_config = [];

$html->clear_current_field_group_config = function() use ( $html ) {
  $html->current_field_group_config = [
    'fields'               => [],
    'location_rule_groups' => [],
  ];
};

$html->clear_current_field_group_config();

require_once __DIR__ . '/field.php';
require_once __DIR__ . '/flexible-content.php';
require_once __DIR__ . '/location.php';

/**
 * Field group tag
 */
$html->content_field_group_tag = function( $atts, $nodes ) use ( $html ) {

  $name = isset( $atts['name'] ) ? $atts['name'] : array_shift( $atts['keys'] );

  // Create config

  $html->clear_current_field_group_config();

  $html->current_field_group_location_rule_group = [];

  $html->render_tag('Map', [
    'name' => 'current_field_group',
  ], $nodes);

  $config = $html->get_map( 'current_field_group' );

  $config['fields'] = $html->current_field_group_config['fields'];

  // Location rule groups

  // Rules outside of any group
  if ( $html->current_field_group_location_rule_group !== false ) {

    $html->current_field_group_config['location_rule_groups'] [] = $html->current_field_group_location_rule_group;

    $html->current_field_group_location_rule_group = false;
  }

  if ( ! empty( $html->current_field_group_config['location_rule_groups'] ) ) {
    if ( ! isset( $config['location'] ) ) {
      $config['location'] = [];
    }
    foreach ( $html->current_field_group_config['location_rule_groups'] as $rule_group ) {
      $config['location'] [] = $rule_group;
    }
  }

  // Register

  if ( empty( $name ) ) {
    // Must have unique name that stays the same
    // Previously: $name = 'field_group_' . uniqid();
    if (isset( $config['title'] )) $name = $html->format_slug( $config['title'] );
  }

  $html->register_field_group( $name, $config );
};

return [
  'callback'   => $html->content_field_group_tag,
  'local_tags' => [
    'Field'             => [
      'callback' => $html->content_field_tag,
    ],
    'LocationRule'      => [
      'callback' => $html->content_field_group_location_rule_tag,
    ],
    'LocationRuleGroup' => [
      'callback' => $html->content_field_group_location_rule_group_tag,
    ],
    // For flexible content field
    'Layout'            => [
      'callback' => $html->content_field_flexible_content_layout_tag,
    ],
  ],
];
