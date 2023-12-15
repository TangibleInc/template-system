<?php

$html->style_types = [
  // type => function( $atts, $content )
];

$html->register_style_type = function( $type, $callback ) use ( $html ) {
  $html->style_types[ $type ] = $callback;
};

$html->style_tag = function( $atts, $content ) use ( $html ) {

  if ( isset( $atts['type'] ) && isset( $html->style_types[ $atts['type'] ] ) ) {
    // Support <style type=sass>
    $content = $html->style_types[ $atts['type'] ]( $content, $atts );
  }

  if (empty( trim( $content ) )) return;

  // Consolidate inline styles
  $html->enqueue_inline_style( $content );
};

return $html->style_tag;
