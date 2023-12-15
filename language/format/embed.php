<?php

/**
 * Format oEmbed
 */
$html->format_embed = function( $content, $options = [] ) {

  $autoembed_result = '';

  if ( isset( $GLOBALS['wp_embed'] ) ) {
    $wp_embed         = $GLOBALS['wp_embed'];
    $autoembed_result = $wp_embed->autoembed( $content );
  }

  // Auto-embed success
  if ( ! empty( $autoembed_result ) && $content !== $autoembed_result ) {
    // Run [audio], [video] in embed
    $content = do_shortcode( $autoembed_result );
  } else {
    $content = apply_filters( 'embed_oembed_html', wp_oembed_get( $content ) );
  }

  return $content;
};
