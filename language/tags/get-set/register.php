<?php

/**
 * Register types for <Get> and <Set>
 */

$html->variable_types = [
  // type: { get: function, set: function }
];

$html->variable_type_memory = [
  // type: { [key: string]: any }
];

$html->register_variable_type = function( $type, $callbacks ) use ( $html ) {
  $html->variable_types[ $type ]       = $callbacks;
  $html->variable_type_memory[ $type ] = [];
};

$html->get_variable_type_callbacks = function( $type = '' ) use ( $html ) {
  return isset( $html->variable_types[ $type ] )
    ? $html->variable_types[ $type ]
    : $html->variable_types['variable'];
};

$html->flush_variable_type_memory = function( $type ) use ( $html ) {
  $html->variable_type_memory[ $type ] = [];
};
