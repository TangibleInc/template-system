<?php
use tangible\see;

// Tags

$test('User logic: tags', function( $it ) use ( $plugin, $loop, $html ) {

  $user_loop = $loop( 'user' );
  $user      = $user_loop->next();

  $tags = $user_loop->get_field( 'wp_fusion_tags' );

  $tag_id = 123;

  $check = $html->if([
    'user_field' => 'wp_fusion_tags',
    'compare'    => 'includes',
    'value'      => $tag_id,
    'debug'      => false, // @see vendor/tangible/template/tags/if/parse.php
  ]);

  $correct = in_array( $tag_id, $tags );

  if ( ! $it( 'user field wp_fusion_tags includes tag', $correct === $check ) ) {
    tangible\see( 'expected', $correct, 'got', $check );
  }
});

// Access

$test('User logic: access', function( $it ) use ( $plugin, $loop, $html ) {

  $user_loop = $loop( 'user' );
  $user      = $user_loop->next();

  $access = $user_loop->get_field( 'wp_fusion_access' );

  $check = $html->if([
    'user_field' => 'wp_fusion_access',
  ]);

  $correct = $plugin->user_can_access_current_post();

  $user_id = get_current_user_id();

  if ( empty( $user_id ) ) {
    $it( 'PLEASE LOGIN (user field wp_fusion_access) ', false );
  } else {
    $it( 'user field wp_fusion_access', $correct == $check );
  }

});
