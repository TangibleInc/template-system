<?php
/**
 * Glider - Fullscreen gallery slider
 *
 * @see vendor/tangible/interface
 */

$html->add_open_tag('Glider', function( $atts, $nodes ) use ( $html, $interface ) {

  $interface->enqueue( 'glider' );

  // <Glider enqueue />
  if (in_array( 'enqueue', $atts['keys'] )) return;

  return $html->render_tag('div', array_merge($atts, [
    'class' => 'tangible-glider tangible-dynamic-module'
      . ( isset( $atts['class'] ) ? ' ' . $atts['class'] : '' )
    ,
    /**
     * Support for page builders with dynamic HTML
     * @see /module-loader in Template module
     */
    'data-tangible-dynamic-module' => 'glider',
  ]), $nodes);
});

$html->add_open_tag('Glide', function( $atts, $nodes ) use ( $html, $interface ) {

  // TODO: Image linked to thumbnail

  return $html->render_tag( 'a', $atts, $nodes );
});
