<?php
use tangible\see;

$html->shortcode_tag = function( $atts, $nodes ) use ( $html ) {

  global $shortcode_tags;

  $tag = isset( $atts['keys'][0] )
    ? array_shift( $atts['keys'] )
    : ( isset( $atts['tag'] )
      ? $atts['tag']
      : ''
    );

  // By default, render dynamic tags before shortcodes
  $render_before = ! isset( $atts['render'] ) || $atts['render'] === 'before';
  $render_after  = ! $render_before;

  if ( $render_before ) {
    $content = $html->render( $nodes );
  } else {
    $content = is_string( $nodes ) ? $nodes : '';
  }

  // Inner content

  if ( empty( $tag ) ) {

    // <Shortcode>..</Shortcode>

    $content = function_exists( 'do_ccs_shortcode' )
      ? do_ccs_shortcode( $content )
      : do_shortcode( $content );

  } elseif ( $tag === 'debug' ) {

    if (empty( $atts['keys'] )) unset( $atts['keys'] );
    ob_start();
    tangible\see( 'Shortcode tag attributes', $atts );
    return ob_get_clean();

  } else {

    // <Shortcode name />

    if ( ! isset( $shortcode_tags[ $tag ] )) return;

    $callback = $shortcode_tags[ $tag ];

    /**
     * Shortcode tag is registered as a raw tag, so attribute values need to be manually rendered.
     */
    $atts = $html->render_attributes_to_array( $atts );

    // Convert attributes without value
    $shortcode_atts = array_merge( $atts['keys'], $atts );
    unset( $shortcode_atts['keys'] );

    $content = $callback( $shortcode_atts, $content );
  }

  if ( $render_after ) {
    $content = $html->render( $content );
  }

  return $content;
};

return $html->shortcode_tag;
