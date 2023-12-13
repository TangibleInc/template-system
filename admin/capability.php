<?php
namespace tangible\template_system;

/**
 * Admins without `unfiltered_html` capability cannot edit template post types
 * 
 * - On multisite intalls, by default only network admins have this capability, not subsite admins
 * - Show admin menu, template editor (Gutenberg, Elementor, Beaver), and edit screens to only allowed admins
 * 
 * The plan is to implement more detailed access control settings in Template
 * System Pro module.
 * 
 * @see ./menu.php
 * @see /system/interations/gutenberg/enqueue
 * @see /system/interations/elementor/template-editor-widget
 * @see /system/interations/beaver/modules/tangible-template
 */

function can_user_edit_template($id = 0) {
  if ($id === 0) {
    $id = get_current_user_id();
  }
  return user_can( $id, 'manage_options' )
    && user_can( $id, 'unfiltered_html' )
  ;
}

add_action('load-post.php', function() use ($plugin) {

  $id = (int) ($_GET['post'] ?? $_POST['post_ID'] ?? 0);

  if (in_array(
    get_post_type( $id ),
    $plugin->template_post_types
  ) && !current_user_can( 'unfiltered_html' )) {
    wp_die( __( 'Sorry, you are not allowed to edit this item.' ) );
  }
});

add_action('load-post-new.php', function() use ($plugin) {

  $type = $_GET['post_type'] ?? '';

  if (in_array(
    $type,
    $plugin->template_post_types
  ) && !current_user_can( 'unfiltered_html' )) {
    wp_die( __( 'Sorry, you are not allowed to create this item.' ) );
  }
});
