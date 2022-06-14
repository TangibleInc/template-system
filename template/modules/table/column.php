<?php

// Cell

$html->table_column_tag = function($atts, $nodes) use ($html) {

  $current_table = &$html->current_table;

  if (isset($current_table['current_head'])) {
    return $html->table_head_column_tag($atts, $nodes);
  }

  $name = '';

  if (isset($atts['name'])) {
    $name = $atts['name'];
    unset($atts['name']);
  } elseif (isset($current_table['current_row_column_index'])
    && isset($current_table['column_order'][
      $current_table['current_row_column_index']
    ])
  ) {
    // Column name set in header column
    $name = $current_table['column_order'][
      $current_table['current_row_column_index']
    ];
  }

  if ( empty($name) || !isset($current_table['current_row']) ) {
    return $html->render_raw_tag('td', $atts, $nodes);
  }

  // Inside row loop

  if (!isset($current_table['current_row_column_index'])) {
    $current_table['current_row_column_index'] = 0;
  }

  $column_template_atts = $atts;

  if (isset($current_table['current_column_attributes'])) {

    $column_template_atts = $current_table['current_column_attributes'];

  } else if (isset($current_table['current_row_column_index'])
    && isset($current_table['current_row_column_attributes'][
      $current_table['current_row_column_index']
    ])) {
    $column_template_atts = $current_table['current_row_column_attributes'][
      $current_table['current_row_column_index']
    ];
  }

  // Gather column content

  $current_table['column_template'][ $name ] = [
    'tag' => 'Col',
    'attributes' => $column_template_atts,
    'children' => $nodes,
  ];

  $value = trim($html->render($nodes));
  $display_value = null;

  if (isset($atts['value'])) {

    // Separate display and sort value

    $display_value = $current_table['current_row'][ $name . '__display' ] = $value;
    $value = $atts['value'];
    unset($atts['value']);
  }

  // Cast value based on sort type
  if (isset($current_table['column_sort_type'][ $name ])) {

    $sort_type = $current_table['column_sort_type'][ $name ];

    if ($sort_type==='number') {
      $display_value = $display_value!==null ? $display_value : $value;
      $value = (int) $value;
    }
  }

  $current_table['current_row'][ $name ] = $value;
  $current_table['current_row_column_index']++;

  return $html->render_raw_tag('td', $atts,
    $display_value!==null ? $display_value : $value
  );
};
