<?php
/**
 * Control variables
 *
 * Create a control variables (used only in block for now)
 */

// Current scope -> parent -> parent..
$html->control_variable_scopes = [
  [],
];

$html->push_control_variable_scope = function( $scope = [] ) use ( $html ) {
  array_unshift( $html->control_variable_scopes, $scope );
};

$html->pop_control_variable_scope = function() use ( $html ) {
  array_shift( $html->control_variable_scopes );
  if ( empty( $html->control_variable_scopes ) ) {
    // Ensure there's at least one scope
    $html->control_variable_scopes = [];
  }
};

$html->register_variable_type('control', [
  'set' => function( $name, $atts, $content ) use ( $html ) {
    $scope          = &$html->control_variable_scopes[0];
    $scope[ $name ] = is_array( $content ) ? $content : [ 'value' => $content ];
  },
  'get' => function( $name, $atts = [] ) use ( $html ) {

    foreach ( $html->control_variable_scopes as $scope ) {
      if ( ! isset( $scope[ $name ] ) ) continue;
      $control = $scope[ $name ];
      break;
    }

    $field = $atts['field'] ?? 'value';

    if ( $field === 'all' ) return $control ?? [];
    if ( ! isset( $control ) ) return '';

    return $control[ $field ] ?? '';
  },
]);

$html->get_control_variable = function( $name, $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'control', $name, $atts );
};

$html->set_control_variable = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'control', $name, $content, $atts );
};

$html->clear_control_variables = function() use ( $html ) {
  $html->variable_type_memory['control'] = [];
};
