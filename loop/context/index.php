<?php

// Loop context

$loop->contexts        = [];
$loop->last_context    = null;
$loop->current_context = null;

$loop->push_context = function( $context ) use ( $loop ) {

  $last_pos = count($loop->contexts) - 1;
  $loop->last_context = $last_pos >=0 && isset($loop->contexts[ $last_pos ])
    ? $loop->contexts[ $last_pos ]
    : null
  ;

  $loop->current_context = $loop->contexts []= &$context;

  return $context;
};

$loop->pop_context = function() use ( $loop ) {

  $loop->last_context = array_pop( $loop->contexts );

  $last_pos = count($loop->contexts) - 1;
  $loop->current_context = $last_pos >=0 && isset($loop->contexts[ $last_pos ])
    ? $loop->contexts[ $last_pos ]
    : null
  ;
};

$loop->get_context = function( $type = '' ) use ( $loop ) {

  if (!empty($type)) {

    // Climb up and get last context of this loop type

    for ($i=count($loop->contexts) - 1; $i >= 0; $i--) {
      $context = $loop->contexts[ $i ];
      if ($context && $context->get_name()===$type) {
        return $context;
      }
    }

    if ($type==='taxonomy_term') {

      $context = $loop->get_context();

      // Taxonomy term loop
      if (!empty($context) && $context->get_name()===$type) {
        return $context;
      }

      // Taxonomy archive
      if (is_category() || is_tag() || is_tax()) {
        $object = get_queried_object();
        return $loop('taxonomy_term', [
          'taxonomy' => $object->taxonomy,
          'id' => $object->term_id
        ]);
      }
    }

    // Not found
    return false;
  }

  $context = $loop->current_context;

  if ($context !== null) return $context;

  $context = $loop->get_default_context();

  /**
   * Default context can be empty if called too early, for example
   * before action 'wp'. In that case, don't cache it and try next time.
   */
  if (!empty($context->query) && !empty($context->query->query)) {
    $loop->current_context = $context;
  }

  return $context;
};

$loop->get_last_context = function() use ( $loop ) {
  $context = $loop->last_context;
  if ($context !== null) return $context;
  return $loop->last_context = $loop->get_default_context();
};


/**
 * Create default loop context from main query
 */

$loop->get_default_context = function() use ($loop) {

  global $post, $wp_the_query;

  $the_post = $post;
  $post_type = 'post';

  if (!empty($post)) {

    $post_type = $post->post_type;

  } elseif (!empty($wp_the_query) && !empty($wp_the_query->query_vars['post_type'])) {

    $post_type = $wp_the_query->query_vars['post_type'];

    if (isset( $wp_the_query->post ) && $wp_the_query->post instanceof WP_Post) {
      $the_post = $wp_the_query->post;
    }
  }

  if (is_array($post_type)) $post_type = 'post';

  $skip = empty($wp_the_query)

    /**
     * A filter to disallow current default context is needed to prevent an infinite
     * loop trying to render the current post being edited in Beaver Builder/Themer.
     *
     * @see tangible-loops-and-logic/includes/integrations/beaver/index.php
     */
    || ! apply_filters('tangible_loop_default_context_allowed', true, $post_type, $post)

    // Already inside the post content
    || (!empty($the_post) && in_array($the_post->ID, $loop->currently_inside_post_content_ids))
  ;

  if ( $skip ) return $loop('list', []); // Empty loop

  return $loop($post_type, [
    'query' => clone $wp_the_query,
  ]);
};

// Aliases

$loop->get_current = $loop->get_context;
$loop->get_previous = $loop->get_last_context;

/**
 * Current post and loop context
 * 
 * This ensures the current post is set as the loop context for templates
 * in shortcodes and page builder previews.
 * 
 * It's needed to handle situations where the loop context can be incorrectly
 * set to the builder's template or theme layout, as well as inside builder-
 * specific post loops.
 * 
 * Caller must make a corresponding call to $loop->pop_current_post_context().
 * 
 * @see /system/tag.php, template shortcode
 * @see /system/integrations/gutenberg/blocks.php
 * @see /system/integrations/beaver/modules/tangible-template/includes/frontend.php
 * @see /system/integrations/elementor/template-editor-widget.php, template-dynamic-tag.php
 */
$loop->push_current_post_context = function($given_post = false) use ($loop) {

  global $post, $wp_query;

  if ($given_post===false) {
    $given_post = &$post;
  }

  // No current post
  if (empty($given_post)) {
    $loop->push_context( $loop('list', []) ); // Empty loop
    return;
  }

  $loop->push_context(
    $loop('post', [
      'id' => $given_post->ID,
      'post_type' => $given_post->post_type,
      'status' => 'all' // Support post status other than publish
    ])
  );
};

$loop->pop_current_post_context = function() use ($loop) {
  $loop->pop_context();
};

