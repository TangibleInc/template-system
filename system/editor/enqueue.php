<?php

use Tangible\TemplateSystem as system;
use Tangible\TemplateSystem\Editor as editor;

$plugin->enqueue_template_editor = function($codemirror = 5) use ( $plugin, $html, $ajax ) {

  $ajax->enqueue();

  $js_deps = ['tangible-ajax'];
  $css_deps = [];

  // Legacy code editor
  if ($codemirror === 5) {

    $html->enqueue_codemirror(); // See /template/codemirror

    $js_deps []= 'tangible-codemirror';
    $css_deps []= 'tangible-codemirror';

  } elseif ($codemirror === 6) {

    $plugin->enqueue_template_editor_bridge();
    $js_deps []= 'tangible-template-editor-bridge';
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
