<?php

/**
 * Support template tags in post and widget content. The HTML is rendered, then shortcodes.
 * See loop/integrations for filters specific to page builders
 */

$html->content_filter = function($content) use ($html) {
  return $html->render( $content );
};

/**
 * Filter Post content
 *
 * After wpautop (10), before do_shortcode (11)
 * @see wp-includes/default-filters.php
 */
// add_filter('the_content', $html->content_filter, 10, 1);

/**
 * Filter: Widget content
 *
 * @see wp-includes/widgets/class-wp-widget-text.php, widget()
 * @see https://make.wordpress.org/core/2017/10/24/widget-improvements-in-wordpress-4-9/
 */
// add_filter('widget_text_content', $html->content_filter, 10, 1); // Before do_shortcode (11)
