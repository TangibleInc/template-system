<?php
/**
 * Query variable type
 *
 * Stores loop instance to support multiple loops reusing the same query
 */
$html->register_variable_type('query', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html, $loop ) {

    // Create loop instance

    unset( $atts['query'] ); // Don't pass variable name

    $loop_instance = $html->loop_tag($atts + [
      'instance' => true,
    ], []);

    $memory[ $name ] = &$loop_instance;

    // Default query
    if ( $name === 'default' ) {
      $loop->current_context = $loop_instance;
    }
  },
  'get' => function( $name, $atts, &$memory ) use ( $html, $loop ) {
    if (isset( $memory[ $name ] )) return $memory[ $name ];
  },
]);

$html->get_query_variable = function( $name, $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'query', $name, $atts );
};

$html->set_query_variable = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'query', $name, $content, $atts );
};
