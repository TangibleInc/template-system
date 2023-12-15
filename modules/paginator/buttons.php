<?php
use tangible\template_system\paginator;

$html->add_open_tag('PaginateButtons', function( $atts, $nodes ) use ( $loop, $html ) {

  $loop_context = $loop->get_previous();

  // Return empty if loop has no pagination
  if ($loop_context->get_total_pages() <= 1) return;

  $atts['class'] = 'tangible-paginator-buttons' . (
    isset( $atts['class'] ) ? ' ' . $atts['class'] : ''
  );

  $target_id = isset( $loop_context->paginator_target_id )
    ? $loop_context->paginator_target_id
    : 0;

  // Pass target ID and action to frontend
  $atts['class']                                   .= ' tangible-paginator-subscribe--' . $target_id;
  $atts['data-tangible-paginator-subscribe-action'] = 'buttons';

  $settings = [
    'scroll_top'     => isset( $atts['scroll_top'] ) || (
      isset( $atts['keys'] ) && in_array( 'scroll_top', $atts['keys'] )
    ),
    'scroll_animate' => true, // true/false or duration in milliseconds
  ];

  if ( isset( $atts['scroll_animate'] ) ) {
    if ( $atts['scroll_animate'] === 'false' ) {
      $settings['scroll_animate'] = false;
    } elseif ( is_numeric( $atts['scroll_animate'] ) ) {
      $settings['scroll_animate'] = intval( $atts['scroll_animate'] );
    }
  }

  $atts['data-tangible-paginator-subscribe-settings'] =
    esc_attr( json_encode( $settings ) );

  $result = $html->render_tag( 'div', $atts, $nodes );

  paginator\enqueue();

  return $result;
});
