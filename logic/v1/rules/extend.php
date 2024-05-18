<?php

$logic->extend_rules = function( $rules_definition, $rule_evaluator ) use ( $logic ) {

  $rules_by_field = &$logic->state['rules_by_field'];

  // Organize rule definitions and evaluators by field
  foreach ( $rules_definition as $field ) {

    $field_name = $field['name'];

    if ( ! isset( $rules_by_field[ $field_name ] ) ) {
      $rules_by_field[ $field_name ] = [];
    }

    $rules_by_field[ $field_name ] [] = $logic->prepare_rule_definition( $field, $rule_evaluator );
  }
};

$logic->extend_existing_rule = function( $rule_definition, $rule_evaluator ) use ( $logic ) {

  $name = $rule_definition['name'];

  $definition = $logic->prepare_rule_definition( $rule_definition, $rule_evaluator );

  if ( isset( $logic->state['rules_by_field'][ $name ] ) && isset( $logic->state['rules_by_field'][ $name ][0] ) ) {

    $merged_rule = $logic->state['rules_by_field'][ $name ][0];

    if ( isset( $merged_rule['evaluator'] ) ) {
      if ( ! is_array( $merged_rule['evaluator'] ) ) {
        $merged_rule['evaluator'] = [ $merged_rule['evaluator'] ];
      }
      $merged_rule['evaluator'] [] = $rule_evaluator;
    } else {
      $merged_rule['evaluator'] = $rule_evaluator;
    }

    foreach ( [
      'operands',
      'field_2',
      'values',
      'values_2',
    ] as $key ) {
      if ( ! isset( $definition[ $key ] )) continue;
      if ( isset( $merged_rule[ $key ] ) ) {
        $merged_rule[ $key ] = array_merge(
          $merged_rule[ $key ],
          $definition[ $key ]
        );
      } else {
        $merged_rule[ $key ] = $definition[ $key ];
      }
    }

    $logic->state['rules_by_field'][ $name ][0] = $merged_rule;

  } else {
    $logic->state['rules_by_field'][ $name ] = [ $definition ];
  }
};
