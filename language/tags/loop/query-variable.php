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

    $loop_atts = $atts + [
      'instance' => true,
    ];

    if ( ! empty( $content ) ) {
      // Create a map and merge into loop attributes
    $html->render([
        [
          'tag'        => 'Map',
          'attributes' => [ 'name' => '_query' ],
          'children'   => $content,
        ],
      ]);
      $custom_query = $html->get_map( '_query' );
      if ( is_array( $custom_query ) && ! empty( $custom_query ) ) {
        $loop_atts = array_merge( $loop_atts, $custom_query );
      }
    }

    $loop_instance = $html->loop_tag( $loop_atts, [] );

    /**
     * Restore original loop attributes so they can be passed via AJAX, such as
     * for pagination
     */
    unset($loop_instance->args['instance']);

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
