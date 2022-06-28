<?php

use Tangible\Loop\UserLoop;

$test('User loop', function( $it ) {

  $class_name = 'Tangible\\Loop\\UserLoop';

  $it( 'exists', class_exists( $class_name ) );

  // Get pages because the site doesn't have posts yet

  $user_loop = new UserLoop([
    'id' => 'current',
  ]);

  $it( 'instantiates', is_a( $user_loop, $class_name ) );

  $it( 'has_next', $user_loop->has_next() === true );

  $item = $user_loop->next();

  $it( 'next returns an instance of WP_User', is_a( $item, 'WP_User' ) );

  $value    = $user_loop->get_field( 'id' );
  $expected = $item->ID;

  $it( 'get_field', $value === $expected );

  $value = $user_loop->get_item_field( $item, 'id' );

  $it( 'get_item_field', $value === $expected );

  $it( 'current user', $value === get_current_user_id() );

});
