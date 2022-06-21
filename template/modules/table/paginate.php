<?php

$html->table_paginate_tag = function( $atts, $nodes ) use ( $html ) {

  $current_table = &$html->current_table;

  // Fields - These are wrapped to be dynamically rendered on paginator state change

  $fields_content = [];

  foreach ( [
    'current'  => $current_table['page'],
    'per_page' => $current_table['per_page'],
    'total'    => $current_table['total_pages'],
  ] as $key => $value ) {
    $fields_content[ $key ] =
      '<span data-tangible-table-paginator-field="' . $key . '">'
        . $value
      . '</span>';
  }

  /**
   * Create paginated context for <Field> tag - a loop with a single item.
   */
  $paginated_context = new \Tangible\Loop\BaseLoop( [ $fields_content ] );

  $content = '';

  $paginated_context->loop(function() use ( $html, &$content, &$nodes ) {
    $content = trim( $html->render( $nodes ) );
  });

  $current_table['pagination_template'] = $content;
};
