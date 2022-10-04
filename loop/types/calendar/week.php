<?php

namespace Tangible\Loop;

/**
 * Loop over calendar weeks
 */
class CalendarWeekLoop extends BaseLoop {

  static $date;

  static $config = [
    'name'  => 'calendar_week',
    'title' => 'Calendar week',
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

    $items = []; // Each item: { year, week }

    $now = self::$date->now();

    $year                          = isset( $args['year'] ) ? $args['year'] : 'current';
    if ($year === 'current') $year = $now->format( 'Y' );

    if ( isset( $args['year'] ) && ! isset( $args['month'] ) ) {

      // All weeks of this year

      $last_day_of_year = self::$date->create( $year, 12, 31 );

      $first_week = 1;
      $last_week  = $last_day_of_year->format( 'W' );

      for ( $week = $first_week; $week <= $last_week; $week++ ) {
        $items [] = [
          'year' => $year,
          'week' => (int) $week,
        ];
      }
      return $items;
    }

    if ( isset( $args['quarter'] ) ) {

      $quarter = $args['quarter'];

      if ( $quarter === 'current' ) {
        $month   = $now->format( 'n' ); // 1~12
        $quarter = floor( ( $month - 1 ) / 3 + 1 );
      }

      $first_month_of_quarter = ( ( $quarter - 1 ) * 3 ) + 1;
      $last_month_of_quarter  = $first_month_of_quarter + 2;

      $first_day_of_quarter = self::$date->create( $year, $first_month_of_quarter, 1 );

      $last_day_of_last_month = self::$date->create( $year, $last_month_of_quarter, 1 )->format( 't' );
      $last_day_of_quarter      = self::$date->create($year, $last_month_of_quarter,
        $last_day_of_last_month
      );

      $first_week = $first_day_of_quarter->format( 'W' );
      $last_week  = $last_day_of_quarter->format( 'W' );

      for ( $week = $first_week; $week <= $last_week; $week++ ) {
        $items [] = [
          'year' => $year,
          'week' => $week,
        ];
      }

      return $items;
    }

    if ( isset( $args['month'] ) ) {

      $month = $args['month'];

      if ( $month === 'current' ) {
        $month = $now->format( 'n' ); // 1~12
      } elseif ( ! is_numeric( $month ) ) {
        $month = self::$date->parse( "$month, 2000" )->format( 'n' );
      }

      $first_day_of_month = self::$date->create( $year, $month, 1 );
      $last_day_of_month  = self::$date->create( $year, $month, $now->format( 't' ) );

      $first_week = $first_day_of_month->format( 'W' );
      $last_week  = $last_day_of_month->format( 'W' );

      for ( $week = $first_week; $week <= $last_week; $week++ ) {
        $items [] = [
          'year' => $year,
          'week' => $week,
        ];
      }

      return $items;
    }

    if ( isset( $args['from'] ) ) {

      $from = $args['from'] === 'current' ? $now->format( 'W' ) : $args['from'];

      if ( isset( $args['to'] ) ) {
        $to = $args['to'];
      } else {
        // Get last week of this year
        $last_day_of_year = self::$date->create( $year, 12, 31 );
        $to               = $last_day_of_year->format( 'W' );
      }

      /**
       * Add exception for January which can have a week that starts in the
       * previous year - for example, from week 52 to week 5.
       */
      if ($from > $to) {

        $previous_year = $year - 1;
        $last_week_of_previous_year = self::$date->create( $previous_year, 12, 31 )->format('W');

        // Push weeks in previous year

        for ( $week = $from; $week <= $last_week_of_previous_year; $week++ ) {
          $items [] = [
            'year' => $previous_year,
            'week' => $week,
          ];
        }

        // Push rest of weeks in current year
        $from = 1;
      }

      for ( $week = $from; $week <= $to; $week++ ) {
        $items [] = [
          'year' => $year,
          'week' => $week,
        ];
      }

      return $items;
    }

    $week = isset( $args['week'] ) ? $args['week'] : 'current';

    if ( $week === 'current' ) {
      $week = $now->format( 'W' ); // 1~53
    }

    $items [] = [
      'year' => $year,
      'week' => $week,
    ];

    return $items;
  }

  function get_field( $field_name, $args = [] ) {
    if (empty( $field_name )) return $this->current['week'];
    return parent::get_field( $field_name, $args );
  }

  function get_item_field( $item, $field_name, $args = [] ) {

    switch ( $field_name ) {
      case 'day': // Loop through each day of this week
        $week = self::$date->now()->setISODate(
          $item['year'],
          $item['week']
        );

        return self::$loop->create_type('calendar_day', [
          'from' => $week->startOfWeek()->format( 'Y-m-d' ),
          'to'   => $week->endOfWeek()->format( 'Y-m-d' ),
        ]);
      break;
      case 'week':
          return $item['week'];
      default:
          return isset( $item[ $field_name ] )
        ? $item[ $field_name ]
        : null;
    }
  }
};

CalendarWeekLoop::$date = $loop->date;

$loop->register_type( CalendarWeekLoop::class );
