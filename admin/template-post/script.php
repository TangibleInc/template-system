<?php

// Script

$plugin->template_script_enqueued = [
  // id => boolean
];

$plugin->enqueue_template_script = function(
  $post,
  $control_values = false,
  $js_variables = []
) use ( $plugin, $html ) {

  $is_post = true;

  if (is_array($post)) {

    $is_post = false;

  } else {

    $post = $post instanceof WP_Post ? $post : get_post( $post );
    if (empty( $post )) return;
    $id = $post->ID;
  
    // Already enqueued
    if ( isset( $plugin->template_script_enqueued[ $id ] )
      && $plugin->template_script_enqueued[ $id ]
    ) return;  
  }

  if ( $is_post && $post->post_type !== 'tangible_block' ) {
    $plugin->template_script_enqueued[ $id ] = true;
  }

  if ($is_post) {
    $script = get_post_meta( $id, 'script', true );
    $script = apply_filters( 'tangible_template_post_script', $script, $post );
  } else {
    $script = $post['script'] ?? '';
  }

  if (empty( $script )) return;

  // Pass JS variables
  $vars = '';
  if ( ! empty( $js_variables ) ) {
    foreach ( $js_variables as $key => $value ) {
      $vars .= "var $key = " . $value . ";\n";
    }
  }

  /**
   * Using a pattern called [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). It creates an anonymous
   * function for locally scoped variables to avoid affecting the global
   * namespace (window).
   */
  $script = ";(function(){\n"
    . $vars
    . $script
  . "\n})()";

  /**
   * Scripts are consolidated and placed in document foot.
   */
  $html->enqueue_inline_script( $script );
};
