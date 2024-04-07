<?php
use tangible\format;
use tangible\template_system\table;

/**
 * Table - Loop type with pagination, sort, and filter via AJAX
 */

$html->current_table = [];

require_once __DIR__.'/body.php';
require_once __DIR__.'/head.php';
require_once __DIR__.'/foot.php';

require_once __DIR__.'/row.php';
require_once __DIR__.'/column.php';

require_once __DIR__.'/ajax.php';
require_once __DIR__.'/enqueue.php';

require_once __DIR__.'/empty.php';
require_once __DIR__.'/filter.php';
require_once __DIR__.'/paginate.php';

$html->table_tag = function($atts, $nodes = []) use ($html) {

  $table_atts = [
    'id' => isset($atts['id']) ? $atts['id'] : 'tangible-table-'.uniqid(),
    'class' => 'table tangible-table tangible-dynamic-module'
      .(isset($atts['class']) ? ' '.$atts['class'] : '')
    ,
    /**
     * Support for page builders with dynamic HTML
     * @see /module-loader in Template module
     */
    'data-tangible-dynamic-module' => 'table',
  ];

  $name = isset($atts['name']) ? $atts['name'] : '';

  // Search

  $search = isset($atts['search']) ? $atts['search'] : '';
  $search_columns = isset($atts['search_columns']) ? (
    is_string($atts['search_columns'])
      ? format\multiple_values($atts['search_columns'])
      : $atts['search_columns']
  ) : [];

  // Sorting

  // Alias
  if (isset($atts['sort'])) $atts['sort_column'] = $atts['sort'];

  foreach ([
    'sort_column' => null,
    'sort_order'  => 'asc',
    'sort_type'   => 'string'
  ] as $key => $value) {
    $$key = isset($atts[ $key ]) ? $atts[ $key ] : $value;
  }

  // Pagination

  $page = isset($atts['page']) ? (int) $atts['page'] : 1;
  $per_page = isset($atts['per_page']) ? (int) $atts['per_page'] : (
    isset($atts['paged']) ? $atts['paged'] : -1
  );


  $column_order = isset($atts['column_order']) ? $atts['column_order'] : [];

  $row_loop = [];
  $return_data = false;

  // From AJAX request
  if (isset($atts['row_loop'])) {
    $row_loop = $atts['row_loop'];
    $return_data = true;
  }

  $column_template = isset($atts['column_template'])
    ? $atts['column_template']
    : []
  ;

  // Gather table settings and data

  $html->previous_table = $html->current_table;

  $html->current_table = [

    'name'          => $name,

    'row_loop'      => $row_loop,
    'column_template' => $column_template,

    'page'          => $page,
    'per_page'      => $per_page,
    'total_pages'   => 1,

    'pagination_template' => '',
    'empty_table_template' => '',

    // rows         => columnData[]

    'column_label'        => [], // name => label
    'column_sort_type'    => [], // name => sort_type

    // Order of columns to display
    'column_order'        => $column_order, // name[]
    'column_sort_enabled' => [], // name[]

    'sort_column'         => $sort_column,
    'sort_order'          => $sort_order,
    'sort_type'           => $sort_type,

    'search'              => $search,
    'search_columns'      => $search_columns,

    // Filters template
    'filter'              => '',

    // Filter by column value, passed from client side
    'filter_by_column_values'   => isset($atts['filter_by_column_values'])
      ? $atts['filter_by_column_values']
      : []
    ,
  ];

  $current_table = &$html->current_table;

  // The table

  if ($return_data) {
    $content = $html->table_body( $row_loop );
  } else {
    $content = $html->render($nodes);
  }

  if (!isset($current_table['rows'])) {
    $current_table['rows'] = [];
  }

  if (empty($current_table['rows'])) {

    if (!$return_data) {
      $nodes = $current_table['empty_table_template'];
      $content = empty($nodes) ? '' : (
        is_array($nodes) ? $html->render($nodes) : $nodes
      );
    }

    // Restore previous
    $html->current_table = $html->previous_table;

    return $return_data ? $current_table : $content;
  }

  // Container

  $container_nodes = [];

  if (!$return_data && !empty($current_table['filter']))  {
    $container_nodes []= $current_table['filter'];
  }

  // Settings for client side

  if ( ! $return_data ) {

    // Exclude fields
    unset($current_table['filter']);
    unset($current_table['filter_by_column_values']);

    unset($current_table['row_loop']['children']);

    $table_atts['data-tangible-table-config'] = json_encode(
      $current_table
    );
  }


  $container_nodes []= [
    'tag' => 'table',
    'attributes' => $table_atts,
    'children' => $content,
  ];

  $table_html = $html->render_raw_tag('div', [
    'class' => 'tangible-table-container',
  ], $container_nodes);


  // tangible\see($current_table);

  if ($return_data) {

    $data = $current_table;

  } else {

    // Enqueue Tangible Table module
    table\enqueue(); // See ./enqueue.php
  }

  // Restore previous
  $html->current_table = $html->previous_table;

  return $return_data ? $data : $table_html;
};

/**
 * Table tags
 */
$html->add_open_tag('Table', $html->table_tag, [
  'local_tags' => [

    'Head' => $html->table_head_tag,
    'Foot' => $html->table_foot_tag,

    'Row'    => $html->table_row_tag,
    'Col'    => $html->table_column_tag,
    'Column' => $html->table_column_tag,

    'RowLoop'     => $html->table_row_loop_tag,

    // Idea: Custom template to generate rows
    // 'RowTemplate' => $html->table_row_template_tag,

    'Empty'    => $html->table_empty_tag,
    'Filter'   => $html->table_filter_tag,
    'Paginate' => $html->table_paginate_tag,

  ],
]);
