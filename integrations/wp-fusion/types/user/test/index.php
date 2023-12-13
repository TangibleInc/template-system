<?php

$template_system = tangible_template_system();
$plugin          = $template_system->get_integration( 'wp_fusion' );
if ( ! $plugin) return;

$loop  = tangible_loop();
$logic = tangible_logic();
$html  = tangible_template();

$tester = $template_system->tester();

$test = $tester->start( 'WP Fusion' );

$wp_fusion = wp_fusion();

$test('User', function( $it ) use ( $loop ) {

  $user_loop = $loop( 'user' );
  $exists    = $user_loop && $user_loop instanceof Tangible\Loop\UserLoop;

  $it( 'user loop is an instance of Tangible\Loop\UserLoop', $exists );

  if ( ! $exists) return; // Skip the rest

  $user = $user_loop->next();

    $is_wp_user = $user instanceof \WP_User;

  $it( 'user is an instance of WP_User', $is_wp_user );
});

// Tags

$test('Field wp_fusion_tags', function( $it ) use ( $loop, $plugin, $wp_fusion ) {

    $connected = $plugin->is_crm_connected();
    $it( 'Wp Fusion connected to a CRM', $connected );

    // set WP Fusion staging mode to true, in order to prevent push test user to CRM
    $staging_mode_original = $wp_fusion->settings->get( 'staging_mode' );
    $staging_mode_test     = ( $staging_mode_original ) ? : $wp_fusion->settings->set( 'staging_mode', 1 );

    // Test User ; login: LL_WPFusion_test_user
    $user    = get_user_by( 'login', 'LL_WPFusion_test_user' );
    $user_id = ( ! $user ) ? $plugin->create_test_user() : $user->ID;

    $user_loop = $loop( 'user', [ 'id' => $user_id ] );
  $user        = $user_loop->next();

  $tags        = $user_loop->get_field( 'wp_fusion_tags' );
    $test_tags = $plugin->get_test_tags();

  // tgbl()->see('tags', $tags);

  $it( 'returns an array', is_array( $tags ) && $connected );

  $tag = array_shift( $tags );
  $it( 'returns an array of tag IDs', is_integer( $tag ) || is_string( $tag ) );

    $test_tags_a = [];
  foreach ( $test_tags as $t ) {
      $test_tags_a[ $t ] = $t;
  }

  $correct                     = true;
  if (empty( $tags )) $correct = false;
  foreach ( $tags as $t ) {
    if ( ! isset( $test_tags_a[ $t ] ) ) $correct = false;
  }

    $it( 'returns correct tags applied to User', $correct );

  // remove test user
    $user_deleted = $plugin->delete_test_user( $user_id );

    // set WP Fusion staging mode back to original
    $wp_fusion->settings->set( 'staging_mode', $staging_mode_original );
});

// Access

$test('Field wp_fusion_access', function( $it ) use ( $loop ) {

  $user_loop = $loop( 'user' );
  $user      = $user_loop->next();

  $access = $user_loop->get_field( 'wp_fusion_access' );

  // tgbl()->see('access', $tags);

  $it( 'returns true or false', is_bool( $access ) );

  $it( 'returns true when user has access', $access == true );
});


require_once __DIR__ . '/logic/index.php';

$test->report();
