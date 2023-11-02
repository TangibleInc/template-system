<?php

/**
 * Enqueue for Elementor
 */

use Tangible\TemplateSystem as system;

$plugin->elementor_template_editor_enqueued = false;

$plugin->enqueue_elementor_template_editor = function() use ( $plugin, $html ) {

  if ($plugin->elementor_template_editor_enqueued) return;

  $plugin->elementor_template_editor_enqueued = true;

  $js_deps = [
    'tangible-module-loader',
    'jquery',
    'wp-element'
  ];

  if (system\get_settings('codemirror_6')) {

    $plugin->enqueue_template_editor_bridge();
    $js_deps []= 'tangible-template-editor-bridge';

  } else {

    $html->enqueue_codemirror(); // See Template module /modules/codemirror
    $js_deps []= 'tangible-codemirror';

    wp_enqueue_style( 'tangible-codemirror' );
  }

  // Module loader - Support loading scripts and styles when page builders fetch and insert HTML
  $html->enqueue_module_loader();
  $html->enqueue_module_loader_data();

  wp_enqueue_script(
    'tangible-elementor-template-editor',
    $plugin->url . 'assets/build/elementor-template-editor.min.js',
    $js_deps,
    $plugin->version
  );

  wp_enqueue_style(
    'tangible-elementor-template-editor',
    $plugin->url . 'assets/build/elementor-template-editor.min.css',
    [],
    $plugin->version
  );

  /**
   * Action hook for Tangible Blocks
   * @see tangible-blocks/includes/integrations/elementor/enqueue.php
   */
  do_action('tangible_enqueue_elementor_template_editor');

};
