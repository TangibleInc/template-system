<?php
/**
 * Glider - Fullscreen gallery slider
 */
namespace tangible\template_system\glider;

use tangible\template_system;
use tangible\template_system\glider;

function register() {
  $url = template_system::$state->url . '/modules/glider';
  $version = template_system::$state->version;
  
  wp_register_script(
    'tangible-glider',
    "{$url}/build/glider.min.js",
    [ 'jquery' ],
    $version,
    true
  );  

  wp_register_style(
    'tangible-glider',
    "{$url}/build/glider.min.css",
    [],
    $version,
  );  
}

function enqueue() {
  wp_enqueue_script('tangible-glider');
  wp_enqueue_style('tangible-glider');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );


$html->add_open_tag('Glider', function( $atts, $nodes ) use ( $html ) {

  glider\enqueue();

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

$html->add_open_tag('Glide', function( $atts, $nodes ) use ( $html ) {

  // TODO: Image linked to thumbnail

  return $html->render_tag( 'a', $atts, $nodes );
});
