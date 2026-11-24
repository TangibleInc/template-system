<?php
/**
 * Array and object values print as JSON with markup characters escaped.
 * Tags reading the JSON back get the original value
 *
 * @see json_encode_escape_tags() language/utils/json.php
 *
 * Runs before each render pass, so the post is created once and reused
 */
$json_post = get_page_by_path( 'parity-json-escape', OBJECT, 'post' );

if ( empty( $json_post ) ) {
  $json_post = get_post(
    wp_insert_post( [
      'post_title'  => 'Parity JSON Escape',
      'post_name'   => 'parity-json-escape',
      'post_status' => 'publish',
    ]
  ) );
}

// Holds each character escaped in JSON output: < > " & '
$json_payload = '<b class="x">one & two\'s</b>';

update_post_meta( $json_post->ID, 'parity_list_field', [ [ 'name' => $json_payload ] ] );
update_post_meta( $json_post->ID, 'parity_map_field', [ 'label' => $json_payload ] );
update_post_meta( $json_post->ID, 'parity_string_list_field', [ $json_payload, 'two' ] );
