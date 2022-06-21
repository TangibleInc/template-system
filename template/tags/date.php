<?php

/**
 * Date tag
 *
 * See ../format/date.php
 */
$html->date_tag = function( $atts, $nodes ) use ( $html ) {

  /**
   * Attribute "all_locale" will get/set locale for all subsequent Date tags
   */

  if ( isset( $atts['all_locale'] ) ) {
    $html->date->setLocale( $atts['all_locale'] );
    return;

  }

  if ( isset( $atts['keys'] ) ) {

    if ( in_array( 'all_locale', $atts['keys'] ) ) {

      // <Date all_locale /> returns current locale

      return $html->date->getLocale();
    }

    if ( ( $pos = array_search( 'timestamp', $atts['keys'] ) ) !== false ) {

      // <Date timestamp>..</Date>

      $atts['keys']   = array_splice( $atts['keys'], $pos, 1 );
      $atts['format'] = 'timestamp';
    }
  }

  if ( isset( $atts['timestamp'] ) ) {

    // <Date timestamp=value />

    $atts['format'] = 'timestamp';
    $content        = $atts['timestamp'];

    if ( ! empty( $nodes ) ) {

      // <Date timestamp=value>..</Date>

      // If tag content exists, get start/end of day from that date; otherwise fall-through to now

      if ( $content === 'start_of_day' ) {
        $content = $html->format_date( $html->render( $nodes ), 'Y-m-d' ) . ' 00:00:00';
      } elseif ( $content === 'end_of_day' ) {
        $content = $html->format_date( $html->render( $nodes ), 'Y-m-d' ) . ' 23:59:59';
      }
    }

    return $html->format( 'date', $content, $atts );
  }

  return $html->format( 'date', $html->render( $nodes ), $atts );
};

return $html->date_tag;
