<?php
/**
 * Enqueue for Beaver Builder
 */

use Tangible\TemplateSystem as system;

$plugin->beaver_template_editor_enqueued = false;

$plugin->enqueue_beaver_template_editor = function() use ( $plugin, $html ) {

  if ($plugin->beaver_template_editor_enqueued
    || ! FLBuilderModel::is_builder_active()
  ) return;

  $plugin->beaver_template_editor_enqueued = true;

  if (system\get_settings('codemirror_6')) {

    $plugin->enqueue_template_editor_bridge();

  } else {
    $html->enqueue_codemirror();
  }

  wp_enqueue_style(
    'tangible-beaver-template-editor',
    $plugin->url . 'assets/build/beaver-template-editor.min.css',
    [],
    $plugin->version
  );

  // Script is at ./tangible-template/js/settings.js 
  
  /**
   * Module loader - Support loading scripts and styles when page builders fetch and insert HTML
   */

  $html->enqueue_module_loader();

  /**
   * Action hook for Tangible Blocks
   * @see tangible-blocks/includes/integrations/beaver/enqueue.php
   */
  do_action('tangible_enqueue_beaver_template_editor');

};

add_action('wp_enqueue_scripts', function() use ( $plugin ) {
  $plugin->enqueue_beaver_template_editor();
}, 10);
