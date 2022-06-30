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

  $id = $post instanceof WP_Post ? $post->ID : $post;

  // Already enqueued
  if ( isset( $plugin->template_script_enqueued[ $id ] )
    && $plugin->template_script_enqueued[ $id ]
  ) return;

  $plugin->template_script_enqueued[ $id ] = true;

  $script = get_post_meta( $id, 'script', true );

  if (empty( $script )) return;

  if ( ! empty( $control_values ) ) {
    $script = $plugin->replace_control_values( $script, $control_values, 'script' );
  }

  /**
   * Pass JS variables - Wrap in function closure for local scope
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
