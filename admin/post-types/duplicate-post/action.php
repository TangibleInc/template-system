<?php

namespace tangible\template_system;

add_action("admin_action_{$plugin->duplicate_post_action_name}",
  'tangible\\template_system\\admin_action_duplicate_post'
);

/**
 * Process admin action to duplicate current post
 *
 * Using named function here as a workaround for Query Monitor issue with
 * handling anonymous function's name in its redirect filter.
 */
function admin_action_duplicate_post() {

  $plugin = tangible_template_system();

  $nonce = $_REQUEST['nonce'];
  $post_id = isset($_GET['post']) ? intval($_GET['post']) : intval($_POST['post']);

  $redirect_type = isset($_GET['redirect_type'])
    ? sanitize_text_field( $_GET['redirect_type'] )
    : 'single'
  ;

  if ( ! wp_verify_nonce( $nonce, $plugin->duplicate_post_action_nonce_prefix . $post_id )
    || ! current_user_can('edit_pages')
  ) {
    exit;
  }

  // Duplicate post

  $post = get_post($post_id);

  $new_post_id = 0;

  $user = wp_get_current_user();
  $new_post_author = $user->ID;

  if (empty($post)) exit;

  // Create new post

  $new_post_id = wp_insert_post([
    'post_type'       => $post->post_type,
    'post_title'      => $post->post_title . ' (copy)',
    'post_status'     => 'draft',
    'post_content'    => $post->post_content,
    'post_parent'     => $post->post_parent,
    'menu_order'      => $post->menu_order,
    'post_author'     => $new_post_author,
  ]);

  // Failed - Redirect to archive

  if (empty($new_post_id)) {
    wp_safe_redirect(admin_url('edit.php?post_type=' . $post->post_type));
    exit;
  }

  // Taxonomy

  $taxonomies = get_object_taxonomies( $post->post_type );

  if (!empty($taxonomies) && is_array($taxonomies)) {

    foreach ($taxonomies as $taxonomy) {
      $post_terms = wp_get_object_terms($post_id, $taxonomy, array('fields' => 'slugs'));
      wp_set_object_terms($new_post_id, $post_terms, $taxonomy, false);
    }
  }

  // Post meta

  global $wpdb;

  $post_meta_infos = $wpdb->get_results(
    "SELECT meta_key, meta_value FROM $wpdb->postmeta WHERE post_id=$post_id"
  );

  if (count($post_meta_infos) != 0) {

    $sql_query = "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) ";
    $sql_query_sel = [];

    foreach ($post_meta_infos as $meta_info) {
      $meta_key = sanitize_text_field($meta_info->meta_key);
      $meta_value = addslashes($meta_info->meta_value);
      $sql_query_sel []= "SELECT $new_post_id, '$meta_key', '$meta_value'";
    }

    $sql_query .= implode(" UNION ALL ", $sql_query_sel);
    $wpdb->query($sql_query);
  }

  // Success

  if ($redirect_type==='archive') {
    // Archive
    wp_safe_redirect(admin_url('edit.php?post_type=' . $post->post_type));
    exit;
  }

  // Single edit screen by default
  wp_safe_redirect(admin_url('post.php?action=edit&post=' . $new_post_id));
  exit;
};
