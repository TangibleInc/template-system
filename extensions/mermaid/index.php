<?php
/**
 * Mermaid - Diagram library
 *
 * @see http://mermaid-js.github.io/mermaid/
 * @see https://github.com/mermaid-js/mermaid
 */

$html->add_raw_tag('Mermaid', function($atts, $content) use ($html) {
  return $html->render_raw_tag(
    'div',
    [
      'data-tangible-dynamic-module' => 'mermaid',
      'style' => 'display: none'
    ]+$atts,
    $html->render_raw_tag('code', [], trim($content))
  );
});

$html->register_dynamic_module('mermaid', [
  'assets' => [
    "{$plugin->extensions_url}mermaid/build/mermaid.min.js"
  ]
]);
