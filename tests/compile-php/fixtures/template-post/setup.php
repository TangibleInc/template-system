<?php
/**
 * A template post rendered by name from the fixture template, receiving a
 * local variable through tag attributes. Idempotent.
 */
if ( ! get_page_by_path( 'compile-parity-partial', OBJECT, 'tangible_template' ) ) {
  // Tests run without a privileged user, so kses would strip template tags
  kses_remove_filters();
  wp_insert_post( [
    'post_type' => 'tangible_template',
    'post_status' => 'publish',
    'post_title' => 'Compile Parity Partial',
    'post_name' => 'compile-parity-partial',
    'post_content' => 'From partial: <Get local=msg />',
  ] );
  kses_init_filters();
}
