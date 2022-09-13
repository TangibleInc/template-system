<?php
/**
 * Control variables
 *
 * Create a control scope of variables for each block post
 *
 * Used in /template/tags/loop/context.php
 */

$html->register_variable_type('control', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {
    $memory[ $name ] = is_array($content) ? $content : [ 'value' => $content ];
  },
  'get' => function( $name, $atts = [], &$memory ) use ( $html ) {
    $field = $atts['field'] ?? 'value';
    return $memory[ $name ][ $field ] ?? '';
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
