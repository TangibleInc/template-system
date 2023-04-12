<?php

namespace Tangible\Loop;

/**
 * Loop over calendar days
 */
class CalendarDayLoop extends BaseLoop {

  static $date;
  static $config = [
    'name'  => 'calendar_day',
    'title' => 'Calendar day',
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

    $items = []; // Each item: { year, month, day }

    $now = self::$date->now();

    $from = isset( $args['from'] ) ? $args['from'] : '';
    $to   = isset( $args['to'] ) ? $args['to'] : '';

    $year = isset( $args['year'] ) ? $args['year'] : $now->format( 'Y' );

    if ( isset( $args['day'] ) ) {
      if ( $args['day'] === 'first_of_week' ) {
        $args['week'] = isset( $args['week'] ) ? $args['week'] : 'current';
        $args['day']  = 'first';
      } elseif ( $args['day'] === 'last_of_week' ) {
        $args['week'] = isset( $args['week'] ) ? $args['week'] : 'current';
        $args['day']  = 'last';

      } elseif ( $args['day'] === 'first_of_month' ) {
        $args['month'] = isset( $args['month'] ) ? $args['month'] : 'current';
        $args['day']   = 'first';
      } elseif ( $args['day'] === 'last_of_month' ) {
        $args['month'] = isset( $args['month'] ) ? $args['month'] : 'current';
        $args['day']   = 'last';
      }
    }

    // Catch if Date library throws error
    try {

      if ( isset( $args['week'] ) ) {

        $week = $args['week'];

        if ( $week === 'current' ) {
          $week = $now->format( 'W' ); // 1~53
        }

        $week = $now->setISODate( $year, $week );

        $from = $week->startOfWeek()->format( 'Y-m-d' );
        $to   = $week->endOfWeek()->format( 'Y-m-d' );

      } elseif ( isset( $args['month'] ) ) {

        $month = $args['month'];

        if ( $month === 'current' ) {
          $month = $now->format( 'n' ); // 1~12
        } elseif ( ! is_numeric( $month ) ) {
          $month = self::$date->parse( "$month, 2000" )->format( 'n' );
        }

        $from = self::$date->create( $year, $month, 1 )->format( 'Y-m-d' );

        $days_of_month = $now->format( 't' );
        $to            = self::$date->create( $year, $month, $days_of_month )->format( 'Y-m-d' );
      }

      if ( isset( $args['day'] ) ) {
        if ( $args['day'] === 'first' ) {
          $to = $from;
        } elseif ( $args['day'] === 'last' ) {
          $from = $to;
        }
      }

      if ( ! empty( $from ) && ! empty( $to ) ) {

        $from_date = self::$date->parse( $from );
        $period    = $from_date->range( $to );

        foreach ( $period as $day ) {
          $items [] = $day;
        }
      } else {
        // Today
        $items [] = $now;
        return $items;
      }
    } catch ( \Throwable $th ) {
      // No items for invalid values
    }

    return $items;
  }

  function get_field( $field_name, $args = [] ) {
    if (empty( $field_name )) $field_name = 'date';
    return parent::get_field( $field_name, $args );
  }

  function get_item_field( $item, $field_name, $args = [] ) {

      // Support "locale" attribute on Field or Loop tag
      if (( $field_name === 'name' || $field_name === 'short_name' )
        && ( $locale = isset( $args['locale'] ) ? $args['locale'] : (
        isset( $this->args['locale'] ) ? $this->args['locale'] : null
        ) )) $item->locale( $locale );

      // @see https://www.php.net/manual/en/datetime.format.php

      switch ( $field_name ) {

        case 'name':
            return $item->format( 'l' );
        case 'short_name':
            return $item->format( 'D' );

        case 'year':
            return $item->format( 'Y' );

        case 'month':
            return $item->format( 'n' );
        case 'month_with_zero':
            return $item->format( 'm' );

        case 'day':
            return $item->format( 'j' );
        case 'day_with_zero':
            return $item->format( 'd' );

        case 'weekday':
          /**
           * Day of week
           *
           * Original: 0 (Sunday) ~ 6 (Saturday)
           * Convert to: 1 (Monday) ~ 7 (Sunday)
           */
          $weekday                     = $item->format( 'w' );
          if ($weekday === 0) $weekday = 7;

            return $weekday;

        case 'date':
        default:
          // Support "format" attribute on Field or Loop tag
          $format = ( $locale = isset( $args['format'] ) ? $args['format'] : (
          isset( $this->args['format'] ) ? $this->args['format'] : 'Y-m-d'
          ) );
            return $item->format( $format );
      }
  }
};

CalendarDayLoop::$date = $loop->date;

$loop->register_type( CalendarDayLoop::class );
