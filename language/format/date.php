<?php

/**
 * Format date
 */
$html->format_date = function( $content, $options = [] ) use ( $html ) {

  $create_date = $html->date;

  if ( is_string( $options ) ) {
    $options = [
      'format' => $options,
    ];
  }

  if ( $content === 'start_of_day' ) {
    $content = $html->format_date( 'now', 'Y-m-d' ) . ' 00:00:00';
  } elseif ( $content === 'end_of_day' ) {
    $content = $html->format_date( 'now', 'Y-m-d' ) . ' 23:59:59';
  } elseif ( isset( $options['from_format'] ) ) {
    /**
     * Convert from format
     *
     * @see https://www.codegrepper.com/code-examples/php/carbon+date+format+y-m-d
     *
     * Field value is expected to be timestamp, "Y-m-d", or "Y-m-d H:i:s". Otherwise,
     * it needs to be converted to a standard format.
     */
    try {
      $content = $create_date()
        ->createFromFormat( $options['from_format'], $content )
        ->format( 'Y-m-d H:i:s' );
    } catch ( \Throwable $th ) {
      return $content; // $th->getMessage();
    }
  }

  // Format

  $format = isset( $options['format'] )
    ? $options['format']
    : ( isset( $options['date'] )
      ? $options['date']
      : ''
    );

  if ( empty( $format ) || $format === 'default' ) {

    // Default date format from WP settings
    $format = get_option( 'date_format' );

  } elseif ( $format === 'timestamp' ) {
    $format = 'U';
  }

  // Locale

  if ( isset( $options['locale'] ) ) {

    $previous_locale = $create_date->getLocale();

    if ( $previous_locale !== $options['locale'] ) {
      $create_date->setLocale(
        $options['locale']
      );
    } else {
      // No need to restore if unchanged
      $previous_locale = '';
    }
  }

  // Timezone - Ensure default and convert later as needed

  if ( isset( $options['timezone'] ) ) {
    $previous_timezone = $create_date->getCurrentTimezone();
    $create_date->setCurrentTimezone(
      $create_date->getDefaultTimezone()
    );
  }

  try {

    if ( is_numeric( $content ) ) {
      $date = $create_date->fromTimestamp( $content );
    } elseif ( is_string( $content ) ) {
      $date = $create_date( $content );
    } else {
      // Unknown format
      $date = $create_date( $content );
    }

    if ( isset( $options['add'] ) ) {
      $date = $date->add( $options['add'] );
    }

    if ( isset( $options['subtract'] ) ) {
      $date = $date->sub( $options['subtract'] );
    }

    if ( isset( $options['timezone'] ) ) {
      $date = $date->tz( $options['timezone'] );
    }

    if ( $format === 'ago' ) {

      $result = $date->ago();

    } elseif ( $format === 'duration' ) {

    $result = $create_date->now()->timespan(
        $date
      );

    } else {
      $result = $date->format( $format );
    }
  } catch ( \Exception $th ) {
    $result = '';
  }

  // Restore locale
  if ( ! empty( $previous_locale ) ) {
    $create_date->setLocale( $previous_locale );
  }

  if ( ! empty( $previous_timezone ) ) {
    $create_date->setCurrentTimezone( $previous_timezone );
  }

  return $result;
};
