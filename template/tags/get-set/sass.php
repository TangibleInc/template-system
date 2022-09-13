<?php

/**
 * Variable type "sass"
 * @see https://sass-lang.com/documentation/values
 */
$html->register_variable_type('sass', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {

    // Ensure valid variable name
    $name = preg_replace( '/[^a-zA-Z0-9_\-]+/i', '', $name );

    // Support dynamic tags in Sass value
    if (is_string($content)) $content = $html->render( $content );
    // Boolean
    elseif (is_bool($content)) $content = $content ? 'true' : 'false';

    $type = isset( $atts['type'] ) ? $atts['type'] : 'string';
    
    switch ( $type ) {
      case 'string':
        // Wrap in quotes
        $content = '"' . str_replace( '"', '\"', $content ) . '"';
          break;
      // case 'number':
      // case 'boolean':
      // case 'color':
      // case 'map':
      // case 'object':
      // case 'list':
      // case 'array':
      // case 'raw':
      default:
        // No formatting
    }

    $memory[ $name ] = $content;
  },
  'get' => function( $name, $atts, &$memory ) use ( $html ) {
    return isset( $memory[ $name ] ) ? $memory[ $name ] : '';
  },
]);

$html->get_sass_variables = function() use ( $html ) {
  return $html->variable_type_memory['sass'];
};

$html->clear_sass_variables = function() use ( $html ) {
  $html->variable_type_memory['sass'] = [];
};

$html->set_sass_variable = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'sass', $name, $content, $atts );
};

