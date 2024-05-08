<?php
namespace tangible\api;
use tangible\api;

/**
 * Get current user IP.
 */
function get_ip() {
  return ! empty( $_SERVER['REMOTE_ADDR'] ) ? $_SERVER['REMOTE_ADDR'] : 'Unknown';
}

/**
 * Get plugin settings array.
 */
function get_db_settings() {
  return get_option( 'jwt_auth_rest_api_settings' );
}

/**
 * Get the auth key.
 */
function get_auth_key() {
  return SECURE_AUTH_KEY;
}

/**
 * Get CORS enabled/disabled
 */
function get_cors() {

  // if ( defined( 'JWT_AUTH_REST_API_CORS_ENABLE' ) ) {
  //   return JWT_AUTH_REST_API_CORS_ENABLE;
  // } else {
  //   $settings = api\get_db_settings();
  //   if ( $settings ) {
  //     return $settings['enable_cors'];
  //   }
  // }

  return false;
}
