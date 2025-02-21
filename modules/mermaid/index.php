<?php
/**
 * Mermaid - Diagram library
 *
 * @see http://mermaid-js.github.io/mermaid/
 * @see https://github.com/mermaid-js/mermaid
 */
namespace tangible\template_system\mermaid;
use tangible\framework;
use tangible\template_system;

function register() {
  $url = template_system::$state->url . '/modules/mermaid';
  $version = template_system::$state->version;
  
  wp_register_script(
    'tangible-mermaid',
    "{$url}/build/mermaid.min.js",
    [ 'jquery' ],
    $version,
    true
  );  
}

function enqueue() {
  wp_enqueue_script('tangible-mermaid');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );


$html->add_raw_tag('Mermaid', function($atts, $content) use ($html) {
  wp_enqueue_script('tangible-mermaid');
  return $html->render_raw_tag(
    'div',
    [
      'class' => 'tangible-mermaid tangible-dynamic-module',
      'data-tangible-dynamic-module' => 'mermaid',
      'style' => 'display: none'
    ]+$atts,
    $html->render_raw_tag('code', [], trim($content))
  );
});

function register_mermaid_script() {

  $url = framework\module_url( __FILE__ ) . '/build';
  $version = template_system::$state->version;

  wp_register_script(
    'tangible-mermaid',
    "{$url}/mermaid.min.js",
    [],
    $version
  );
};

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register_mermaid_script', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register_mermaid_script', 0 );
