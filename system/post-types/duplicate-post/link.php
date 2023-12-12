<?php

/**
 * Archive screen - Row action
 */
add_filter('post_row_actions', function($actions, $post) use ($plugin){

  $link = $plugin->create_duplicate_post_action_link($post, 'archive');

  if ( ! empty($link) ) {
    $actions[ $plugin->duplicate_post_action_name ] = $link;
  }

  return $actions;

}, 10, 2);

/**
 * Single edit screen - Publish section
 */
add_action('post_submitbox_misc_actions', function() use ($plugin) {

  global $post;

  $link = $plugin->create_duplicate_post_action_link($post, 'single');

  if (empty($link)) return;

  ?>
  <div id="major-publishing-actions">
    <div id="export-action">
      <?php echo $link; ?>
    </div>
  </div>
  <?php

});

/**
 * Create action link
 */
$plugin->create_duplicate_post_action_link = function($post, $redirect_type = 'single') use ($plugin) {

  if (empty($post)
    || ! in_array( $post->post_type, $plugin->post_types_with_duplicate_action )
  ) return;

  $url = 'admin.php?'
    . 'action=' . $plugin->duplicate_post_action_name // Corresponds to "admin_action_" hook
    . '&post=' . $post->ID
    . '&nonce=' . wp_create_nonce( $plugin->duplicate_post_action_nonce_prefix . $post->ID )
    . '&redirect_type=' . $redirect_type // single or archive
  ;

  $title = __('Copy as new draft', 'tangible-loops-and-logic');

  return '<a href="' . esc_attr( $url ) . '"'
    . ' title="' . esc_attr( $title ) . '"'
    . ' rel="permalink"'
    . '>'
      . $title
    . '</a>'
  ;
};
