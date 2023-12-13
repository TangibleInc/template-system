<?php

namespace Tangible\Loop;

use tangible\date;

/**
 * Loop over calendar months
 */
class CalendarMonthLoop extends BaseLoop {

  static $now;

  public $year;

  static $config = [
    'name'       => 'calendar_month',
    'title'      => 'Calendar month',
    'query_args' => [
      'from'       => [
        'description' => 'From month (number), or "current"',
        'type'        => ['number', 'string'],
      ],
      'to'       => [
        'description' => 'To month (number), or "current"',
        'type'        => ['number', 'string'],
      ],
      'month'       => [
        'description' => 'Month (number), or "current"',
        'type'        => ['number', 'string'],
      ],
      'quarter'       => [
        'description' => 'Quarter (number), or "current"',
        'type'        => ['number', 'string'],
      ],
      'year'       => [
        'description' => 'Year (number), or "current"',
        'type'        => ['number', 'string'],
      ],
      'locale'       => [
        'description' => 'Locale',
        'type'        => 'string',
      ],
    ],
    'fields'     => [
      'name' => [ 'description' => 'Name' ],
      'short_name' => [ 'description' => 'Short name' ],
      'year' => [ 'description' => 'Year' ],
      'month' => [ 'description' => 'Month' ],
      'month_with_zero' => [ 'description' => 'Month with leading zero' ],
      'week' => [ 'description' => 'Week loop for every week' ],
      'day' => [ 'description' => 'Day loop for every day' ],
      'date' => [ 'description' => 'Date - Optionally use attribute "format"' ],
    ]
  ];

  function get_items_from_query( $args ) {

    $date = \tangible\date();

    $items = [];
    $now = self::$now ? self::$now : (self::$now = $date->now()); // Cached now instance

    // Catch if Date library throws error
    try {
      
    $this->year = $now->format('Y');
      
    if (isset($args['year'])) {

      // Months in given year

      if ($args['year']!=='current') {
        $this->year = (int) $args['year'];
      }

      // 1~12 by default
      if (!isset($args['from'])) $args['from'] = 1;
      }
      
    if (isset($args['quarter'])) {

      // Months in quarter

      $quarter = $args['quarter'];

      if ($quarter==='current') {
        $month = $now->format('n'); // 1~12
        $quarter = floor( ($month-1) / 3 + 1 );
      }

      $from = (($quarter - 1) * 3) + 1;
      $to   = $from + 2;

    } elseif (isset($args['from'])) {

      // From/to months

      $from = (int) $args['from'];
      $to   = isset($args['to']) ? (int) $args['to'] : 12;

    } else {

      // Single month by default

      $month = isset($args['month']) ? $args['month'] : 'current';

      if ($month==='current') {
        $month = $now->format('n'); // 1~12
      } elseif (!is_numeric($month)) {
        $month = $date->parse("$month, 2000")->format('n');
      }

      $from = $month;
      $to   = $month;
    }

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

    $date = \tangible\date();

    $year = $this->year;
    $month = $item;
    $first_day_of_month = $date->create( $year, $month, 1 );

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

        $last_day_of_month = $date->create( $year, $month, $first_day_of_month->format('t') );

        return self::$loop->create_type('calendar_week', [
          'from' => $first_day_of_month->isoWeek(),
          'to' => $last_day_of_month->isoWeek(),
        ]);

      case 'day':

        $last_day_of_month = $date->create( $year, $month, $first_day_of_month->format('t') );

        return self::$loop->create_type('calendar_day', [
          'from' => $first_day_of_month->format('Y-m-d'),
          'to' => $last_day_of_month->format('Y-m-d'),
        ]);

      case 'month':
      default: return $month;
    }
  }
};

$loop->register_type( CalendarMonthLoop::class );
