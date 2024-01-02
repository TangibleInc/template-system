<?php
namespace tangible\template_system;
use tangible\ajax;
use tangible\template_system;
use tangible\template_system\editor;

template_system::$state->template_editor_enqueued = false;

function enqueue_template_editor($codemirror = 6) {

  if (template_system::$state->template_editor_enqueued) return;
  template_system::$state->template_editor_enqueued = true;

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

template_system::$state->codemirror_v6_enqueued = false;

function enqueue_codemirror_v6() {

  if (template_system::$state->codemirror_v6_enqueued) return;
  template_system::$state->codemirror_v6_enqueued = true;

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

  if (template_system\get_settings('atomic_css')) {
    wp_enqueue_script(
      'tangible-atomic-css',
      $url . '/atomic-css.min.js',
      [],
      $version
    );  
  }
};
