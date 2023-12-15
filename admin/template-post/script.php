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

  $post = $post instanceof WP_Post ? $post : get_post( $post );

  if (empty( $post )) return;

  $id = $post->ID;

  // Already enqueued
  if ( isset( $plugin->template_script_enqueued[ $id ] )
    && $plugin->template_script_enqueued[ $id ]
  ) return;

  if ( $post->post_type !== 'tangible_block' ) {
    $plugin->template_script_enqueued[ $id ] = true;
  }

  $script = get_post_meta( $id, 'script', true );
  $script = apply_filters( 'tangible_template_post_script', $script, $post );

  if (empty( $script )) return;

  /**
   * Pass JS variables
   * 
   * Using a pattern called [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). It creates an anonymous
   * function for locally scoped variables, to avoid affecting the global
   * namespace (window).
   */
  if ( ! empty( $js_variables ) ) {
    $vars = '';
    foreach ( $js_variables as $key => $value ) {
      $vars .= "var $key = " . $value . ";\n";
    }
    $script = ";(function(){\n"
      . $vars
      . $script
    . "\n})()";
  }

  /**
   * Scripts are consolidated and placed in document foot.
   */
  $html->enqueue_inline_script( $script );
};
