<?php

/**
 * Enqueue block assets for backend editor
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 */

$plugin->gutenberg_template_editor_enqueued = false;

$plugin->enqueue_gutenberg_template_editor = function() use ( $plugin, $html ) {

  if ($plugin->gutenberg_template_editor_enqueued) return;

  $plugin->gutenberg_template_editor_enqueued = true;

  $html->enqueue_codemirror();

  /*
  wp_enqueue_style(
    'tangible-gutenberg-template-editor',
    $plugin->url . 'assets/build/gutenberg-template-editor.min.css',
    [ 'wp-edit-blocks', 'tangible-codemirror' ],
    $plugin->version
  );
  */

  wp_enqueue_style( 'tangible-codemirror' );

  wp_enqueue_script(
    'tangible-gutenberg-template-editor',
    $plugin->url . 'assets/build/gutenberg-template-editor.min.js',
    [
      'wp-block-editor',
      'wp-blocks',
      'wp-element',
      'wp-i18n',
      'wp-polyfill',
      'wp-server-side-render',
      'jquery',
      'wp-components',
      'wp-editor',
      'lodash',
      'tangible-codemirror',
      'tangible-ajax',
      'tangible-module-loader',
    ],
    $plugin->version
  );

  /**
   * Ensure the field "current_post_id" is a number, as defined in the schema
   * for register_block_type() in ./blocks.php. get_the_ID() can return false,
   * which makes Gutenberg throw an error, "Invalid parameter(s): attributes".
   */
  $id                    = get_the_ID();
  if ($id === false) $id = 0;

  $config = [
    'templateOptions' => $plugin->get_all_template_options(),
    'canEditTemplate' => current_user_can( 'manage_options' ),
    'current_post_id' => $id,
  ];

  wp_add_inline_script(
    'tangible-gutenberg-template-editor',
    'window.Tangible = window.Tangible || {}; window.Tangible.gutenbergConfig = ' . json_encode( $config ),
    'before'
  );

  /**
   * Action hook for Tangible Blocks
   *
   * @see tangible-blocks/includes/integrations/gutenberg/enqueue.php
   */
  do_action( 'tangible_enqueue_gutenberg_template_editor' );

};


add_action('enqueue_block_editor_assets', function() use ( $plugin ) {
  $plugin->enqueue_gutenberg_template_editor();
});


/**
 * Enqueue block assets for frontend (also loaded in backend editor)
 */

/*
add_action('enqueue_block_assets', function() use ($plugin) {

  wp_enqueue_style(
    'tangible-loop-gutenberg-frontend',
    $plugin->url . 'assets/build/gutenberg.frontend.min.css',
    [],
    $plugin->version
  );

  wp_enqueue_script(
    'tangible-loop-gutenberg-frontend',
    $plugin->url . 'assets/build/gutenberg.frontend.min.js',
    ['jquery'],
    $plugin->version
  );
});*/
