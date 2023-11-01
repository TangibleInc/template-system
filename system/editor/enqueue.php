<?php

$plugin->enqueue_template_editor = function($codemirror = 5) use ( $plugin, $html, $ajax ) {

  $ajax->enqueue();

  $js_deps = ['tangible-ajax'];
  $css_deps = [];

  if ($codemirror === 5) {
    // Legacy code editor
    $html->enqueue_codemirror(); // See /template/codemirror
    $js_deps []= 'tangible-codemirror';
    $css_deps []= 'tangible-codemirror';
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
