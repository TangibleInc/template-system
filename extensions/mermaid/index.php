<?php
/**
 * Mermaid - Diagram library
 *
 * @see http://mermaid-js.github.io/mermaid/
 * @see https://github.com/mermaid-js/mermaid
 */

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

$plugin->register_mermaid_script = function() use ( $plugin, $html ) {
  wp_register_script(
    'tangible-mermaid',
    "{$plugin->extensions_url}mermaid/build/mermaid.min.js",
    [],
    $html->version
  );
};

add_action( 'wp_enqueue_scripts', $plugin->register_mermaid_script, 0 );
add_action( 'admin_enqueue_scripts', $plugin->register_mermaid_script, 0 );
