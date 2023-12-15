<?php
/**
 * Taxonomy tag is a shortcut for current post's taxonomy term loop
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
 *
 * A shortcut to get a single taxonomy term field:
 *
 * ```html
 * <Taxonomy category field=name />
 * ```
 *
 * ..is equivalent to:
 *
 * ```html
 * <Term name taxonomy=category />
 * ```
 */
$html->taxonomy_tag = function( $atts, $nodes ) use ( $html ) {

  $taxonomy = '';

  if ( isset( $atts['keys'] ) && isset( $atts['keys'][0] ) ) {
    $taxonomy = array_shift( $atts['keys'] );
  } elseif ( isset( $atts['name'] ) ) {
    $taxonomy = $atts['name'];
    unset( $atts['name'] );
  }
  if (empty( $taxonomy )) return;

  if ( isset( $atts['field'] ) ) {
    // Single term field
    $atts['count'] = 1;
    $nodes         = [
      [
    'tag'        => 'Field',
    'attributes' => [
        'keys' => [ $atts['field'] ],
      ],
      ],
    ];
  }

  $atts['type']     = 'taxonomy_term';
  $atts['taxonomy'] = $taxonomy;
  $atts['post']     = 'current';

  return $html->loop_tag( $atts, $nodes );
};

return $html->taxonomy_tag;
