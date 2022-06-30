<?php

require_once __DIR__ . '/functions/index.php';

$loop->add_field_filter('user', function( $user, $field_name, $args ) use ( $plugin ) {

  switch ( $field_name ) {

    case 'wp_fusion_tags':
        return $plugin->get_tags_for_user( $user );

    case 'wp_fusion_access':
        return $plugin->user_can_access_current_post( $user );

  }

  // Return nothing for unknown fields
});
