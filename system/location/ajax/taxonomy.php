<?php
use tangible\ajax;

/**
 * Get taxonomies
 */
ajax\add_action("{$prefix}get_taxonomies", function( $data ) {

  // @see https://developer.wordpress.org/reference/functions/get_taxonomies

  $taxonomies = get_taxonomies([
    'public' => true,
  ], 'objects');

  $options = [
    // { label, value }
  ];

  foreach ( $taxonomies as $name => $taxonomy ) {
    $options [] = [
      /**
       * NOTE: It's necessary to append the slug to label, because there can be
       * multiple taxonomies called "Category", "Tag", etc.
       *
       * Possible better solution: Create option groups for each post type?
       */
      'label' => $taxonomy->labels->singular_name
        . ' (' . $name . ')',
      'value' => $name,
    ];
  }

  return $options;
});


/**
 * Get taxonomy items
 */
ajax\add_action("{$prefix}get_taxonomy_items", function( $data ) {

  if (empty( $data['taxonomy'] )) return ajax\error([
    'message' => 'Property "taxonomy" is required',
  ]);

  $taxonomy = $data['taxonomy'];

  $query = new \WP_Term_Query([
    'taxonomy'   => $taxonomy,
    'hide_empty' => false,
  ]);

  $terms = $query->get_terms();

  $options = [
    // { label, value }
  ];

  foreach ( $terms as $term ) {
    $options [] = [
      'label' => $term->name,
      'value' => $term->term_id,
    ];
  }

  return $options;
});
