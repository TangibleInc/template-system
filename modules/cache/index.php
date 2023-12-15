<?php
/**
 * Cache tag stores rendered template in transient
 *
 * @see https://developer.wordpress.org/apis/handbook/transients/
 * @see https://developer.wordpress.org/reference/classes/wp_object_cache/#persistent-caching
 */
$html->cache_tag = function( $atts, $nodes ) use ( $html ) {

  $prefix = 'tangible_cache_tag__';

  if ( isset( $atts['clear'] ) ) {
    // Manually clear cache
    $name = $atts['clear'];
    delete_transient( $prefix . $name );
    return;
  }

  $name           = isset( $atts['name'] ) ? $atts['name'] : '';
  $transient_name = $prefix . $name;

  $expire = isset( $atts['expire'] )
    ? $atts['expire']
    : '1 day';

  $expire         = explode( ' ', $expire );
  $expire_seconds = (int) $expire[0];

  if ( count( $expire ) > 1 ) {
    // Apply unit
    switch ( $expire[1] ) {
      case 'minute':
      case 'minutes':
            $expire_seconds *= 60;
          break;
      case 'hours':
      case 'hour':
            $expire_seconds *= 60 * 60;
          break;
      case 'days':
      case 'day':
            $expire_seconds *= 60 * 60 * 24;
          break;
      case 'months':
      case 'month':
            $expire_seconds *= 60 * 60 * 24 * 30;
          break;
      case 'years':
      case 'year':
            $expire_seconds *= 60 * 60 * 24 * 30 * 365;
          break;
    }
  }

  if (empty( $name ) || $expire_seconds < 1) return $html->render( $nodes );

  $value = get_transient( $transient_name );

  if ( $value === false ) {

    $value = $html->render( $nodes );
    set_transient( $transient_name, $value, $expire_seconds );

    if ( isset( $atts['debug'] ) ) {
      $value = '<!-- To cache ' . $name . ' for ' . $expire_seconds . ' seconds -->' . $value;
    }
  } elseif ( isset( $atts['debug'] ) ) {
    $value = '<!-- From cache ' . $name . ' -->' . $value;
  }

  return $value;
};

