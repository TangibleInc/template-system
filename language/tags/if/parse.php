<?php
use tangible\see;

/**
 * Parse <if> attributes into tokens, grouped by rules
 */
$html->parse_if_tag_logic = function( $atts = [] ) use ( $logic ) {

  $tokens = $atts['keys'];

  /**
   * Each rule group is an array of rules.
   * Each rule is a series of: field, operand, value
   */
  $token_rule_groups = [];

  $current_rule_group = [];
  $current_rule       = [];

  while ( ( $token = current( $tokens ) ) !== false ) {

    if ( $token === 'and' ) {
      // Add to current group: AND
      $current_rule_group [] = $current_rule;
      $current_rule          = [];
      continue;
    }

    if ( $token === 'or' ) {
      $current_rule_group [] = $current_rule;
      $current_rule          = [];

      // Start new group: OR
      $token_rule_groups [] = $current_rule_group;
      $current_rule_group   = [];
      continue;
    }

    if ( $token !== '' ) {

      // Gather tokens for rule

      // Quoted
      if ( $token[0] === "'" || $token[0] === '"' ) {
        $quote = $token[0];
        $token = substr( $token, 1 );

        // Find closing quote
        while ( ( $next_token = next( $tokens ) ) !== false ) {
          if ( $next_token[ count( $next_token ) - 1 ] === $quote ) {
            $token .= ' ' . substr( $next_token, -1 );
            break;
          }
          $token .= ' ' . $next_token;
        }
        continue;
      } else {
        $current_rule [] = $token;
      }
    }

    next( $tokens );
  }

  if ( ! empty( $current_rule ) ) {
    $current_rule_group [] = $current_rule;
  }
  if ( ! empty( $current_rule_group ) ) {
    $token_rule_groups [] = $current_rule_group;
  }

  // Organize each rule group's tokens

  // Fields

  if ( isset( $atts['field'] ) ) {

    // Support attributes field, field_2 - For first rule only

    // Create rule group and rule if needed
    if ( empty( $token_rule_groups ) || empty( $token_rule_groups[0] ) ) {
      $token_rule_groups [] = [ [] ];
    } elseif ( empty( $token_rule_groups[0][0] ) ) {
      $token_rule_groups[0][0] = [];
    }

    // Put fields at the start

    if ( isset( $atts['field_2'] ) ) {
      array_unshift( $token_rule_groups[0][0], $atts['field_2'] );
    }

    array_unshift( $token_rule_groups[0][0], 'field', $atts['field'] );

  } else {

    // Other fields that can have value

    foreach ( $atts as $key => $value ) {

      if ($key === 'compare' || substr( $key, 0, 5 ) === 'value'
        || ! $logic->is_field_with_value( $key ) // Logic module, rules/index.php
      ) continue;

      if ( empty( $token_rule_groups[0][0] ) ) {
        $token_rule_groups[0][0] = [];
      }

      // Move it to the front as tokens: key, value
      array_unshift( $token_rule_groups[0][0], $atts[ $key ] );
      array_unshift( $token_rule_groups[0][0], $key );

      // There can be only one
      break;
    }
  }

  // First rule
  if ( ! empty( $token_rule_groups[0][0] ) ) {

    // Compare

    if ( isset( $atts['compare'] ) ) {
      $token_rule_groups[0][0] [] = $atts['compare'];
    }

    // Values: value, value_2, value_3

    for ( $i = 1; $i <= 3; $i++ ) {

      $value_key_suffix = $i > 1 ? "_$i" : '';
      $value_key        = "value{$value_key_suffix}";

      if ( ! isset( $atts[ $value_key ] )) break;
      $token_rule_groups[0][0] [] = $atts[ $value_key ];
    }
  }

  // Not

  foreach ( $token_rule_groups as $group_index => $group ) {
    foreach ( $group as $rule_index => $rule ) {

      // Convert "is_not" to "not" and "is" for backward compatibility
      $pos = array_search( 'is_not', $rule );
      if ( $pos !== false ) {

        $rule[ $pos ] = 'is';

        if ( $rule[0] === 'not' ) {
          // Support the unlikely case of not + is_not = is
          array_shift( $rule );
        } else {
          array_unshift( $rule, 'not' );
        }
        $token_rule_groups[ $group_index ][ $rule_index ] = $rule;
        continue;
      }

      $pos = array_search( 'not', $rule );
      if ( $pos !== false && $pos !== 0 ) {

        // Move it to the front
        array_splice( $rule, $pos, 1 );
        array_unshift( $rule, 'not' );

        $token_rule_groups[ $group_index ][ $rule_index ] = $rule;
      }
    }
  }

  if ( isset( $atts['debug'] ) && $atts['debug'] ) {
    tangible\see( 'if', $atts, 'parsed', $token_rule_groups );
  }

  return $token_rule_groups;
};
