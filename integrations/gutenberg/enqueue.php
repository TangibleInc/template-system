<?php
/**
 * Enqueue block assets for backend editor
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 * 
 * @see /system/editor
 */

use tangible\template_system;
 
$plugin->gutenberg_template_editor_enqueued = false;

$plugin->enqueue_gutenberg_template_editor = function() use ( $plugin, $html ) {

  if ($plugin->gutenberg_template_editor_enqueued) return;

  $plugin->gutenberg_template_editor_enqueued = true;

  /**
   * Restrict editor to admins who are allowed to edit templates
   * @see /admin/capability
   */
  $can_edit = template_system\can_user_edit_template();
  if (!$can_edit) return;

  $js_deps = [
    'wp-block-editor',
    'wp-blocks',
    'wp-element',
    'wp-i18n',
    'wp-polyfill',
    'wp-server-side-render',
    'jquery',
    'wp-components',
    'wp-editor',

    'tangible-ajax',
    'tangible-module-loader',
  ];

  /**
   * Gutenberg has new editor enabled by default
   * Keeping this logic in case we need to revert to old editor
   */
  $new_editor = true; // template_system\get_settings('codemirror_6');

  if ($new_editor) {

    template_system\enqueue_codemirror_v6();
    $js_deps []= 'tangible-codemirror-v6';

  } else {

    template_system\enqueue_codemirror_v5();
    $js_deps []= 'tangible-codemirror-v5';
    wp_enqueue_style( 'tangible-codemirror-v5' );  
  }

  $url = template_system::$state->url . '/integrations/gutenberg/build';
  $version = template_system::$state->version;

  wp_enqueue_script(
    'tangible-gutenberg-template-editor',
    $url . '/gutenberg-template-editor.min.js',
    $js_deps,
    $version
  );

  /*
  wp_enqueue_style(
    'tangible-gutenberg-template-editor',
    $url . '/gutenberg-template-editor.min.css',
    [ 'wp-edit-blocks', 'tangible-codemirror' ],
    $version
  );
  */

  /**
   * Ensure the field "current_post_id" is a number, as defined in the schema
   * for register_block_type() in ./blocks.php. get_the_ID() can return false,
   * which makes Gutenberg throw an error, "Invalid parameter(s): attributes".
   */
  $id                    = get_the_ID();
  if ($id === false) $id = 0;

  $config = [
    'templateOptions' => $plugin->get_all_template_options(),
    'current_post_id' => $id,
    /**
     * Restrict editor to admins who are allowed to edit templates
     * @see /admin/capability
     */
    'canEditTemplate' => $can_edit,
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

  $url = template_system::$state->url . '/integrations/gutenberg/build';
  $version = template_system::$state->version;

  wp_enqueue_style(
    'tangible-loop-gutenberg-frontend',
    $url . '/gutenberg.frontend.min.css',
    [],
    $version
  );

  wp_enqueue_script(
    'tangible-loop-gutenberg-frontend',
    $url . '/gutenberg.frontend.min.js',
    ['jquery'],
    $version
  );
});*/
