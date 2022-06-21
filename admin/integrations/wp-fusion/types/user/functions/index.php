<?php

/**
 * Tags
 *
 * @see https://wpfusion.com/documentation/advanced-developer-tutorials/wp-fusion-user-class/
 */

$plugin->get_tags_for_user = function( $user = null ) use ( $wp_fusion ) {

  if (empty( $user )) $user = wp_get_current_user();
  if ( ! $user->ID ) return [];

    /**
     * Some CRM's keep tag's as tag IDs array in user meta table, eg Convertkit
     * To make sure to have tag names we need to get tag labels array from setting's available tags array
     */
  $tags_raw         = $wp_fusion->user->get_tags( $user->ID );
    $available_tags = $wp_fusion->settings->get( 'available_tags' );
  $tags             = [];
  foreach ( $tags_raw as $t ) {
      if ( ! isset( $available_tags[ $t ] ) ) continue;
      $tags[] = $available_tags[ $t ];
  }

  // tgbl()->see( 'tags', $tags );

    return $tags;
};


$plugin->user_has_tag = function( $tag, $user = null ) use ( $wp_fusion ) {

  if (empty( $user )) $user = wp_get_current_user();
  if ( ! $user->ID ) return false;

  return $wp_fusion->access->has_tag( $tag, $user->ID );
};

/**
 * Access
 *
 * @see https://wpfusion.com/documentation/functions/user_can_access/
 */

$plugin->user_can_access = function( $post = null, $user = null ) use ( $wp_fusion ) {

  if (empty( $user )) $user = wp_get_current_user();

  if (empty( $post )) $post = get_post();
  if (empty( $post )) return true; // No current post - OK

  return $wp_fusion->access->user_can_access( $post->ID, $user->ID );
};

$plugin->user_can_access_current_post = function( $user = null ) use ( $plugin ) {
  return $plugin->user_can_access( null, $user );
};


/**
 * Check if CRM is connected
 *
 * @return bool
 */
$plugin->is_crm_connected = function() use ( $wp_fusion ) {
    return $wp_fusion->settings->get( 'crm' ) && $wp_fusion->settings->get( 'connection_configured' );
};

/**
 * Get CRM slug
 *
 * @return string $slug
 */
$plugin->get_crm_slug = function() use ( $plugin, $wp_fusion ) {

    $slug = '';
    if ( ! $plugin->is_crm_connected() ) return $slug;
    $slug = $wp_fusion->settings->get( 'crm' );

    return $slug;
};

/**
 * Get test tags
 *
 * @return array $test_tags
 */
$plugin->get_test_tags = function() {
    $test_tags =
        [
            'TLL_Test_Tag_1',
            'TLL_Test_Tag_2',
            'TLL_Test_Tag_3',
        ];
    return $test_tags;
};

/**
 * Create an user for testing purposes
 *
 * @return int $user_id
 */
$plugin->create_test_user = function() use ( $plugin, $wp_fusion ) {

    $user_id = wp_create_user( 'L&L_WPFusion_test_user', 'ltrVzEp!@(Avk(r*0%at(4%T', 'testuser@example.com' );

    // update user meta with test tags
    $test_tags = $plugin->get_test_tags();
    $crm_slug  = $plugin->get_crm_slug();
    update_user_meta( $user_id, $crm_slug . '_tags', $test_tags );

    // add test tags to available tags option
    $test_tags_a = [];
  foreach ( $test_tags as $t ) {
      $test_tags_a[ $t ] = $t;
  }
    $available_tags = array_merge( $wp_fusion->settings->get( 'available_tags' ), $test_tags_a );
    $wp_fusion->settings->set( 'available_tags', $available_tags );

    return $user_id;
};


/**
 * Delete test user
 *
 * @return bool
 */
$plugin->delete_test_user = function( $user_id = null ) use ( $plugin, $wp_fusion ) {

    if ( ! $user_id ) return false;

    require_once ABSPATH . 'wp-admin/includes/user.php';
    $deleted = wp_delete_user( $user_id );

    // remove test tags from available tags
    $test_tags   = $plugin->get_test_tags();
    $test_tags_a = [];
  foreach ( $test_tags as $t ) {
      $test_tags_a[ $t ] = $t;
  }
    $available_tags = array_diff( $wp_fusion->settings->get( 'available_tags' ), $test_tags_a );
    $wp_fusion->settings->set( 'available_tags', $available_tags );

    return $deleted;
};


