<?php

namespace Tangible\Math;

$html->math = function( $content = '' ) {

  static $math;

  if ( ! $math ) {

    if ( ! class_exists( 'Tangible\\Math\\Math' ) ) {
      require_once __DIR__ . '/Math.php';
    }

    $math = new Math;
  }

  return $math->evaluate( $content );
};

$html->add_open_tag('Math', function( $atts, $content ) use ( $html ) {
  return $html->math( $html->render( $content ) );
});

/**
 * Math variable type
 */
$html->register_variable_type('math', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {

    $content = $html->render( $content );

    $html->math( $name . '=' . $content );
  },
  'get' => function( $name, $atts, &$memory ) use ( $html ) {
    return $html->math( $name );
  },
]);
