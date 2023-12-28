<?php
namespace tangible\template_system;
use tangible\ajax;
use tangible\template_system;
use tangible\template_system\editor;

function enqueue_template_editor($codemirror = 6) {

  ajax\enqueue();

  $js_deps = ['tangible-ajax'];
  $css_deps = [];

  if ($codemirror === 5) {

    /**
     * Legacy code editor
     */

    template_system\enqueue_codemirror_v5(); // See /template/codemirror

    $js_deps []= 'tangible-codemirror-v5';
    $css_deps []= 'tangible-codemirror-v5';

  } elseif ($codemirror === 6) {

    /**
     * New editor
     */

    template_system\enqueue_codemirror_v6();
    $js_deps []= 'tangible-codemirror-v6';

  }

  $url = template_system::$state->url . '/admin/build';
  $version = template_system::$state->version;

  wp_enqueue_script(
    'tangible-template-editor',
    $url . '/template-editor.min.js',
    $js_deps,
    $version
  );

  wp_enqueue_style(
    'tangible-template-editor',
    $url . '/template-editor.min.css',
    $css_deps,
    $version
  );

};

function enqueue_codemirror_v6() {

  editor\enqueue_editor();

  $url = template_system::$state->url . '/admin/build';
  $version = template_system::$state->version;

  wp_enqueue_script(
    'tangible-codemirror-v6',
    $url . '/template-editor-bridge.min.js',
    [],
    $version
  );

  wp_enqueue_style(
    'tangible-codemirror-v6',
    $url . '/template-editor-bridge.min.css',
    [],
    $version
  );
};
