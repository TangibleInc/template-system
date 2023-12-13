<?php
namespace Tangible\Loop;
use \tangible\date;

/**
 * Loop over calendar years
 */
class CalendarYearLoop extends BaseLoop {

  static $config = [
    'name'       => 'calendar_year',
    'title'      => 'Calendar year',
    'query_args' => [
      'from'       => [
        'description' => 'From year (number), or "current"',
        'type'        => ['number', 'string'],
      ],
      'to'       => [
        'description' => 'To year (number), or "current"',
        'type'        => ['number', 'string'],
      ],
    ],
    'fields'     => [
      'quarter' => [ 'description' => 'Quarter loop for every quarter' ],
      'month' => [ 'description' => 'Month loop for every month' ],
      'week' => [ 'description' => 'Week loop for every week' ],
    ],
  ];

  function get_items_from_query( $args ) {

    
    $items = [];
    
    $date = \tangible\date();
    $now = $date->now();
    $current_year = $now->format('Y');

    $from = (isset($args['from']) && is_numeric($args['from'])) ? $args['from'] : $current_year;
    $to = (isset($args['to']) && is_numeric($args['to'])) ? $args['to'] : $current_year;

    for ($i = $from; $i <= $to; $i++) {
      $items []= $i;
    }

    return $items;
  }

  function get_field( $field_name, $args = [] ) {
    if (empty($field_name)) {
      return $this->current;
    }
    return parent::get_field( $field_name, $args );
  }

  function get_item_field( $item, $field_name, $args = [] ) {

    $year = $item;

    switch ($field_name) {
      case 'quarter':
        return self::$loop->create_type('calendar_quarter', [
          'year' => $year
        ]);
      case 'month':
        return self::$loop->create_type('calendar_month', [
          'year' => $year
        ]);
      case 'week':
        return self::$loop->create_type('calendar_week', [
          'year' => $year
        ]);
      default: return $year;
    }
  }
};

$loop->register_type( CalendarYearLoop::class );
