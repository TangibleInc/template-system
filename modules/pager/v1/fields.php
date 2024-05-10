<?php
use tangible\template_system\paginator;

/**
 * Wrap dynamic fields
 */
$html->wrap_paginate_field = function( $name, $value ) {
  return '<span data-tangible-paginator-field="' . $name . '">' . $value . '</span>';
};

$html->add_open_tag('PaginateFields', function( $atts, $nodes ) use ( $loop, $html ) {

  // Target loop ID can refer to a loop created before/after this element
  if (isset($atts['loop_id'])) {

    $target_id = $atts['loop_id'];
    $loop_context = null; // Doesn't exist yet

  } else {

    // Loop before fields

    $loop_context = $loop->get_previous();

    $target_id = isset( $loop_context->paginator_target_id )
      ? $loop_context->paginator_target_id
      : 0
    ;
  }

  $has_loop_context = !empty($loop_context);

  // Fields - These are wrapped in <span> to be dynamically rendered on paginator state change

  $fields_content = [];

  foreach ( [
    'current_page' => !$has_loop_context ? 1 : $loop_context->get_current_page(),
    'total_pages'  => !$has_loop_context ? '' : $loop_context->get_total_pages(),
  ] as $key => $value ) {
    $fields_content[ $key ] = $html->wrap_paginate_field( $key, $value );
  }

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
