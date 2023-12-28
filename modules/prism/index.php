<?php
/**
 * Prism - Syntax highlighter
 *
 * @see vendor/tangible/interface
 */
namespace tangible\template_system\prism;

use tangible\template_system;
use tangible\template_system\prism;

function register() {
  $url = template_system::$state->url . '/modules/prism';
  $version = template_system::$state->version;

  // From: https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+bash+json+markdown+markup-templating+php+php-extras+jsx+tsx+scss+typescript&plugins=toolbar+copy-to-clipboard
  wp_register_script(
    'tangible-prism',
    "{$url}/vendor/prism.min.js",
    [],
    '1.29.0',
    true
  );

  // Prism: Theme
  wp_register_style(
    'tangible-prism',
    "{$url}/build/prism.min.css",
    [],
    $version
  );
}

function enqueue() {
  wp_enqueue_script('tangible-prism');
  wp_enqueue_style('tangible-prism');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
 
$html->add_raw_tag('Prism', function($atts, $content) use ($html) {

  $language = isset($atts['language']) ? $atts['language'] : (
    isset($atts['lang']) ? $atts['lang'] : 'markup'
  );

  prism\enqueue();

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
