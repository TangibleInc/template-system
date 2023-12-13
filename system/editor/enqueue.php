<?php
namespace tangible\template_system;
use tangible\ajax;
use tangible\template_system\editor;

$plugin->enqueue_template_editor = function($codemirror = 5) use ( $plugin, $html ) {

  ajax\enqueue();

  $js_deps = ['tangible-ajax'];
  $css_deps = [];

  if ($codemirror === 5) {

    /**
     * Legacy code editor
     */

    $html->enqueue_codemirror_v5(); // See /template/codemirror

    $js_deps []= 'tangible-codemirror-v5';
    $css_deps []= 'tangible-codemirror-v5';

  } elseif ($codemirror === 6) {

    /**
     * New editor with CodeMirror 6
     */

    $plugin->enqueue_template_editor_bridge();
    $js_deps []= 'tangible-template-editor-bridge';

    $editor_url = editor::$state->url;
    wp_add_inline_script( 'tangible-template-system-editor', <<<JS
window.Tangible = window.Tangible || {}
window.Tangible.editorUrl = "$editor_url"
JS);

  }

  wp_enqueue_script(
    'tangible-template-editor',
    $plugin->url . 'assets/build/template-editor.min.js',
    $js_deps,
    $plugin->version
  );

  wp_enqueue_style(
    'tangible-template-editor',
    $plugin->url . 'assets/build/template-editor.min.css',
    $css_deps,
    $plugin->version
  );

};

$plugin->enqueue_template_editor_bridge = function() use ( $plugin ) {

  editor\enqueue_editor();
  editor\enqueue_editor_language_definition();

  wp_enqueue_script(
    'tangible-template-editor-bridge',
    $plugin->url . 'assets/build/template-editor-bridge.min.js',
    [],
    $plugin->version
  );

  wp_enqueue_style(
    'tangible-template-editor-bridge',
    $plugin->url . 'assets/build/template-editor-bridge.min.css',
    [],
    $plugin->version
  );
};
