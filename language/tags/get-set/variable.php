<?php
/**
 * Generic variable type
 */
$html->register_variable_type('variable', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {

    // Variable is rendered by default
    if ( ! isset( $atts['render'] ) || ( $atts['render'] !== false && $atts['render'] !== 'false' ) ) {
      $content = $html->render( $content );
    }

    // Trim string by default
    if ( is_string( $content ) &&
      ( ! isset( $atts['trim'] ) || ( $atts['trim'] !== 'false' && $atts['trim'] !== false ) )
    ) {
      $content = trim( $content );
    }

    $memory[ $name ] = $content;
  },
  'get' => function( $name, $atts, &$memory ) use ( $html ) {
    return isset( $memory[ $name ] ) ? $memory[ $name ] : '';
  },
]);

$html->get_variable = function( $name, $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'variable', $name, $atts );
};

$html->set_variable = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'variable', $name, $content, $atts );
};
