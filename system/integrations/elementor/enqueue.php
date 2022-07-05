<?php

/**
 * Enqueue for Elementor
 */

$plugin->elementor_template_editor_enqueued = false;

$plugin->enqueue_elementor_template_editor = function() use ( $plugin, $html ) {

  if ($plugin->elementor_template_editor_enqueued) return;

  $plugin->elementor_template_editor_enqueued = true;

  $html->enqueue_codemirror(); // See Template module /modules/codemirror

  wp_enqueue_script(
    'tangible-elementor-template-editor',
    $plugin->url . 'assets/build/elementor-template-editor.min.js',
    [ 'tangible-codemirror', 'tangible-module-loader', 'jquery', 'wp-element', 'tangible-ajax' ],
    $plugin->version
  );

  wp_enqueue_style(
    'tangible-elementor-template-editor',
    $plugin->url . 'assets/build/elementor-template-editor.min.css',
    [],
    $plugin->version
  );

  // Module loader - Support loading scripts and styles when page builders fetch and insert HTML
  $html->enqueue_dynamic_module_loader();

  /**
   * Action hook for Tangible Blocks
   * @see tangible-blocks/includes/integrations/elementor/enqueue.php
   */
  do_action('tangible_enqueue_elementor_template_editor');

};
