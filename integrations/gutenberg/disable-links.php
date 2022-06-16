<?php

/**
 * Disable links inside Gutenberg editor preview
 *
 * Used in:
 * @see ./blocks.php, dynamic/utils.php
 *
 * Link tag:
 * @see /vendor/tangible/template/tags/link.php
 */
$plugin->start_disable_links_inside_gutenberg_editor = function() use ($plugin, $html) {
  if ($plugin->is_inside_gutenberg_editor()) {
    $html->disable_link_tag = true;
  }
};

$plugin->stop_disable_links_inside_gutenberg_editor = function() use ($plugin, $html) {
  $html->disable_link_tag = false;
};

/**
 * Check if we're rendering inside Gutenberg editor, as opposed to site frontend
 */
$plugin->is_inside_gutenberg_editor = function() {
  return defined( 'REST_REQUEST' ) && REST_REQUEST
    && ! empty( $_REQUEST['context'] ) && 'edit' === $_REQUEST['context']
  ;
};
