<?php

namespace Tangible\Loop;

/**
 * Loop over calendar weekdays
 */
class CalendarWeekDayLoop extends BaseLoop {

  static $date;

  static $config = [
    'name'  => 'calendar_weekday',
    'title' => 'Calendar week day',
  ];

  function get_items_from_query( $args ) {
    // Catch error thrown by Carbon date library if invalid date string is given
    try {
      return $this->_get_items_from_query( $args );
    } catch ( \Throwable $th ) {
      return [];
    }
  }

  function _get_items_from_query( $args ) {

    $items = [];

    $now = self::$date->now();

    $week = $now->setISODate(
      $now->format( 'Y' ),
      $now->format( 'W' )
    );

    $from = $week->startOfWeek()->format( 'Y-m-d' );
    $to   = $week->endOfWeek()->format( 'Y-m-d' );

    // Catch if Date library throws error
    try {

    if ( isset( $args['start'] ) ) {

      // Option to start week from different day than Monday

      $start = $args['start'];

      if ( $start === 'sun' || $start === 'sunday' ) {
        $from = self::$date->parse( $from )->sub( '1 day' )->format( 'Y-m-d' );
        $to   = self::$date->parse( $to )->sub( '1 day' )->format( 'Y-m-d' );
      }
    }

    // Create period of days

    $period = self::$date->parse( $from )->range( $to );

    foreach ( $period as $day ) {
      $items [] = $day;
    }

    } catch (\Throwable $th) {
      // No items for invalid values
    }

    return $items;
  }

  function get_field( $field_name, $args = [] ) {
    if ( empty( $field_name ) ) {
      return self::$date->now()->format( 'l' );
    }
    return parent::get_field( $field_name, $args );
  }

  function get_item_field( $item, $field_name, $args = [] ) {

    // Support "locale" attribute on Field or Loop
    if (( $field_name === 'name' || $field_name === 'short_name' )
      && ( $locale = isset( $args['locale'] ) ? $args['locale'] : (
      isset( $this->args['locale'] ) ? $this->args['locale'] : null
      ) )) $item->locale( $locale );

    switch ( $field_name ) {

      case 'name':
          return $item->format( 'l' );
      case 'short_name':
          return $item->format( 'D' );

      case 'weekday':
      default:
        /**
         * Day of week
         *
         * Original: 0 (Sunday) ~ 6 (Saturday)
         * Convert to: 1 (Monday) ~ 7 (Sunday)
         */
        $weekday                     = $item->format( 'w' );
        if ($weekday === 0) $weekday = 7;
          return $weekday;
    }
  }
};

CalendarWeekDayLoop::$date = $loop->date;

$loop->register_type( CalendarWeekDayLoop::class );
