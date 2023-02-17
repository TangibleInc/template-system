<?php

/**
 * Common utility functions for rendering template and dynamic blocks
 *
 * Used in:
 * @see ./blocks.php
 * @see tangible-blocks/includes/integrations/gutenberg/render.php
 */

/**
 * Check if we're rendering inside Gutenberg editor, as opposed to site frontend
 */
$plugin->is_inside_gutenberg_editor = function() {
  return defined( 'REST_REQUEST' ) && REST_REQUEST
    && ! empty( $_REQUEST['context'] ) && 'edit' === $_REQUEST['context'];
};

/**
 * Disable links inside Gutenberg editor preview
 * 
 * @see /vendor/tangible/template/tags/link.php
 */
$plugin->start_disable_links_inside_gutenberg_editor = function() use ( $plugin, $html ) {
  if ( $plugin->is_inside_gutenberg_editor() ) {
    $html->disable_link_tag = true;
  }
};

$plugin->stop_disable_links_inside_gutenberg_editor = function() use ( $plugin, $html ) {
  $html->disable_link_tag = false;
};

/**
 * Prepare before block render
 */
$plugin->before_gutenberg_block_render = function($attributes) use ($plugin, $loop) {

  /**
   * Disable links inside Gutenberg editor preview
   * @see ./disable-links.php
   */
  $plugin->start_disable_links_inside_gutenberg_editor();

  /**
   * Ensure default loop context is set to current post
   * @see /loop/context/index.php
   */
  if (!empty($attributes['current_post_id'])) {
    // Post ID passed from ./enqueue.php
    $post = get_post( $attributes['current_post_id'] );
    $loop->push_current_post_context($post);
  } else {
    $loop->push_current_post_context();
  }
};

/**
 * Clean up after block render
 */
$plugin->after_gutenberg_block_render = function() use ($plugin, $loop) {
  $loop->pop_current_post_context();
  $plugin->stop_disable_links_inside_gutenberg_editor();
};

/**
 * Workaround to protect block HTML from Gutenberg
 * 
 * Gutenberg applies content filters such as `wptexturize` and `do_shortcode`
 * to the entire page after all blocks have been rendered, which can corrupt
 * valid HTML and JSON. The dummy shortcode [twrap] prevents `do_shortcode`
 * from processing its inner content.
 * 
 * This workaround can be removed if/when Gutenberg provides an option for
 * register_block_type() to opt-out of these content filters.
 * 
 * @see https://github.com/WordPress/gutenberg/issues/37754#issuecomment-1433931297
 * @see https://bitbucket.org/tangibleinc/template-system/issues/2/pagination-breaks-when-a-shortcode-is-in#comment-64843262
 */
$plugin->wrap_gutenberg_block_html = function($content) {
  return '[twrap]'.$content.'[/twrap]';
};

add_shortcode('twrap', function($atts, $content) {
  return $content;
});

add_filter('no_texturize_shortcodes', function($shortcodes) {
  $shortcodes[] = 'twrap';
  return $shortcodes;
});
