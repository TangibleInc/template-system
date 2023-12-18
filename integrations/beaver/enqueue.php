<?php
/**
 * Enqueue for Beaver Builder
 * @see /system/editor
 */

use tangible\template_system;
 
$plugin->beaver_template_editor_enqueued = false;

$plugin->enqueue_beaver_template_editor = function() use ( $plugin, $html ) {

  if ($plugin->beaver_template_editor_enqueued
    || ! FLBuilderModel::is_builder_active()
  ) return;

  $plugin->beaver_template_editor_enqueued = true;
  
  if (template_system\get_settings('codemirror_6')) {
    template_system\enqueue_codemirror_v6();
  } else {
    template_system\enqueue_codemirror_v5();
  }

  $url = template_system::$state->url . '/integrations/beaver/build';
  $version = template_system::$state->version;

  wp_enqueue_style(
    'tangible-beaver-template-editor',
    $url . '/beaver-template-editor.min.css',
    [],
    $version
  );

  // Script is at ./modules/tangible-template/js/settings.js 
  
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
