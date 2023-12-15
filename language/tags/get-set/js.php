<?php

/**
 * Variable type "js"
 */
$html->register_variable_type('js', [
  'set' => function($name, $atts, $content, &$memory) use ($html) {

    // Ensure valid variable name
    $name = preg_replace("/[^a-zA-Z0-9_]+/i", "", $name);

    if ( ! isset( $atts['render'] ) || $atts['render'] === 'true' ) {
      $content = $html->render( $content );
    }

    /**
     * Default value type is "raw" (unquoted), previously "string" (quoted)
     * Same for Sass variable type - See ./js.php 
     */
    $type = isset( $atts['type'] ) ? $atts['type'] : 'raw';

    switch ($type) {
      case 'string':
        // Wrap in quotes
        $content = '"' . str_replace('"', '\"', $content) . '"';
      break;
      // case 'number':
      // case 'map':
      // case 'object':
      // case 'list':
      // case 'array':
      // case 'raw':
      default:
        // No formatting - Pass directly as JS value
    }

    $memory[ $name ] = $content;
  },
  'get' => function($name, $atts, &$memory) use ($html) {
    return isset($memory[ $name ]) ? $memory[ $name ] : '';
  },
]);

$html->get_js_variables = function() use ($html) {
  return $html->variable_type_memory['js'];
};

$html->clear_js_variables = function() use ($html) {
  $html->variable_type_memory['js'] = [];
};

$html->set_js_variable = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'js', $name, $content, $atts );
};
