<?php
/**
 * Regression: field=label on ACF choice fields returned empty because the
 * Field tag extracted the "field" attribute before the ACF integration saw
 * it (forum thread #1345). Skip-free: ACF is loaded in both harnesses.
 */
if ( ! function_exists( 'acf_add_local_field_group' ) ) {
  throw new \Exception( 'ACF must be loaded for the acf-choice-labels fixture' );
}

acf_add_local_field_group( [
  'key' => 'group_parity_choice',
  'title' => 'Parity Choice Fields',
  'fields' => [
    [
      'key' => 'field_parity_radio',
      'name' => 'parity_radio',
      'label' => 'Parity Radio',
      'type' => 'radio',
      'choices' => [ 'red' => 'Red Label', 'blue' => 'Blue Label' ],
    ],
    [
      'key' => 'field_parity_select',
      'name' => 'parity_select',
      'label' => 'Parity Select',
      'type' => 'select',
      'choices' => [ 'one' => 'Label One', 'two' => 'Label Two' ],
    ],
  ],
  'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ] ] ],
] );

$parity_acf_post = get_page_by_path( 'parity-acf-choice', OBJECT, 'post' );
if ( ! $parity_acf_post ) {
  $parity_acf_id = wp_insert_post( [
    'post_type' => 'post', 'post_status' => 'publish',
    'post_title' => 'Parity ACF Choice', 'post_name' => 'parity-acf-choice',
  ] );
  update_field( 'field_parity_radio', 'red', $parity_acf_id );
  update_field( 'field_parity_select', 'two', $parity_acf_id );
} else {
  $parity_acf_id = $parity_acf_post->ID;
}

tangible_template()->set_variable_type( 'variable', 'acf_post_id', (string) $parity_acf_id, [
  'render' => false, 'trim' => false,
] );
