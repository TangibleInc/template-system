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

  wp_enqueue_style(
    'tangible-gutenberg-template-editor',
    $plugin->url . 'assets/build/gutenberg-template-editor.min.css',
    [ 'wp-edit-blocks', 'tangible-codemirror' ],
    $plugin->version
  );

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
      'tangible-codemirror',
  'jquery',
  'wp-components',
  'wp-editor',
  'tangible-ajax',
    ],
    $plugin->version
  );

  $config = [
    'templateOptions' => $plugin->get_all_template_options(),
    'canEditTemplate' => current_user_can( 'manage_options' ),
  ];

  wp_add_inline_script(
    'tangible-gutenberg-template-editor',
    'window.Tangible = window.Tangible || {}; window.Tangible.gutenbergConfig = ' . json_encode( $config ),
    'before'
  );

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
