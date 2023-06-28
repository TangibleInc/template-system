<?php

/**
 * Register with Logic module
 */

$html->control_variable_type_logic_rules = [
  [
    'name'       => 'control',
    'label'    => 'Control variable type',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => $html->logic_comparisons,
    'values'   => [
      'type' => 'string',
    ],
  ],
];

$html->evaluate_control_variable_type_logic_rule = function($rule, $atts = []) use ($loop, $logic, $html) {

  $condition = true;

  $field   = isset($rule['field']) ? $rule['field'] : '';
  $value   = isset($rule['value']) ? $rule['value'] : '';
  $operand = isset($rule['operand']) ? $rule['operand'] : '';

  $current_loop = $loop->get_current();

  switch ($field) {
    case 'control':
      $control_name = $rule['field_2'] ?? '';
      $current_value = $html->get_control_variable( $control_name, $atts );
      // Date comparison: Returns true/false or null for unknown operand (pass through)
      $condition = $html->evaluate_date_comparison($value, $current_value, $atts);
      if (is_bool($condition)) return $condition;
      $condition = $html->evaluate_logic_comparison($operand, $value, $current_value, $atts);
    break;
  }

  return $condition;
};

$logic->extend_rules_by_category(
  'control',
  $html->control_variable_type_logic_rules,
  $html->evaluate_control_variable_type_logic_rule
);
