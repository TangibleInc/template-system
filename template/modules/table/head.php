<?php

// Head

$html->table_head_tag = function( $atts, $nodes ) use ( $loop, $html ) {

  $html->current_table['current_head'] = [];

  $content = $html->render_raw_tag('thead', $atts, [
    [
      'tag'        => 'tr',
      'attributes' => [],
      'children'   => $nodes,
    ],
  ]);

  unset( $html->current_table['current_head'] );

  return $content;
};

$html->table_head_column_tag = function( $atts, $nodes ) use ( $html ) {

  $name = '';
  if ( isset( $atts['name'] ) ) {
    $name = $atts['name'];
    unset( $atts['name'] );
  }

  $sort_enabled = false;
  if ( isset( $atts['sort'] ) ) {
    $sort_enabled = $atts['sort'] === 'true';
    unset( $atts['sort'] );
  }

  $sort_type = 'string';
  if ( isset( $atts['sort_type'] ) ) {
    $sort_enabled = true;
    $sort_type    = $atts['sort_type'];
    unset( $atts['sort_type'] );
  }

  $content = trim( $html->render( $nodes ) );

  if ( ! empty( $name ) ) {

    $html->current_table['column_label'][ $name ]     = $content;
    $html->current_table['column_sort_type'][ $name ] = $sort_type;

    $html->current_table['column_order'] [] = $name;

    if ( $sort_enabled ) {
      if ( ! in_array( $name, $html->current_table['column_sort_enabled'] ) ) {
        $html->current_table['column_sort_enabled'] [] = $name;
      }
      if ( $html->current_table['sort_column'] === $name ) {
        $html->current_table['sort_type'] = $sort_type;
      }
    }
  }

  return $html->render_raw_tag( 'th', $atts, $content );
};
