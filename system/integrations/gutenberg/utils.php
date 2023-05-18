<?php

/**
 * Common utility functions for rendering template and dynamic blocks
 *
 * Used in:
 *
 * @see ./blocks.php
 * @see tangible-blocks/includes/integrations/gutenberg/render.php
 */

/**
 * Check if we're rendering inside Gutenberg editor, as opposed to site frontend
 */
$plugin->is_inside_gutenberg_editor = function() {
  return (
    // Inside REST API
    defined( 'REST_REQUEST' ) && REST_REQUEST
      && ! empty( $_REQUEST['context'] ) && 'edit' === $_REQUEST['context']
  ) || (
    // Inside edit screen
    is_admin()
      && function_exists( 'get_current_screen' ) // Defined late after admin_init
      && ! empty( $screen = get_current_screen() )
      && $screen->is_block_editor()
  );
};

/**
 * Keep track if we're rendering our Template block, or dynamic blocks created
 * by Tangible Blocks. Using a stack (array of states) to support possibly
 * nested block renders.
 */
$plugin->current_gutenberg_block_render_state = [
  'is_inside_render' => false,
];
$plugin->gutenberg_block_render_states        = [
  $plugin->current_gutenberg_block_render_state,
];

$plugin->is_inside_gutenberg_block_render = function() use ( $plugin ) {
  return ! empty(
    $plugin->current_gutenberg_block_render_state['is_inside_render']
  );
};

/**
 * Prepare before block render
 */
