<?php

/**
 * <PaginateLoading> for content to show when loading
 */
$html->add_open_tag('PaginateLoading', function( $atts, $nodes ) use ( $loop, $html ) {

  // Target loop ID can refer to a loop created before/after this element
  if (isset($atts['loop_id'])) {

    $target_id = $atts['loop_id'];

  } else {

    $loop_context = $loop->get_previous();
    $target_id = isset( $loop_context->paginator_target_id )
      ? $loop_context->paginator_target_id
      : 0;
  }

  $tag = isset( $atts['tag'] ) ? $atts['tag'] : 'div';

  $atts['class']                                    = ( isset( $atts['class'] ) ? ( $atts['class'] . ' ' ) : '' )
    . 'tangible-paginator-loading tangible-paginator-subscribe--' . $target_id;
  $atts['data-tangible-paginator-subscribe-action'] = 'loading';
  $atts['style']                                    = 'display: none !important';

  return $html->render_tag( $tag, $atts, $nodes );
});
