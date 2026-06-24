<?php
/**
 * Three posts in a dedicated category so the fixture is isolated from
 * posts created by other fixtures or tests. Idempotent.
 */
$parity_term = term_exists( 'compile-parity-posts', 'category' );
if ( ! $parity_term ) {
  $parity_term = wp_insert_term( 'Compile Parity Posts', 'category', [
    'slug' => 'compile-parity-posts',
  ] );
}
$parity_term_id = is_array( $parity_term ) ? (int) $parity_term['term_id'] : (int) $parity_term;

foreach ( [ 'Parity Post A', 'Parity Post B', 'Parity Post C' ] as $parity_title ) {
  $parity_slug = sanitize_title( $parity_title );
  if ( ! get_page_by_path( $parity_slug, OBJECT, 'post' ) ) {
    wp_insert_post( [
      'post_type' => 'post',
      'post_status' => 'publish',
      'post_title' => $parity_title,
      'post_name' => $parity_slug,
      'post_category' => [ $parity_term_id ],
    ] );
  }
}
