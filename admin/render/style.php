<?php

// Style

$plugin->template_style_enqueued = [
  // id => boolean
];

$plugin->enqueue_template_style = function(
  $post,
  $control_values = false,
  $sass_variables = []
) use ( $plugin, $html ) {

  $post = $post instanceof WP_Post ? $post : get_post( $post );

  if (empty( $post )) return;

  $id = $post->ID;

  // Already enqueued
  if ( isset( $plugin->template_style_enqueued[ $id ] )
    && $plugin->template_style_enqueued[ $id ]
  ) return;

  if ( $post->post_type !== 'tangible_block' && empty( $sass_variables ) ) {

    $plugin->template_style_enqueued[ $id ] = true;

    /**
     * Check precompiled CSS - See ./save.php
     */
    $css = get_metadata_raw( 'post', $id, 'style_compiled', true );

  } else $css = null;

  if ( is_null( $css ) || $css === false ) {

    $style = get_post_meta( $id, 'style', true );

    if ( ! empty( $style ) ) {
      $style = ! empty( $control_values )
        ? $plugin->replace_control_values( $style, $control_values, 'style' )
        : $style;

    $css = $html->sass($style, [
        'variables' => $sass_variables, // Pass Sass variables
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
