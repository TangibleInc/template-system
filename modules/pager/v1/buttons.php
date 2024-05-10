<?php
use tangible\template_system\paginator;

$html->add_open_tag('PaginateButtons', function( $atts, $nodes ) use ( $loop, $html ) {

  // Target loop ID can refer to a loop created before/after this element
  if (isset($atts['loop_id'])) {

    $target_id = $atts['loop_id'];

  } else {

    // Loop before pagination

    $loop_context = $loop->get_previous();

    // Return empty if loop has no pagination
    if ($loop_context->get_total_pages() <= 1) return;

    $target_id = isset( $loop_context->paginator_target_id )
    ? $loop_context->paginator_target_id
    : 0;
  }

  // Tag attributes for the wrapper div
  $tag_atts = [];

  $tag_atts['class'] = 'tangible-paginator-buttons' . (
    isset( $atts['class'] ) ? ' ' . $atts['class'] : ''
  );

  // Pass target ID and action to frontend
  $tag_atts['class']                                   .= ' tangible-paginator-subscribe--' . $target_id;
  $tag_atts['data-tangible-paginator-subscribe-action'] = 'buttons';

  $settings = [
    'scroll_top' => isset($atts['scroll_top']) ||
      in_array('scroll_top', $atts['keys'] ?? [])
    ,
    'scroll_animate' => true, // true/false or duration in milliseconds
  ];

  if (!empty($atts['first_last'] ?? in_array('first_last', $atts['keys'] ?? []))) {
    $settings['first'] = true;
    $settings['last'] = true;
  }
  if (!empty($atts['prev_next'] ?? in_array('prev_next', $atts['keys'] ?? []))) {
    $settings['prev'] = true;
    $settings['next'] = true;
  }

  foreach ([
    'first',
    'last',
    'prev',
    'next'
  ] as $key) {
    if (isset($atts[$key])) {
      $settings[$key] = $atts[$key];
    }
  }

  if ( isset( $atts['scroll_animate'] ) ) {
    if ( $atts['scroll_animate'] === 'false' ) {
      $settings['scroll_animate'] = false;
    } elseif ( is_numeric( $atts['scroll_animate'] ) ) {
      $settings['scroll_animate'] = intval( $atts['scroll_animate'] );
    }
  }

  $tag_atts['data-tangible-paginator-subscribe-settings'] =
    esc_attr( json_encode( $settings ) );

  $result = $html->render_tag( 'div', $tag_atts, $nodes );

  paginator\enqueue();

  return $result;
});
