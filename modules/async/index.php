<?php
/**
 * Async tag renders its content after page load using AJAX
 */
namespace tangible\template_system\async_render;
use tangible\ajax;
use tangible\template_system;
use tangible\template_system\async_render;

function register() {
  $url = template_system::$state->url . '/modules/async/build';
  $version = template_system::$state->version;
  
  wp_register_script(
    'tangible-async-render',
    "{$url}/async-render.min.js",
    [ 'jquery', 'tangible-ajax' ],
    $version,
    true
  );  
}

function enqueue() {
  ajax\enqueue();
  async_render\register();
  wp_enqueue_script( 'tangible-async-render' );
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );

$html->async_tag = function( $atts, $nodes ) use ( $html ) {

  async_render\enqueue();

  $template                        = $html->render_raw( $nodes );
  $post_id                         = get_the_ID();
  if ($post_id === false) $post_id = 0; // Important for JSON en/decode and verify hash
  $context                         = [
    // @see /tags/loop/variables.php
    'variable_types'  => $html->get_variable_types_from_template( $nodes ),
    'current_post_id' => $post_id,
  ];

  return $html->render_raw_tag('div', [
    'class'              => 'tangible-async-render',
    'data-template-data' => json_encode([
      'template'     => $template,
      'hash'         => $html->create_tag_attributes_hash( $template ),
      'context'      => $context,
      'context_hash' => $html->create_tag_attributes_hash( $context ),
    ]),
  ], []);
};

$html->add_open_tag('Async', $html->async_tag);
