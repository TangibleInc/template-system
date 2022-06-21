<?php

/**
 * Evaluate rule groups
 *
 * Each rule is an array of tokens, parsed from <if> attributes. Tokens are
 * interpreted as:
 *
 * - field, field_2
 * - operand
 * - value, value_2, value_3
 *
 * The only required part is field, which must match one of the registered rules.
 */

$html->evaluate_logic_token_rule_groups = function( $token_rule_groups, $atts = [] ) use ( $logic, $html ) {
  /**
   * Rules registered with Logic module, using $logic->extend_rules()
   */
  $rules_by_field = $logic->get_rules();
  $condition      = true;

  // tgbl()->see('if evaluate token rule groups', $token_rule_groups);

  foreach ( $token_rule_groups as $group_index => $group ) {

    $rule_group_condition = true;

    foreach ( $group as $rule_index => $tokens ) {

      $rule           = [];
      $rule_condition = true;

      $token_count = count( $tokens );
      if ($token_count === 0) continue;

      /**
       * Rule can start with "not"
       */
      $is_not = $tokens[0] === 'not';
      if ( $is_not ) {
        array_shift( $tokens );
      }

      $field_name = $rule['field'] = array_shift( $tokens );

      if ( ! isset( $rules_by_field[ $field_name ] ) ) {
        // Unknown field
        $rule_condition   = false;
        $rule_definitions = [];
      } else {
        $rule_definitions = $rules_by_field[ $field_name ];
      }

      foreach ( $rule_definitions as $def ) {

        // Build rule from shortcode parameter tokens, based on matching rule definition

        $remaining_tokens = $tokens; // Copy

        if ( isset( $def['field_2'] ) ) {
          $rule['field_2'] = array_shift( $remaining_tokens );
        }

        if ( isset( $def['operands'] ) ) {

          $token = array_shift( $remaining_tokens );

          // Unknown operand
          if ( isset( $def['operands_by_key'] )
            && ! isset( $def['operands_by_key'][ $token ] )
          ) {

            // field_2 is operand
            if ( isset( $rule['field_2'] )
              && isset( $def['operands_by_key'][ $rule['field_2'] ] )
            ) {
              $rule['operand'] = $rule['field_2'];
              $rule['field_2'] = '';
            } else {
              $rule['operand'] =
                ! is_null( $token ) ? 'is'
                  /**
                   * Previously used implicit "exists", but now passing empty operand
                   * so comparison logic can optionally check other attributes like is="..."
                   * See /logic/comparison.php, case 'exists'
                   */
                  : '';
            }

            // Push token back on stack for value
            $remaining_tokens [] = $token;

          } else {
            $rule['operand'] = $token;
          }
        }

        // values, values_2, values_3
        for ( $i = 1; $i <= 3; $i++ ) {

          $value_key_suffix = $i > 1 ? "_$i" : '';
          $values_key       = "values{$value_key_suffix}";

          if ( ! isset( $def[ $values_key ] )) break;
          $token = array_shift( $remaining_tokens );
          if ($token === null) break;
          $rule[ "value{$value_key_suffix}" ] = $token;
        }

        /**
         * Call registered evaluator for this field
         */

        // tgbl()->see('if evaluate rule', $rule);

        $evaluator = $def['evaluator'];

        if ( is_array( $evaluator ) ) {
          foreach ( array_reverse( $evaluator ) as $evaluate_rule ) {

            $evaluated_condition = $evaluate_rule( $rule, $atts );

            if ( ! $evaluated_condition ) break;
          }
        } else {
          $evaluated_condition = $evaluator( $rule, $atts );
        }

        // Apply "not"
        if ( $is_not ) {
          $evaluated_condition = ! $evaluated_condition;
        }

        // AND - All matching evaluators must return true for the rule
        if ( ! $evaluated_condition ) {
          $rule_condition = false;
          break;
        }
      }

      // AND - All rules must be true for the group
      if ( ! $rule_condition ) {
        $rule_group_condition = false;
        break;
      }
    }

    // OR - At least one rule group must be true for the whole condition
    if ( $rule_group_condition ) {
      $condition = true;
      break;
    } else {
      $condition = false;
    }
  }

  return $condition;
};
