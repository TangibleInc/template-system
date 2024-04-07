<?php

$html->table_body = function($row_loop = []) use ($loop, $html) {

  $current_table = &$html->current_table;

  if (!isset($row_loop['tag'])) return;

  $current_table['row_loop'] = $row_loop;

  $tag        = $row_loop['tag'];
  $attributes = $row_loop['attributes'];
  $template   = [
    'tag' => 'Row',
    'attributes' => [],
    'children' => [],
  ];

  if (isset($row_loop['children'])) {
    $template['children'] = $row_loop['children'];
  } else {

    // From client side: Use given template for columns

    foreach ($current_table['column_template'] as $name => $node) {
      $template['children'] []= $node;
    }
  }


  $create_tag = $tag==='Loop'
    ? $html->loop_tag
    : $html->list_tag // TODO
  ;

  /**
   * Create loop instance to generate rows
   *
   * Currently, sort/filter/paginate/search are done *after* the loop query to ensure
   * consistent support across all loop types and fields. Consider how a loop type
   * can handle them as part of query for more efficiency.
   *
   * See BaseLoop class in the Loop module for default methods.
   */

  $current_table['rows'] = [];

  $body_loop = $create_tag(
    array_merge($attributes, [
      'instance' => true,
    ])
  );

  if (empty($current_table['column_template'])) {
    $col_index = -1;
    foreach ($template['children'] as $node) {
      if (!isset($node['tag']) || $node['tag']!=='Col') continue;
      $col_index++;
      if (isset($current_table['column_order'][ $col_index ])) {
        $column = $current_table['column_order'][ $col_index ];
        $current_table['column_template'][ $column ] = $node;
      }
    }
  }

  $get_column_value = function($column) use ($html, &$current_table, &$body_loop, $template) {

    if (!isset($current_table['column_template'])
      || !isset($current_table['column_template'][ $column ])
    ) {
      return null;
    }

    $col_template = $current_table['column_template'][ $column ];

    if (!isset($col_template['attributes']['name'])) {
      $col_template['attributes']['name'] = $column;
    }

    $current_table['current_row'] = [];
    $current_table['current_row_column_index'] = 0;
    $current_table['current_column_attributes'] = $col_template['attributes'];

    $body_loop->loop_current_item(function() use ($html, &$col_template) {
      $html->render([ $col_template ]);
    });

    $value = isset($current_table['current_row'][ $column ])
      ? $current_table['current_row'][ $column ]
      : null
    ;

    // Reset current row
    unset($current_table['current_row']);
    unset($current_table['current_row_column_index']);
    unset($current_table['current_column_attributes']);

    return $value;
  };

  // Search

  if (!empty($current_table['search']) && !empty($current_table['search_columns'])) {

    $value = $current_table['search'];
    $columns = $current_table['search_columns'];

    // $body_loop->search_fields($value, $columns);

    // Search columns

    $body_loop->filter(function($item) use (&$current_table, $value, $columns, &$get_column_value) {

      $this->current = $item;
      $search_value = $value;

      foreach ($columns as $column) {

        $search_type = isset($current_table['column_sort_type'][ $column ])
          ? $current_table['column_sort_type'][ $column ]
          : 'string'
        ;

        if ($search_type === 'lowercase') {
          $search_value = strtolower( $value );
        }

        $field_value = $get_column_value( $column );

        switch ($search_type) {
          case 'lowercase':
          case 'string':
            if (mb_stripos($field_value, $search_value)!==false) return true;
          break;
          case 'number':
            $field_value = strval($field_value);
            if (strpos($field_value, $search_value)!==false) return true;
          break;
          case 'date':
            // Date range

            if (!is_array($search_value)) {

              // Create range from start to end of day

            }

            // $from = $value['from'];
            // $to   = $value['to'];
          break;
        }
      }

      return false;
    });
  }

  // Filter by column values

  if (!empty($current_table['filter_by_column_values'])) {

    $filter_column_values = $current_table['filter_by_column_values']; // { key: { value: '' } }

    $body_loop->filter(function($item) use (&$filter_column_values, &$get_column_value) {

      $this->current = $item;

      foreach ($filter_column_values as $key => $data) {

        $field_value = $get_column_value( $key );
        $keep = false;

        if (isset($data['value'])) {
          // Exact value
          $value = $data['value'];
          $keep = trim($field_value) === $value;
        }

        if (!$keep) return false;
      }

      return true;
    });
  }

  // Sort

  if (!empty($current_table['sort_column'])) {

    $column = $current_table['sort_column'];
    $order = $current_table['sort_order'];
    $sort_type = isset($current_table['column_sort_type'][ $column ])
      ? $current_table['column_sort_type'][ $column ]
      : (isset($current_table['sort_type'])
        ? $current_table['sort_type']
        : 'string'
      )
    ;

    // $body_loop->sort_by_field($column, $order, $sort_type);

    /**
     * Sort by column
     *
     * Implemented separately from BaseLoop's sort_by_field because column value
     * can be different from field. Consider how to consolidate.
     */
    $body_loop->sort(function($a, $b) use ($column, &$get_column_value, $order, $sort_type, $current_table) {

      $order = strtolower($order)==='asc' ? 1 : -1;

      $this->current = $a;
      $a_value = $get_column_value( $column );

      $this->current = $b;
      $b_value = $get_column_value( $column );

      switch ($sort_type) {

        case 'date':
          $a_value = is_numeric($a_value) ? (int) $a_value : strtotime( $a_value );
          $b_value = is_numeric($b_value) ? (int) $b_value : strtotime( $b_value );
          // Fall through

        case 'number':
          if ($a_value==$b_value) return 0;
          return ($a_value < $b_value ? -1 : 1) * $order;
        break;

        case 'lowercase':
          $a_value = strtolower( $a_value );
          $b_value = strtolower( $b_value );
          // Fall through

        case 'string':
        default:
          return strcmp($a_value ?? '', $b_value ?? '') * $order;
        break;
      }
    });
  }

  // Paginate

  $page = $current_table['page'];
  $per_page = $current_table['per_page'];

  $body_loop->set_items_per_page( $per_page );

  $total_pages = $current_table['total_pages'] = $body_loop->get_total_pages();

  if ($page > $total_pages) {
    $page = $current_table['page'] = $total_pages;
  }

  $body_loop->set_current_page( $page );

  // Generate rows

  $content = '';

  $body_loop->loop(function() use ($html, &$content, &$template) {
    $content .= $html->render([$template]);
  });

  return $html->render_raw_tag('tbody', [], $content);
};