$plugin->before_gutenberg_block_render = function( $attributes ) use ( $plugin, $loop ) {

  // Current state
  $plugin->current_gutenberg_block_render_state = [
    'is_inside_render' => true,
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
   *
   * @see /loop/context/index.php
   */
  if ( $plugin->is_inside_gutenberg_editor() && ! empty( $attributes['current_post_id'] ) ) {
    // Post ID passed from ./enqueue.php
    $post = get_post( $attributes['current_post_id'] );
    $loop->push_current_post_context( $post );
  } else {
    $loop->push_current_post_context();
  }
};

/**
 * Clean up after block render
 */
$plugin->after_gutenberg_block_render = function() use ( $plugin, $loop ) {

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
 * "Abandon all hope, ye who enter here."
 *
 * Gutenberg applies content filters such as wptexturize and do_shortcode
 * to the entire page after all blocks have been rendered, which can corrupt
 * valid HTML and JSON.
 *
 * The shortcode [twrap] prevents do_shortcode from processing its inner
 * content. In addition, all square brackets need to be escaped and restored
 * to protect them from do_shortcodes_in_html_tags that runs on HTML attributes.
 *
 * The problem is specifically in the following files where the post content is
 * processed by do_blocks() then do_shortcode().
 *
 * - /wp-includes/default-filters.php in the filter "the_content" and
 * "widget_block_content"
 * - /wp-includes/block-template.php in get_the_block_template_html()
 *
 * This workaround can be removed if Gutenberg provides a setting for
 * register_block_type() to opt-out of these content filters.
 *
 * @see https://github.com/WordPress/gutenberg/issues/37754#issuecomment-1433931297
 * @see https://bitbucket.org/tangibleinc/template-system/issues/2/pagination-breaks-when-a-shortcode-is-in#comment-64843262
 */
$plugin->wrap_gutenberg_block_html = function( $content ) use ( $plugin ) {

  // Only wrap once, when we're outside of all (possibly nested) block renders
  if ( ! $plugin->is_inside_gutenberg_block_render()
    && $plugin->should_apply_gutenberg_workaround()
  ) {
    return '[twrap]'
      // These escape codes are from /wp-includes/shortcodes.php
      . str_replace( [ '[', ']' ], [ '&#091;', '&#093;' ], $content )
      . '[/twrap]';
  }

  return $content;
};

/**
 * In the following WP version, the call to do_shortcode was removed from
 * get_the_block_template_html().
 * 
 * @see [Editor: Remove shortcode support from block templates](https://github.com/WordPress/wordpress-develop/commit/1cbfa03510f8dfd37a8d050b2640aa7ae1fb2ce6)
 * 
 * However, this may be reverted due to the number of users who were affected:
 * https://core.trac.wordpress.org/ticket/58333#comment:59
 */
$plugin->gutenberg_block_theme_applies_do_shortcode = version_compare($GLOBALS['wp_version'], '6.2.1') < 0;

add_shortcode('twrap', function( $atts, $content ) use ( $plugin ) {
  /**
   * In a block theme, the template HTML can go through do_shortcode *twice*.
   *
   * - In template-canvas.php, the entire page is generated with
   * get_the_block_template_html(), which runs do_blocks() then do_shortcode().
   *
   * - During do_blocks(), the block "core/post-content" applies the_content
   * filter, which has do_shortcode() hooked on it.
   *
   * In this case, we must wrap the content again.
   *
   * @see /wp-includes/template-canvas.php
   * @see /wp-includes/blocks/post-content.php
   */
  if ( $plugin->gutenberg_block_theme_applies_do_shortcode
    && $plugin->is_doing_core_post_content_block
    && doing_filter( 'the_content' )
  ) {
    return '[twrap]' . $content . '[/twrap]';
  }

  return str_replace( [ '&#091;', '&#093;' ], [ '[', ']' ], $content );
});

add_filter('no_texturize_shortcodes', function( $shortcodes ) {
  $shortcodes[] = 'twrap';
  return $shortcodes;
});

/**
 * Determine if the Gutenberg workaround above is necessary
 */
$plugin->should_apply_gutenberg_workaround = function () use ($plugin) {

  /**
   * Check if inside a block theme running get_the_block_template_html().
   * There is no action to detect this situation.
   *
   * @see /wp-includes/template-canvas.php
   * @see /wp-includes/block-template.php, locate_block_template()
   */

  global $template;

  $template_canvas_path = ABSPATH . WPINC . '/template-canvas.php';

  if ( $plugin->gutenberg_block_theme_applies_do_shortcode
    && $template === $template_canvas_path && ! did_action( 'wp_head' )
  ) {
    return true;
  }

  /**
   * Check if inside a content filter running do_blocks before do_shortcode
   */

  $is_doing_content_filter = doing_filter( 'the_content' )
    || doing_filter( 'widget_block_content' );

  if ( ! $is_doing_content_filter) return false;

  /**
   * Find current priority
   *
   * @see https://developer.wordpress.org/reference/classes/wp_hook/current_priority/
   */

  global $wp_filter, $wp_current_filter;

  // Get last element of array, without changing its pointer like end() does
  $last_filter = array_slice( $wp_current_filter, -1 );
  $action      = array_pop( $last_filter );

  $priority = isset( $wp_filter[ $action ] )
    ? $wp_filter[ $action ]->current_priority()
    : 0;

  /**
   * Typically do_blocks is at 9 and do_shortcode at 11, but make sure to
   * avoid any false positives, for example, if a plugin re/moves them.
   */

  $priority_of_do_blocks    = has_filter( $action, 'do_blocks' );
  $priority_of_do_shortcode = has_filter( $action, 'do_shortcode' );

  return $priority_of_do_blocks !== false
    && $priority === $priority_of_do_blocks
    && $priority_of_do_shortcode !== false
    && $priority < $priority_of_do_shortcode;
};

/**
 * Keep track of when we're inside "core/post-content" block
 */

$plugin->is_doing_core_post_content_block = false;

// @see wp-includes/blocks.php, render_block()
add_action('render_block_data', function( $block ) use ( $plugin ) {
  if ( $block['blockName'] === 'core/post-content' ) {
    $plugin->is_doing_core_post_content_block = true;
  }
  return $block;
}, 10, 1);

// @see wp-includes/class-wp-block.php, render()
add_action('render_block_core/post-content', function( $content ) use ( $plugin ) {
  // This hook runs after the block has been rendered
  $plugin->is_doing_core_post_content_block = false;
  return $content;
}, 10, 1);
