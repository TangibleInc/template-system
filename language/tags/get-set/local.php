<?php
/**
 * Local variables
 *
 * Create a local scope of variables for each template post or file
 *
 * Used in /tags/load.php and tangible-blocks/includes/template/render.php
 */

// Current scope -> parent -> parent..
$html->local_variable_scopes = [
  [],
];

$html->push_local_variable_scope = function( $scope = [] ) use ( $html ) {
  array_unshift( $html->local_variable_scopes, $scope );
};

$html->pop_local_variable_scope = function() use ( $html ) {
  array_shift( $html->local_variable_scopes );
  if ( empty( $html->local_variable_scopes ) ) {
    // Ensure there's at least one scope
    $html->local_variable_scopes = [];
  }
};

$html->register_variable_type('local', [
  'set' => function( $name, $atts, $content ) use ( $html ) {
    $scope          = &$html->local_variable_scopes[0];
    $scope[ $name ] = ( isset( $atts['render'] ) && $atts['render'] !== 'true' )
      ? $content
      : $html->render( $content );
  },
  'get' => function( $name, $atts = [] ) use ( $html ) {
    // Current scope -> parent -> parent..
    foreach ( $html->local_variable_scopes as $scope ) {
      if ( isset( $scope[ $name ] ) ) return $scope[ $name ];
    }
  },
]);

$html->get_local = function( $name, $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'local', $name, $atts );
};

$html->set_local = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'local', $name, $content, $atts );
};
