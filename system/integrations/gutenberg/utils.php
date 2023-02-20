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
 * Keep track if we're rendering our Template block, or dynamic blocks created
 * by Tangible Blocks. Using a stack (array of states) to support possibly
 * nested block renders.
 */
$plugin->current_gutenberg_block_render_state = [
  'is_inside_render' => false
];
$plugin->gutenberg_block_render_states = [
  $plugin->current_gutenberg_block_render_state
];

$plugin->is_inside_gutenberg_block_render = function() use ($plugin) {
  return !empty(
    $plugin->current_gutenberg_block_render_state['is_inside_render']
  );
};

/**
 * Prepare before block render
 */
$plugin->before_gutenberg_block_render = function($attributes) use ($plugin, $loop) {

  // Current state
  $plugin->current_gutenberg_block_render_state = [
    'is_inside_render' => true
  ];
  array_push(
    $plugin->gutenberg_block_render_states,
    $plugin->current_gutenberg_block_render_state
  );

  /**
   * Disable links inside Gutenberg editor preview
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

  // Restore previous state to support nested block renders
  array_pop( $plugin->gutenberg_block_render_states );
  $plugin->current_gutenberg_block_render_state = end(
    $plugin->gutenberg_block_render_states
  );

  $loop->pop_current_post_context();

  $plugin->stop_disable_links_inside_gutenberg_editor();
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
  // Set to false after we're outside of all (possibly nested) block renders
  if ( ! $plugin->is_inside_gutenberg_block_render() ) {
    $html->disable_link_tag = false;
  }
};


/**
 * Workaround to protect block HTML from Gutenberg
 * 
 * Gutenberg applies content filters such as wptexturize and do_shortcode
 * to the entire page after all blocks have been rendered, which can corrupt
 * valid HTML and JSON. The dummy shortcode [twrap] prevents do_shortcode
 * from processing its inner content.
 * 
 * This workaround can be removed if/when Gutenberg provides an option for
 * register_block_type() to opt-out of these content filters.
 * 
 * @see https://github.com/WordPress/gutenberg/issues/37754#issuecomment-1433931297
 * @see https://bitbucket.org/tangibleinc/template-system/issues/2/pagination-breaks-when-a-shortcode-is-in#comment-64843262
 */
$plugin->wrap_gutenberg_block_html = function($content) use ($plugin) {
  /**
   * Only wrap once, when we're outside of all (possibly nested) block renders,
   * AND we're inside do_blocks() as a content filter before do_shortcode().
   */
  if ( ! $plugin->is_inside_gutenberg_block_render()
    && $plugin->is_doing_content_filter_before_do_shortcode()
  ) {
    return '[twrap]'.$content.'[/twrap]';
  }

  return $content;
};

add_shortcode('twrap', function($atts, $content) {
  return $content;
});

add_filter('no_texturize_shortcodes', function($shortcodes) {
  $shortcodes[] = 'twrap';
  return $shortcodes;
});

/**
 * Detect if we're inside do_blocks as a content filter before do_shortcode
 * 
 * Used to determine if the Gutenberg workaround above is necessary.
 * 
 * @see wp-includes/default-filters.php
 */
$plugin->is_doing_content_filter_before_do_shortcode = function () {

  $is_doing_content_filter = doing_filter('the_content')
    || doing_filter('widget_block_content')
  ;

  if (!$is_doing_content_filter) return false;

  /**
   * Find current priority
   * @see https://developer.wordpress.org/reference/classes/wp_hook/current_priority/
   */

  global $wp_filter, $wp_current_filter;

  // Get last element of array, without changing its pointer like end() does
  $action = array_pop(array_slice( $wp_current_filter, -1 ));

  $priority = isset($wp_filter[ $action ])
    ? $wp_filter[ $action ]->current_priority()
    : 0
  ;

  // do_blocks at 9, do_shortcode at 11
  return $priority < 11;
};
