<?php
/**
 * Plugin Name: E2E
 * Description: Prepare end-to-end test environment
 */

/**
 * Workaround for PHP 8 compatibility issue with post_submit_meta_box() in
 * metabox "submitdiv". It emits a warning "strtotime(): Epoch doesn't fit
 * in a PHP integer".
 */
add_action( 'do_meta_boxes', function($post_type, $context, $post ) {
  global $wp_meta_boxes;
  $page = get_current_screen()->id;

  if ($context==='side' && isset( $wp_meta_boxes[ $page ][ $context ]['core']['submitdiv'] )) {
    $box = &$wp_meta_boxes[ $page ][ $context ]['core']['submitdiv'];
    if (!is_array($box)) return; // Can be false
    $callback = $box['callback'];
    $box['callback'] = function($data_object) use ($box, $callback) {
      @call_user_func( $callback, $data_object, $box );
    };  
  }
}, 0, 3);
