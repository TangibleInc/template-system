<?php
use tangible\template_system\paginator;

/**
 * Wrap dynamic fields
 */
$html->wrap_paginate_field = function( $name, $value ) {
  return '<span data-tangible-paginator-field="' . $name . '">' . $value . '</span>';
};

$html->add_open_tag('PaginateFields', function( $atts, $nodes ) use ( $loop, $html ) {

  $loop_context = $loop->get_previous();

  // Fields - These are wrapped in <span> to be dynamically rendered on paginator state change

  $fields_content = [];

  foreach ( [
    'current_page' => $loop_context->get_current_page(),
    'total_pages'  => $loop_context->get_total_pages(),
  ] as $key => $value ) {
    $fields_content[ $key ] = $html->wrap_paginate_field( $key, $value );
  }

  $target_id = isset( $loop_context->paginator_target_id )
    ? $loop_context->paginator_target_id
    : 0;

  // Pass target ID and action to frontend
  $atts['class']                                    = ( isset( $atts['class'] ) ? ( $atts['class'] . ' ' ) : '' )
    . 'tangible-paginator-fields tangible-paginator-subscribe--' . $target_id;
  $atts['data-tangible-paginator-subscribe-action'] = 'fields';

  $result = '';

  /**
   * Create paginated context for <Field> tag
   */
  $paginated_context = new \Tangible\Loop\BaseLoop([
    'query' => [ $fields_content ], // A loop with a single item
  ]);

  $paginated_context->loop(function() use ( $html, &$result, $atts, $nodes, $loop, $loop_context ) {
    $loop->last_context = $loop_context;
    $result             = $html->render_tag( 'div', $atts, $nodes );
  });

  paginator\enqueue();

  // Ensure last context is the same, in case PaginateLoading comes after
  $loop->last_context = $loop_context;

  return $result;
});
