<?php

/**
 * Integration with Beaver Builder
 */

if ( ! class_exists( 'FLBuilder' ) ) return;

require_once __DIR__.'/field-types/index.php';
require_once __DIR__.'/modules/index.php';
require_once __DIR__.'/enqueue.php';


/**
 * Disallow default loop context (global $wp_query) for Beaver template and layout,
 * as well as the current post being rendered in the page builder.
 *
 * This prevents infinite loop for Loop tag without "type" attribute.
 *
 * @see vendor/tangible/loop/context/index.php
 * @see bb-plugin/classes/class-fl-builder.php, render_content()
 */

add_filter('tangible_loop_default_context_allowed', function($allowed, $post_type, $post) {
  return $allowed
    && ! in_array($post_type, [
      'fl-builder-template',
      'fl-theme-layout'
    ])
  ;
}, 10, 3);
