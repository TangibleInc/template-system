<?php

/**
 * This is the main server-side interface for the module consumer.
 *
 * The function provides a simple structure for evaluating given rule groups:
 *
 * type rule = {
 *   field: string
 *   operand: string
 *   value: any
 *   value_2?: any
 * }
 *
 * type rule_group  = rule[]       // rule AND rule AND..
 * type rule_groups = rule_group[] // rule group OR rule group OR..
 */

$logic->evaluate_rule_groups = function( $rule_groups = [], $evaluate_rule = null, $context = [] ) use ( $logic ) {

  $condition = true;

  if ( is_string( $rule_groups ) ) {
    $rule_groups = @json_decode( $rule_groups );
  }

  if ( ! is_array( $rule_groups ) ) {
    return $condition;
  }

  // Support passing single rule for convenience
  if ( isset( $rule_groups['field'] ) ) {
    $rule_groups = [ $rule_groups ];
  }

  foreach ( $rule_groups as $rule_group ) {

    $rule_group_condition = true;

    foreach ( $rule_group as $rule ) {

      $rule_condition = $evaluate_rule( (array) $rule, $context );

      // AND - if all rules are true
      if ( ! $rule_condition ) {
        $rule_group_condition = false;
        break;
      }
    }

    // OR - if any rule group is true
    if ( $rule_group_condition ) {
      $condition = true;
      break;
    }

    $condition = false;
  }

  return $condition;
};

/**
 * Evaluate rule groups based on the shared set of rules and evaluators from extend_rules()
 *
 * @see ../rules
 */

$logic->evaluate = function( $rule_groups = [], $context = [] ) use ( $logic ) {
  return $logic->evaluate_rule_groups(
    $rule_groups,
    $logic->evaluate_rule_by_field,
    $context
  );
};

$logic->evaluate_rule_by_field = function( $rule, $context = [] ) use ( $logic ) {

  $rules_by_field = $logic->state['rules_by_field'];

  if ( ! isset( $rule['field'] ) || ! isset( $rules_by_field[ $rule['field'] ] )) return true;

  $condition  = true;
  $field_name = $rule['field'];

  /**
   * Evaluators added later has precedence. They should return true by default, to
   * fall back to evaluators added earlier.
   */
  $field_definitions = array_reverse( $rules_by_field[ $field_name ] );

  foreach ( $field_definitions as $field ) {

    $evaluate_rule = $field['evaluator'];

    /**
     * TODO: Extend evaluator return type
     * 
     * The evaluator should return true/false for known fields.
     * Otherwise, it should return null to pass through to the next evaluator.
     */

    if ( is_array( $evaluate_rule ) ) {

      foreach ( array_reverse( $evaluate_rule ) as $evaluator ) {
        $condition = $evaluator( $rule, $context );
        if ( ! $condition ) break;
      }
    } else {
      $condition = $evaluate_rule( $rule, $context );
    }

    // All must be true
    if ( ! $condition ) break;
  }

  return $condition;
};
