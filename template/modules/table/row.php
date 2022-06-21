<?php

$html->table_row_loop_tag = function( $atts, $nodes ) use ( $loop, $html ) {
  return $html->table_body([
    'tag'        => 'Loop',
    'attributes' => $atts,
    'children'   => $nodes,
  ]);
};

$html->table_row_tag = function( $atts, $nodes ) use ( $html ) {

  $current_table = &$html->current_table;

  if ( ! isset( $current_table['rows'] ) ) {
    return $html->render_raw_tag( 'tr', $atts, $nodes );
  }

  // Gather current row's columns data

  $current_table['current_row']              = [];
  $current_table['current_row_column_index'] = 0;

  // Store column attributes before render
  $current_table['current_row_column_attributes'] = [];
  foreach ( $nodes as $node ) {
    if ( isset( $node['tag'] ) && $node['tag'] === 'Col' ) {
      $current_table['current_row_column_attributes'] [] = $node['attributes'];
    }
  }

  $content = $html->render_raw_tag( 'tr', $atts, $nodes );

  if ( ! empty( $current_table['current_row'] ) ) {
    $current_table['rows'] [] = $current_table['current_row'];
  }

  unset( $current_table['current_row'] );
  unset( $current_table['current_row_column_index'] );

  return $content;
};
