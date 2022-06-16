<?php

/**
 * Enqueue for Beaver Builder
 */

$plugin->beaver_template_editor_enqueued = false;

$plugin->enqueue_beaver_template_editor = function() use ($plugin, $html) {

  if ($plugin->beaver_template_editor_enqueued
    || ! FLBuilderModel::is_builder_active()
  ) return;

  $plugin->beaver_template_editor_enqueued = true;

  $html->enqueue_codemirror();

  wp_enqueue_style(
    'tangible-beaver-template-editor',
    $plugin->url . 'assets/build/beaver-template-editor.min.css',
    [],
    $plugin->version
  );
/*
  wp_enqueue_script(
    'tangible-beaver-template-editor',
    $plugin->url . 'assets/build/beaver-template-editor.min.js',
    ['jquery', 'wp-element', 'tangible-ajax', 'tangible-select'],
    $plugin->version
  );
*/

  /**
   * Module loader - Support loading scripts and styles when page builders fetch and insert HTML
   */

  $html->enqueue_dynamic_module_loader();
};

add_action('wp_enqueue_scripts', function() use ($plugin) {
  $plugin->enqueue_beaver_template_editor();
}, 10);
