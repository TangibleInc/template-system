<?php
/**
 * Enqueue for Elementor
 * @see /admin/editor
 */
use tangible\template_system;

$plugin->elementor_template_editor_enqueued = false;

$plugin->enqueue_elementor_template_editor = function() use ( $plugin, $html ) {

  if ($plugin->elementor_template_editor_enqueued) return;

  $plugin->elementor_template_editor_enqueued = true;

  $js_deps = [
    'tangible-module-loader',
    'jquery',
    'wp-element'
  ];

  // New code editor by default
  if (template_system\get_settings('codemirror_6_elementor')) {

    template_system\enqueue_codemirror_v6();
    $js_deps []= 'tangible-codemirror-v6';

  } else {

    template_system\enqueue_codemirror_v5();

    $js_deps []= 'tangible-codemirror-v5';
    wp_enqueue_style( 'tangible-codemirror-v5' );
  }

  // Module loader - Support loading scripts and styles when page builders fetch and insert HTML
  $html->enqueue_module_loader();
  $html->enqueue_module_loader_data();

  $url = template_system::$state->url . '/integrations/elementor/build';

  wp_enqueue_script(
    'tangible-elementor-template-editor',
    $url . '/elementor-template-editor.min.js',
    $js_deps,
    $plugin->version
  );

  wp_enqueue_style(
    'tangible-elementor-template-editor',
    $url . '/elementor-template-editor.min.css',
    [],
    $plugin->version
  );

  /**
   * Action hook for Tangible Blocks
   * @see tangible-blocks/includes/integrations/elementor/enqueue.php
   */
  do_action('tangible_enqueue_elementor_template_editor');

};
