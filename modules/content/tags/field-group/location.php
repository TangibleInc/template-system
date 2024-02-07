<?php
use tangible\format;

/**
 * Location rule group
 * Group are combined as "OR". Rules inside are combined as "AND".
 */

$html->current_field_group_location_rule_group = false;

$html->content_field_group_location_rule_group_tag = function( $atts, $nodes ) use ( $html ) {

  // Rules outside of any group
  if ( $html->current_field_group_location_rule_group !== false ) {
    $html->current_field_group_config['location_rule_groups'] [] = $html->current_field_group_location_rule_group;
  }

  $html->current_field_group_location_rule_group = [];

  $html->render( $nodes );

  if ( ! empty( $html->current_field_group_location_rule_group ) ) {
    $html->current_field_group_config['location_rule_groups'] [] = $html->current_field_group_location_rule_group;
  }

  $html->current_field_group_location_rule_group = false;
};

/**
 * Location rule
 */
$html->content_field_group_location_rule_tag = function( $atts, $nodes ) use ( $html ) {

  $rule = [];

  foreach ( $atts as $key => $value ) {

    if ($key === 'keys') continue;

    /*
    Accepted rule fields:

    post_type
    post_template
    post_status
    post_format
    post_category
    post_taxonomy
    post
    page_template
    page_type
    page_parent
    page
    current_user
    current_user_role
    user_form
    user_role
    taxonomy
    attachment
    comment
    widget
    nav_menu
    nav_menu_item
    block
    options_page

    */

    // TODO: Support getting ID from slug

    // Only accepts single rule
    $rule = [
      'param'    => $key,
      'operator' => in_array( 'not', $atts['keys'] ) ? '!=' : '==',
      'value'    => $value,
    ];
  }

  if (empty( $rule )) return;

  /**
   * Support array of values
   *
   * This shortcut only works for a single location rule. For multiple rules, user must create
   * location rule groups to clarify "OR" (groups) and "AND" (rules in a group).
   */

  if ( strpos( $rule['value'], ',' ) !== false
    || (isset($rule['value'][0]) && $rule['value'][0]==='[')
  ) {

    $values = format\multiple_values($rule['value']);

    // Each must be in its own group, as "OR"

    foreach ( $values as $value ) {
      $html->current_field_group_config['location_rule_groups'] [] = [
        array_merge($rule, [
          'value' => $value,
        ]),
      ];
    }

    return;
  }

  if ( $html->current_field_group_location_rule_group === false ) {
    $html->current_field_group_location_rule_group = [];
  }

  // Rules are combined as "AND".
  $html->current_field_group_location_rule_group [] = $rule;

  // If current rule is outside of any group, it's handled by FieldGroup tag
  // If inside a group, rule is added by LocationRuleGroup tag
};
