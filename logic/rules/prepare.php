<?php

$logic->prepare_rule_definition = function( $definition, $rule_evaluator ) use ( $logic ) {

  if ( ! isset( $definition['category'] ) ) {
    $definition['category'] = '';
  }

  $definition['evaluator'] = $rule_evaluator
    ? $rule_evaluator
    : function() {
      return true;
    }; // Just in case evaluator is empty

  // Create map of operands for faster matching
  if ( isset( $definition['operands'] ) ) {
    foreach ( $definition['operands'] as $operand ) {
      if ( ! isset( $operand['name'] )) continue;
      $definition['operands_by_key'][ $operand['name'] ] = $operand;
    }
  }

  // Prepare value definitions for UI script
  foreach ( [
    'field_2',
    'values',
    'values_2',
  ] as $key ) {

    if ( ! isset( $definition[ $key ] )) continue;

    $definition[ $key ] = $logic->prepare_value_type_definition(
      $definition[ $key ],
      substr( $key, 0, 6 ) === 'values'
    );
  }

  return $definition;
};

/**
 * In a rule definition, the "field_2" and "values" properties can be:
 * - an array of value definitions
 * - a single associative array for value type.
 *
 * @see assets/src/tangible-logic.js, buildValueSelect()
 */
$logic->prepare_value_type_definition = function( $definition, $wrap_in_array = false ) {

  if ( ! is_array( $definition )) return $definition;

  if ( isset( $definition['type'] ) ) {

    if ( $definition['type'] === 'string' ) {
      $definition['type'] = 'text';
    }
  } elseif ( empty( $definition ) ) {
    // Empty array defaults to type string
    $definition = [
      'type' => 'text', // number, text, select
    ];
  } else {
    return $definition;
  }

  // For values, the UI script expects schema: valueDef[] or [ valueTypeDef ]
  if ( $wrap_in_array ) {
    $definition = [ $definition ];
  }

  return $definition;
};
