<?php

$plugin->enqueue_template_editor = function() use ( $plugin, $html, $ajax ) {

  $html->enqueue_codemirror(); // See Template module, modules/codemirror
  $ajax->enqueue();

  wp_enqueue_script(
    'tangible-template-editor',
    $plugin->url . 'assets/build/template-editor.min.js',
    [
      'tangible-ajax',
      'tangible-codemirror',
    ],
    $plugin->version
  );

  wp_enqueue_style(
    'tangible-template-editor',
    $plugin->url . 'assets/build/template-editor.min.css',
    [
      'tangible-codemirror',
    ],
    $plugin->version
  );

};
