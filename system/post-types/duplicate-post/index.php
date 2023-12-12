<?php

/**
 * Add "Duplicate" action to single post edit screen and archive screen
 *
 * The action link is shown as "Copy to new draft" to clarify its behavior.
 *
 * NOTE: There are a number of other plugins that provide the same feature,
 * so we should detect as many as possible to avoid duplicate functionality.
 */

$plugin->post_types_with_duplicate_action = [];

$plugin->register_post_type_with_duplicate_action = function( $post_type ) use ($plugin) {

  $avoid_duplicate_action =
    // https://wordpress.org/plugins/duplicate-page/
    class_exists('duplicate_page')
  ;

  if ( $avoid_duplicate_action ) return false;

  $plugin->post_types_with_duplicate_action []= $post_type;

  return true;
};

$plugin->duplicate_post_action_name = 'tangible_template_duplicate_post_action';
$plugin->duplicate_post_action_nonce_prefix = 'tangible_template_duplicate_post__';

require_once __DIR__.'/link.php';
require_once __DIR__.'/action.php';
