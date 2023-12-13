<?php
namespace Tangible\Loop;
use tangible\date;

/**
 * Loop over calendar quarters
 */
class CalendarQuarterLoop extends BaseLoop {

  static $date;

  static $config = [
    'name'       => 'calendar_quarter',
    'title'      => 'Calendar quarter',
    'query_args' => [
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
      'year' => [ 'description' => 'Year' ],
      'month' => [ 'description' => 'Month loop for every month' ],
      'week' => [ 'description' => 'Week loop for every week' ],
    ],
  ];

  function get_items_from_query( $args ) {

    $items = [];

    $date = \tangible\date();
    $now = $date->now();

    if (isset($args['year'])) {

      $year = $args['year'];

      if ($year==='current') {
        $year = $now->format('Y');
      }

      for ($i=1; $i <= 4; $i++) {
        $items []= [
          'year'    => $year,
          'quarter' => $i,
        ];
      }

      return $items;
    }

    if ( ! isset($args['quarter']) ) {
      $args['quarter'] = 'current';
    }

    $quarter = $args['quarter'];

    if ($quarter==='current') {
      $month = $now->format('n'); // 1~12
      $quarter = floor( ($month-1) / 3 + 1 );
    }

    $items []= [
      'year' => $now->format('Y'),
      'quarter' => $quarter,
    ];

    return $items;
  }

  function get_field( $field_name, $args = [] ) {
    if (empty($field_name)) {
      return $this->current['quarter'];
    }
    return parent::get_field( $field_name, $args );
  }

  function get_item_field( $item, $field_name, $args = [] ) {

    $date = \tangible\date();

    $year = $item['year'];
    $quarter = $item['quarter']; // 1~4

    switch ($field_name) {
      case 'year':  return $year;
      case 'month':

        $from = (($quarter - 1) * 3) + 1;
        $to = $from + 2;

        return self::$loop->create_type('calendar_month', [
          'from' => $from,
          'to' => $to,
        ]);

      case 'week':

        $from_month = (($quarter - 1) * 3) + 1;
        $to_month = $from_month + 2;

        $first_day_of_from_month = $date->create($year, $from_month, 1);
        $last_day_of_to_month = $date->create($year, $from_month,
          $date->create($year, $to_month, 1)->format('t') // Number of days in the given month
        );

        $first_week = $first_day_of_from_month->isoWeek();
        $last_week = $last_day_of_to_month->isoWeek();

        return self::$loop->create_type('calendar_week', [
          'from' => $first_week,
          'to' => $last_week,
        ]);
      return;
      default:
      return $quarter;
    }
  }
};

$loop->register_type( CalendarQuarterLoop::class );
