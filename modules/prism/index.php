<?php
/**
 * Prism - Syntax highlighter
 *
 * @see vendor/tangible/interface
 */

$html->add_raw_tag('Prism', function($atts, $content) use ($html, $interface) {

  $language = isset($atts['language']) ? $atts['language'] : (
    isset($atts['lang']) ? $atts['lang'] : 'markup'
  );

  $interface->enqueue('prism');

  // <Prism enqueue />
  if (in_array('enqueue', $atts['keys'])) return;

  if (in_array('render', $atts['keys']) || isset($atts['render'])) {
    $content = $html->render($content);
  }

  // Remove first new line
  if (mb_substr($content, 0, 1)==="\n") {
    $content = mb_substr($content, 1);
  }

  return $html->render_raw_tag('pre', [
    /**
     * Support for page builders with dynamic HTML
     * @see /module-loader in Template module
     */
    'class' => 'tangible-prism tangible-dynamic-module',
    'data-tangible-dynamic-module' => 'prism',
  ],
    $html->render_raw_tag('code', [
      'class' => "language-$language",
    ], htmlspecialchars($content))
  );
});
