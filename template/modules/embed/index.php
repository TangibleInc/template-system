<?php
/**
 * Embed - oEmbed
 */

$html->add_open_tag('Embed', function( $atts, $nodes ) use ( $html, $interface ) {

  $content = $html->format_embed(
    $html->render( $nodes )
  );

  if ( isset( $atts['ratio'] ) ) {

    $atts['responsive'] = $atts['ratio'];
    unset( $atts['ratio'] );

  } elseif ( ! isset( $atts['responsive'] ) || array_search( 'responsive', $atts['keys'] ) !== false ) {

    $atts['responsive'] = strpos( $content, '<iframe ' ) !== false
      ? 'dynamic'
      : 'false';
  }

  if ($atts['responsive'] === 'false') return $content;

  unset( $atts['keys'] );

  $is_dynamic = false;

  $interface->enqueue( 'embed' );

  $ratio = $atts['responsive'];
  unset( $atts['responsive'] );

  if ( $ratio === 'dynamic' ) {

    // JS required for dynamic ratio
    $interface->enqueue( 'embed-dynamic' );

    $is_dynamic = true;

  } elseif ( $ratio !== 'default' ) {

    // Ratio given as width:height, such as 16:9
    $parts = explode( ':', $ratio );

    if ( count( $parts ) === 2 ) {

      $width  = $parts[0];
      $height = $parts[1];

      $ratio = $height / $width * 100;

    } else {
      // Assume percentage given
    }

    $atts['style'] =
      ( isset( $atts['style'] ) ? ( $atts['style'] . ';' ) : '' )
      . 'padding-top:' . $ratio . '%;';
  }

  return $html->render_tag('div', array_merge($atts, [
    'class' => ( $is_dynamic
        ? 'tangible-embed-dynamic tangible-dynamic-module' // Dynamic aspect ratio requires JS
        : 'tangible-embed'         // CSS-only solution
      )
      . ( isset( $atts['class'] ) ? ' ' . $atts['class'] : '' )
    ,
    'data-tangible-dynamic-module' => 'embed-dynamic',
  ]), $content);
});
