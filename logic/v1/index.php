<?php

namespace Tangible\Logic;

/**
 * Globally namespaced functions for backward compatibility
 */

function enqueue() {
  return tangible_logic()->enqueue();
}

function evaluate_rule_groups( $rule_groups, $evaluate_rule, $context = [] ) {
  return tangible_logic()->evaluate_rule_groups( $rule_groups, $evaluate_rule, $context );
};

// TODO: Remove below after updating BeaverDash

function extend_logic_shortcode( $rules_definition, $rule_evaluator ) {
  return tangible_logic()->extend_logic_tag_rules( $rules_definition, $rule_evaluator );
};

function get_logic_shortcode_rules() {
  return tangible_logic()->get_logic_tag_rules();
};
