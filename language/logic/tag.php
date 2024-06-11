<?php
/**
 * Logic tag - Build conditional rules for new Logic module
 * @see /logic
 */
namespace tangible\template_system;
use tangible\html;
use tangible\logic;
use tangible\template_system;

template_system::$state->logic_registry = [];
template_system::$state->current_logic = [];
template_system::$state->current_rule_group = [];

function logic_tag($atts, $nodes) {

  if (isset($atts['keys']) && isset($atts['keys'][0])) {
    $atts['name'] = $atts['keys'][0];
  }
  unset($atts['keys']);

  $debug = $atts['debug'] ?? false;
  unset($atts['debug']);
  
  $logic = [];
  $compare = $atts['compare'] ?? 'and';
  unset($atts['compare']);

  // Alias
  if ($compare==='any') $compare = 'or';
  elseif ($compare==='all') $compare = 'and';

  $rule_group = [];

  $state = $atts + [
    'logic' => [
      $compare => &$rule_group
    ]
  ];

  $previous_state = template_system::$state->current_logic;
  template_system::$state->current_logic = $state;

  $previous_rule_group = template_system::$state->current_rule_group;
  template_system::$state->current_rule_group = &$rule_group;

  html\render($nodes);

  // Restore
  template_system::$state->current_logic = &$previous_state;
  template_system::$state->current_rule_group = &$previous_rule_group;

  if (isset($state['name'])) {
    $name = $state['name'];
    template_system::$state->logic_registry[ $name ] = $state;
  }
  
  if ($debug) {
    return $state;
  }

  // Evaluate
}

function rule_tag($atts, $nodes) {

  if (isset($atts['keys']) && empty($atts['keys'])) {
    unset($atts['keys']);
  }

  $rule = [
    'rule' => $atts
  ];
  template_system::$state->current_rule_group []= $rule;
}

function operator_tag($op, $atts, $nodes) {

  $rule_group = [];

  $previous_rule_group = &template_system::$state->current_rule_group;
  template_system::$state->current_rule_group = &$rule_group;

  html\render($nodes);

  // Restore
  template_system::$state->current_rule_group = &$previous_rule_group;

  if (!empty($rule_group)) {
    $previous_rule_group []= [
      $op => $rule_group
    ];
  }
}

function and_tag($atts, $nodes) {
  return operator_tag('and', $atts, $nodes);
}

function or_tag($atts, $nodes) {
  return operator_tag('or', $atts, $nodes);
}

function not_tag($atts, $nodes) {
  return operator_tag('not', $atts, $nodes);
}

/**
 * <All> is same as "and", and <All false> is same as "not any" (all is false)
 */
function all_tag($atts, $nodes) {
  $operator = 'and';
  if (!empty($atts['keys']) && $atts['keys'][0]==='false') {
    return operator_tag('not', $atts, [
      [ 'tag' => 'Any', 'attributes' => [], 'children' => $nodes ]
    ]);
  }
  return operator_tag($operator, $atts, $nodes);
}

/**
 * <Any> is same as "or", and <Any false> is same as "not all" (not all is true)
 */
function any_tag($atts, $nodes) {
  if (!empty($atts['keys']) && $atts['keys'][0]==='false') {
    return operator_tag('not', $atts, $nodes);
  }
  return operator_tag('or', $atts, $nodes);
}

/**
 * Evaluate logic object with given rule evaluator
 * @returns boolean (true or false)
 */
function evaluate_logic($logic, $evaluator = null, $data = []) {
  return logic\evaluate($logic, $evaluator, $data);
}

/**
 * Get logic object by name
 * @returns logic object or false
 */
function get_logic_by_name($name) {
  return template_system::$state->logic_registry[ $name ] ?? false;
}

function evaluate_logic_by_name($name, $evaluator = null, $data = []) {
  $logic = template_system\get_logic_by_name($name);
  return $logic===false
    ? false
    : logic\evaluate(
      $logic['logic'],
      $evaluator,
      $data
    )
  ;
}

html\add_open_tag('Logic', __NAMESPACE__ . '\\logic_tag');
html\add_closed_tag('Rule', __NAMESPACE__ . '\\rule_tag');

html\add_open_tag('And', __NAMESPACE__ . '\\and_tag');
html\add_open_tag('Or', __NAMESPACE__ . '\\or_tag');
html\add_open_tag('Not', __NAMESPACE__ . '\\not_tag');
html\add_open_tag('All', __NAMESPACE__ . '\\all_tag');
html\add_open_tag('Any', __NAMESPACE__ . '\\any_tag');
