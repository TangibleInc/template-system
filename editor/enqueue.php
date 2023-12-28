<?php
namespace tangible\template_system\editor;

use tangible\template_system;
use tangible\template_system\editor;

function enqueue_editor() {

  // $linters = editor\enqueue_linters();

  $url = editor::$state->url;
  $version = editor::$state->version;

  // Code Editor

  wp_enqueue_script(
    'tangible-template-system-editor',
    $url . '/build/editor.min.js',
    [],
    $version,
    true
  );

  wp_enqueue_style(
    'tangible-template-system-editor',
    $url . '/build/editor.min.css',
    [],
    $version
  );

  wp_localize_script(
    'tangible-template-system-editor',
    'TangibleTemplateSystemEditor',
    [
      /**
       * Editor URL for themes and fonts
       * @see extensions/editor-action-panel
       */
      'editorUrl' => editor::$state->url,
      /**
       * Language definition
       * @see languages/html/autocomplete.ts
       */
      'languageDefinition' => template_system\get_language_definition(),
    ]
    
  );

}

/**
 * IDE
 */

function enqueue_ide() {

  editor\enqueue_editor();

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
