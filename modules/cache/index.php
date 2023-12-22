<?php
/**
 * Cache tag stores rendered template in transient
 *
 * @see https://developer.wordpress.org/apis/handbook/transients/
 * @see https://developer.wordpress.org/reference/classes/wp_object_cache/#persistent-caching
 */
$html->cache_tag = function( $atts, $nodes ) use ( $html ) {

  $prefix = 'tangible_cache_tag__';

  $name           = isset( $atts['name'] ) ? $atts['name'] : '';
  $transient_name = $prefix . $name;

  if ( isset( $atts['clear'] ) ) {
    // Manually clear cache
    delete_transient( $transient_name );
    return $html->render_with_catch_exit( $nodes );
  }

  $expire = isset( $atts['expire'] )
    ? $atts['expire']
    : '1 minute';

  $expire         = explode( ' ', $expire );
  $expire_seconds = (int) $expire[0];

  if ( count( $expire ) > 1 ) {
    if (substr($expire[1], -1)==='s') {
      $expire[1] = substr($expire[1], 0, strlen($expire[1]) - 1);
    }
    // Apply unit
    switch ( $expire[1] ) {
      case 'minute':
        $expire_seconds *= 60;
      break;
      case 'hour':
        $expire_seconds *= 60 * 60;
      break;
      case 'day':
        $expire_seconds *= 60 * 60 * 24;
      break;
      case 'month':
        $expire_seconds *= 60 * 60 * 24 * 30;
      break;
      case 'year':
        $expire_seconds *= 60 * 60 * 24 * 30 * 365;
      break;
      default:
        // Seconds by default
    }
  }

  if (empty( $name ) || $expire_seconds < 1) return $html->render_with_catch_exit( $nodes );

  $value = get_transient( $transient_name );

  if ( $value === false ) {

    $value = $html->render_with_catch_exit( $nodes );
    set_transient( $transient_name, $value, $expire_seconds );

    if ( isset( $atts['debug'] ) ) {
      $value = '<!-- To cache ' . $name . ' for ' . $expire_seconds . ' seconds -->' . $value;
    }
  } elseif ( isset( $atts['debug'] ) ) {
    $value = '<!-- From cache ' . $name . ' -->' . $value;
  }

  return $value;
};

$html->add_open_tag('Cache', $html->cache_tag);
