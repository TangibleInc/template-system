<?php

require_once __DIR__ . '/category.php';
require_once __DIR__ . '/extend.php';
require_once __DIR__ . '/prepare.php';

/**
 * This is used by other modules or plugins to extend a shared set of rules.
 *
 * These rules are used in the Template module, as well as in visibility conditions UI
 * for page builders like Gutenberg.
 */

$logic->state['rules_by_field'] = [];

$logic->get_rules = function() use ( $logic ) {
  return $logic->state['rules_by_field'];
};

/**
 * Check if a field takes a value, for use in parsing If tag attributes
 */
$logic->is_field_with_value = function( $name ) use ( $logic ) {
  if ( isset( $logic->state['rules_by_field'][ $name ] ) ) {
    foreach ( $logic->state['rules_by_field'][ $name ] as $field ) {
      if (isset( $field['field_2'] )) return true;
    }
  }
  return false;
};

/**
 * Get an array (instead of map) of fields from all rules
 *
 * Used for "raw" evaluation of rules, and to generate documentation.
 */
$logic->get_fields = function() use ( $logic ) {

  $all_fields     = [];
  $rules_by_field = $logic->state['rules_by_field'];

  foreach ( $rules_by_field as $key => $fields ) {
    foreach ( $fields as $field ) {
      array_push( $all_fields, $field );
    }
  }

  return $all_fields;
};

// Backward compatibility
$logic->extend_logic_tag_rules = $logic->extend_rules;
$logic->get_logic_tag_rules    = $logic->get_rules;
