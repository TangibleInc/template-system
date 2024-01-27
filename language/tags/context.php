<?php
/**
 * Template context - Each template file gets a local context
 * Used to keep track of current template file path.
 *
 * @see ./load.php
 */
$html->contexts = [];

$html->add_closed_tag('PushContext', function( $atts, $nodes ) use ( $html ) {

  unset( $atts['keys'] );

  $context = array_merge( $html->get_current_context(), $atts );

  if ( ! empty( $nodes ) ) {
    $obj = $html->render( $nodes );
    if ( is_array_( $obj ) ) {
      foreach ( $obj as $key => $value ) {
        $context[ $key ] = $value;
      }
    }
  }

  $html->contexts [] = $context;
});

$html->add_closed_tag('PopContext', function() use ( $html ) {
  array_pop( $html->contexts );
});

$html->get_current_context = function( $key = false ) use ( $html ) {
  $pos = count( $html->contexts ) - 1;
  if ($pos < 0) return $key ? '' : [];
  return $key ? (
    isset( $html->contexts[ $pos ][ $key ] )
      ? $html->contexts[ $pos ][ $key ]
      : '' // Was null
  ) : $html->contexts[ $pos ];
};
