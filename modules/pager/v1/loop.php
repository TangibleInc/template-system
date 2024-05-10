<?php
/**
 * Paginated loop
 *
 * - Create an element with unique target ID, used by <Paginate> for render target
 * - Pass loop attributes and content template to JavaScript
 *
 * @see /language/tags/loop
 */

$html->paginated_loop_tag = function( $current_loop, $atts, $nodes, $result ) use ( $html ) {

  // Create tag

  $current_loop->paginator_target_id = isset($atts['loop_id'])
    ? $atts['loop_id']
    : uniqid()
  ;
  $template_attributes               = $current_loop->args; // Processed attributes

  $context = [];
  if ( isset( $atts['variable_types'] ) ) {
    $context['variable_types'] = $atts['variable_types'];
    unset( $atts['variable_types'] );
  }

  // Passed to Loop tag via AJAX render - @see ../index.php, loop_tag()
  $template_attributes['paginator'] = true;

  // Support orderby=random by passing list of IDs
  if ( isset( $template_attributes['orderby'] )
    && $template_attributes['orderby'] === 'random'
  ) {
    $ids = [];
    foreach ( $current_loop->total_items as $item ) {
      $ids [] = $current_loop->get_item_field(
        $item, 'id'
      );
    }
    $template_attributes['include'] = implode( ',', $ids );
    unset( $template_attributes['orderby'] );
  }

  $template = [
    'tag'        => 'Loop',
    'attributes' => $template_attributes,
    'children'   => $nodes, // Inner content as template
  ];

  $tag_attributes = [
    'data-tangible-dynamic-module'        => 'paginator',
    'data-tangible-paginator-target-id'   => $current_loop->paginator_target_id,
    'data-tangible-paginator-target-data' => json_encode([
      'state'        => [
        'current_page'   => $current_loop->get_current_page(),
        'total_pages'    => $current_loop->get_total_pages(),
        'total_items'    => $current_loop->get_total_items_count(),
        'items_per_page' => $current_loop->get_items_per_page(),
      ],
      'template'     => $template,
      'hash'         => $html->create_tag_attributes_hash( $template_attributes ),
      'context'      => $context,
      'context_hash' => $html->create_tag_attributes_hash( $context ),
    ]),
  ];

  $tag_attributes['class'] = 'tangible-paginator-target tangible-dynamic-module' . (
    isset( $atts['class'] ) ? ' ' . $atts['class'] : ''
  );

  // Pass tag attributes explicitly
  foreach ( [ 'id' ] as $key ) {
    if (isset( $atts[ $key ] )) $tag_attributes[ $key ] = $atts[ $key ];
  }

  return $html->render_raw_tag( 'div', $tag_attributes, $result ); // Passing string, will not re-render
};
