<?php
/**
 * Embed - oEmbed
 */
namespace tangible\template_system\embed;
use tangible\template_system;

function register() {
  $url = template_system::$state->url . '/modules/embed';
  $version = template_system::$state->version;
  
  wp_register_script(
    'tangible-embed-dynamic',
    "{$url}/build/embed.min.js",
    [ 'jquery' ],
    $version,
    true
  );  

  wp_register_style(
    'tangible-embed',
    "{$url}/build/embed.min.css",
    [],
    $version,
  );  
}

function enqueue() {
  // wp_enqueue_script('tangible-embed-dynamic');
  wp_enqueue_style('tangible-embed');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );


$html->add_open_tag('Embed', function( $atts, $nodes ) use ( $html ) {

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

  wp_enqueue_style('tangible-embed');

  $ratio = $atts['responsive'];
  unset( $atts['responsive'] );

  if ( $ratio === 'dynamic' ) {

    // JS required for dynamic ratio
    wp_enqueue_script('tangible-embed-dynamic');

    $is_dynamic = true;

  } elseif ( $ratio !== 'default' ) {

    // Ratio given as width:height, such as 16:9
    $parts = explode( ':', $ratio );

    if ( count( $parts ) === 2 ) {

      $width  = $parts[0];
      $height = $parts[1];

      $ratio = "$width / $height";

    } else {
      $ratio = "100 / $ratio";
    }

    $atts['style'] =
      ( isset( $atts['style'] ) ? ( $atts['style'] . ';' ) : '' )
      . 'aspect-ratio:' . $ratio;
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
