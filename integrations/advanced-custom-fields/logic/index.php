<?php
/**
 * Extend the If tag with ACF field conditions
 */

$logic->extend_rules_by_category(
  'acf',
  require_once __DIR__ . '/rules.php',
  // Evaluator

  function( $rule, $atts = [] ) use ( $loop, $logic, $html ) {

    $condition = true;

    $field   = isset( $rule['field'] ) ? $rule['field'] : '';
    $value   = isset( $rule['value'] ) ? $rule['value'] : '';
    $operand = isset( $rule['operand'] ) ? $rule['operand'] : '';

    /**
     * Logic is similar to /logic/evaluate.php, case "field"
     */

    $current_loop = $loop->get_current();

    $acf_field_type = substr( $field, 4 ); // After "acf_"

    $field_name = isset( $rule['field_2'] ) ? $rule['field_2'] : '';

    // $current_value = $loop->get_field($field_name);

    $current_value = $html->get_acf_field_type($acf_field_type, $field_name, [
      'display'        => false, // Get raw value
      'tag_attributes' => $atts,
    ]);

    if ( in_array( $acf_field_type, [ 'date', 'date_time', 'time' ] ) ) {

      // Date comparison: Returns true/false or null for unknown operand (pass through)
      $condition = $html->evaluate_date_comparison( $value, $current_value, $atts );

      if (is_bool( $condition )) return $condition;
    }

    /**
     * Use common comparisons - @see /logic/comparison.php
     */

    $condition = $html->evaluate_logic_comparison( $operand, $value, $current_value );

    // tangible\see($rule, $condition, $current_value);

    return $condition;
  }
);
