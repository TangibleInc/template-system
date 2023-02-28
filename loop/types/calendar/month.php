<?php

namespace Tangible\Loop;

/**
 * Loop over calendar months
 */
class CalendarMonthLoop extends BaseLoop {

  static $date;
  static $now;

  static $config = [
    'name'       => 'calendar_month',
    'title'      => 'Calendar month',
  ];

  function get_items_from_query( $args ) {

    $items = [];

    $now = self::$now ? self::$now : (self::$now = self::$date->now()); // Cached now instance

    // Catch if Date library throws error
    try {
      
      $year = $args['year'] ?? 'current';
      
      if ($year != 'current') {
        $now->year($year);
      }
      
    if (isset($args['quarter'])) {

      $quarter = $args['quarter'];

      if ($quarter==='current') {
        $month = $now->format('n'); // 1~12
        $quarter = floor( ($month-1) / 3 + 1 );
      }

      $args['from'] = (($quarter - 1) * 3) + 1;
      $args['to']   = $args['from'] + 2;

    } elseif (!isset($args['from'])) {

      $month = isset($args['month']) ? $args['month'] : 'current';

      if ($month==='current') {
        $month = $now->format('n'); // 1~12
      } elseif (!is_numeric($month)) {
        $month = self::$date->parse("$month, 2000")->format('n');
      }

      // $items []= (int) $month;

      $args['from'] = $month;
      $args['to']   = $month;
    }

    $from = isset($args['from']) ? (int) $args['from'] : 1;
    $to   = isset($args['to']) ? (int) $args['to'] : 12;

    // Sanity check: Only pass valid month value
    if ($from >=1 && $from <= 12 && $to >= 1 && $to <= 12) {
      for ($i = $from; $i <= $to; $i++) {
        $items []= $i;
      }
    }

    } catch (\Throwable $th) {
      // No items for invalid values
    }

    return $items;
  }

  function get_item_field( $item, $field_name, $args = [] ) {

    $now = self::$now ? self::$now : (self::$now = self::$date->now()); // Cached now instance

    $year = $now->format('Y');
    $month = $item;

    $first_day_of_month = self::$date->create( $year, $month, 1 );

    // Support "locale" attribute on Field or Loop
    if (($field_name==='name'|| $field_name==='short_name')
      && ($locale = isset($args['locale']) ? $args['locale'] : (
      isset($this->args['locale']) ? $this->args['locale'] : null
    ))) $first_day_of_month->locale( $locale );

    switch ($field_name) {

      case 'name': return $first_day_of_month->format('F');
      case 'short_name': return $first_day_of_month->format('M');

      case 'year':  return $year;
      case 'month_with_zero': return $month;

      case 'week':

        $last_day_of_month = self::$date->create( $year, $month, $first_day_of_month->format('t') );

        return self::$loop->create_type('calendar_week', [
          'from' => $first_day_of_month->format('W'),
          'to' => $last_day_of_month->format('W'),
        ]);

      case 'day':

        $last_day_of_month = self::$date->create( $year, $month, $first_day_of_month->format('t') );

        return self::$loop->create_type('calendar_day', [
          'from' => $first_day_of_month->format('Y-m-d'),
          'to' => $last_day_of_month->format('Y-m-d'),
        ]);

      case 'month':
      default: return $month;
    }
  }
};

CalendarMonthLoop::$date = $loop->date;

$loop->register_type( CalendarMonthLoop::class );
