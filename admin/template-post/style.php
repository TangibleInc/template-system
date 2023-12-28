<?php

// Style

$plugin->template_style_enqueued = [
  // id => boolean
];

$plugin->enqueue_template_style = function(
  $post,
  $sass_variables = []
) use ( $plugin, $html ) {

  $is_post = true;

  if (is_array($post)) {

    $is_post = false;

  } else {
    $post = $post instanceof WP_Post ? $post : get_post( $post );
    if (empty( $post )) return;
    $id = $post->ID;

    // Already enqueued
    if ( isset( $plugin->template_style_enqueued[ $id ] )
      && $plugin->template_style_enqueued[ $id ]
    ) return;
  }

  if ( $is_post && $post->post_type !== 'tangible_block' && empty( $sass_variables ) ) {

    $plugin->template_style_enqueued[ $id ] = true;

    /**
     * Check precompiled CSS - See ./save.php
     */
    $css = get_metadata_raw( 'post', $id, 'style_compiled', true );

  } else $css = null;

  if ( is_null( $css ) || $css === false ) {

    if ($is_post) {
      $style = get_post_meta( $id, 'style', true );
      $style = apply_filters( 'tangible_template_post_style', $style, $post );
    } else {
      $style = $post['style'] ?? '';
    }

    if ( ! empty( $style ) ) {
      $css = $html->sass($style, [
        'variables' => $sass_variables, // Pass Sass variables
        'source'    => $is_post ? $post : null, // Extra info for any error message
      ]);
    }
  }

  if (empty( $css )) return;

  /**
   * When using Tangible Views theme, styles are consolidated and placed
   * in document head. For other themes, they're inserted just before the template.
   */
  $html->enqueue_inline_style( $css );
};

