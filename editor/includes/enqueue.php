<?php

namespace Tangible\TemplateSystem\Editor;

use Tangible\TemplateSystem\Editor as editor;

function enqueue_editor() {

  // $linters = editor\enqueue_linters();

  // Code Editor

  wp_enqueue_script(
    'tangible-template-system-editor',
    editor\state::$url . 'build/editor.min.js',
    [], // $linters,
    editor\state::$version,
    true
  );
}

function enqueue_editor_language_definition() {

  // Pass language data

  wp_localize_script( 'tangible-template-system-editor', 'TangibleTemplateLanguage', get_language_definition() );
}

function enqueue_ide() {

  editor\enqueue_editor();
  editor\enqueue_editor_language_definition();

  wp_enqueue_script(
    'tangible-template-system-ide',
    editor\state::$url . 'build/ide.min.js',
    [
      'tangible-ajax', // TODO: Replace with new AJAX/REST Client module
      'tangible-module-loader',
      'tangible-template-system-editor',
      'wp-element',
    ],
    editor\state::$version,
    true
  );

  wp_enqueue_style(
    'tangible-template-system-ide',
    editor\state::$url . 'build/ide.min.css',
    [],
    editor\state::$version
  );
}

function load_ide() {

  editor\enqueue_ide();

  ?><div id="tangible-template-system-ide"></div><?php

  // Remove admin page footer

  add_filter('admin_footer_text', '__return_false'); // Left
  add_filter('update_footer', '__return_false', 11); // Right
}
