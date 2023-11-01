<?php

namespace Tangible\TemplateSystem\Editor;

use Tangible\TemplateSystem\Editor as editor;

function enqueue_editor() {

  // $linters = editor\enqueue_linters();

  $url = editor::$state->url;
  $version = editor::$state->version;

  // Code Editor

  wp_enqueue_script(
    'tangible-template-system-editor',
    $url . '/build/editor.min.js',
    [], // $linters,
    $version,
    true
  );
}

function enqueue_editor_language_definition() {

  // Pass language data

  wp_localize_script( 'tangible-template-system-editor', 'TangibleTemplateLanguage', get_language_definition() );
}

/**
 * IDE
 */

function enqueue_ide() {

  editor\enqueue_editor();
  editor\enqueue_editor_language_definition();

  $url = editor::$state->url;
  $version = editor::$state->version;

  wp_enqueue_script(
    'tangible-template-system-ide',
    $url . '/build/ide.min.js',
    [
      // 'tangible-ajax', // TODO: Replace with new REST Client module
      'tangible-module-loader',
      'tangible-template-system-editor',
      'wp-element',
    ],
    $version,
    true
  );

  wp_enqueue_style(
    'tangible-template-system-ide',
    $url . '/build/ide.min.css',
    [],
    $version
  );
}

function load_ide() {

  editor\enqueue_ide();

  ?><div id="tangible-template-system-ide"></div><?php

  // Remove admin page footer

  add_filter('admin_footer_text', '__return_false'); // Left
  add_filter('update_footer', '__return_false', 11); // Right
}
