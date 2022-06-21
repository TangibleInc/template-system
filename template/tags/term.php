<?php
/**
 * Term tag is a shortcut for current term field in a taxonomy term loop
 *
 * The following:
 *
 * ```html
 * <Taxonomy category><Term name /></Taxonomy>
 * ```
 *
 * ..is the same as:
 *
 * ```html
 * <Loop type=taxonomy_term taxonomy=category post=current><Field name /></Loop>
 * ```
 */

$html->taxonomy_term_tag = function( $atts ) use ( $html, $loop ) {

  if ( isset( $atts['field'] ) ) {
    $atts['name'] = $atts['field'];
    unset( $atts['field'] );
  }

  if ( isset( $atts['taxonomy'] ) ) {
    $taxonomy = $atts['taxonomy'];
    return $html->taxonomy_tag(
      [
        'name'  => $taxonomy,
        'count' => 1,
      ],
      [
        [
      'tag'        => 'Field',
      'attributes' => $atts,
        ],
      ]
    );
  }

  $taxonomy_term_loop = $loop->get_context( 'taxonomy_term' );
  if (empty( $taxonomy_term_loop )) return;

  // Set current loop context to taxonomy term loop
  $previous_context      = $loop->current_context;
  $loop->current_context = $taxonomy_term_loop;

  $value = $html->field_tag( $atts );

  // Restore loop context
  $loop->current_context = $previous_context;
  return $value;
};

return $html->taxonomy_term_tag;
