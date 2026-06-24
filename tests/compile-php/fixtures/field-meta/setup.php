<?php
/**
 * One post with a custom field in a dedicated category. Idempotent.
 */
$parity_term = term_exists( 'compile-parity-meta', 'category' );
if ( ! $parity_term ) {
  $parity_term = wp_insert_term( 'Compile Parity Meta', 'category', [
    'slug' => 'compile-parity-meta',
  ] );
}
$parity_term_id = is_array( $parity_term ) ? (int) $parity_term['term_id'] : (int) $parity_term;

if ( ! get_page_by_path( 'parity-meta-post', OBJECT, 'post' ) ) {
  $parity_post_id = wp_insert_post( [
    'post_type' => 'post',
    'post_status' => 'publish',
    'post_title' => 'Parity Meta Post',
    'post_name' => 'parity-meta-post',
    'post_category' => [ $parity_term_id ],
  ] );
  update_post_meta( $parity_post_id, 'parity_color', 'teal' );
}
