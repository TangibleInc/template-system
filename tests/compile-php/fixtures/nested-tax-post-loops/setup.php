<?php
/**
 * Two categories with posts, for the nested taxonomy->post loop pattern
 * from the how-to guides. Idempotent.
 */
$parity_cats = [
  'parity-cat-a' => [ 'Parity Cat A', [ 'Parity NP One', 'Parity NP Two' ] ],
  'parity-cat-b' => [ 'Parity Cat B', [ 'Parity NP Three' ] ],
];
foreach ( $parity_cats as $parity_slug => [ $parity_title, $parity_posts ] ) {
  $parity_term = term_exists( $parity_slug, 'category' );
  if ( ! $parity_term ) {
    $parity_term = wp_insert_term( $parity_title, 'category', [ 'slug' => $parity_slug ] );
  }
  $parity_term_id = is_array( $parity_term ) ? (int) $parity_term['term_id'] : (int) $parity_term;
  foreach ( $parity_posts as $parity_post_title ) {
    $parity_post_slug = sanitize_title( $parity_post_title );
    if ( ! get_page_by_path( $parity_post_slug, OBJECT, 'post' ) ) {
      wp_insert_post( [
        'post_type' => 'post',
        'post_status' => 'publish',
        'post_title' => $parity_post_title,
        'post_name' => $parity_post_slug,
        'post_category' => [ $parity_term_id ],
      ] );
    }
  }
}
