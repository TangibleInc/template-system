<?php
/**
 * <Get> different types of values: route, url, template, setting, variable
 */
$html->get_variable_tag = function( $atts, $content ) use ( $html ) {

  $name = array_shift( $atts['keys'] ); // First attribute without key

  if ( isset( $atts['name'] ) ) {

    $name = $atts['name'];
    unset( $atts['name'] );

  } else {

    // Check variable type from attribute name, for example: <Get template=x>

    foreach ( $atts as $key => $value ) {
      if ( isset( $html->variable_types[ $key ] ) ) {
        unset( $atts[ $key ] );
        return $html->get_variable_type( $key, $value, $atts );
      }
    }

    if ( isset( $html->variable_types[ $name ] ) ) {
      return $html->get_variable_type( $name, '', $atts );
    }
  }

  // Default type: variable

  return $html->get_variable_type( 'variable', $name, $atts );
};

$html->get_variable_type = function( $type, $name, $atts = [] ) use ( $html ) {

  if (empty( $type ) || ! isset( $html->variable_types[ $type ] )) return;

  return $html->variable_types[ $type ]['get'](
    $name, $atts, $html->variable_type_memory[ $type ]
  );
};
