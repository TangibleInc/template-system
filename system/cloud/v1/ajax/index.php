<?php

if ( ! is_admin()) return;

require_once __DIR__ . '/post-process.php';

/**
 * Store URL - Can be changed temporarily for local development
 */
$plugin->TANGIBLE_STORE_URL = 'https://tangibleplugins.com';

$plugin->TANGIBLE_STORE_API_BLOCKS_ENDPOINT =
  $plugin->TANGIBLE_STORE_URL . '/' . 'wp-json/edd-api-tangible/v1/available-blocks';

/**
 * AJAX action prefix must be the same as in: /assets/src/template-cloud
 */
$prefix = 'tangible_blocks__template_cloud__';

$ajax->add_action("{$prefix}catalog", function( $data ) use ( $ajax, $plugin ) {

  if ( ! current_user_can( 'manage_options' )) return $ajax->error( 'Must be admin user' );

  $url = $plugin->TANGIBLE_STORE_API_BLOCKS_ENDPOINT . '?' . http_build_query( $data );

  // @see https://developer.wordpress.org/reference/functions/wp_remote_get/
  $options = [
    'headers' => [
      'Content-Type' => 'application/json',
    ],
  ];

  $response = wp_remote_get( $url, $options );

  if ( is_wp_error( $response ) ) {
    return [
      'products' => [],
      'error'    => $response->get_error_message(), // https://developer.wordpress.org/reference/classes/wp_error/
    ];
  } else {
    try {
      $json = json_decode( $response['body'] );
    } catch ( Exception $ex ) {
      return [
        'products' => [],
      ];
    }
  }

  return $plugin->post_process_block_downloads( $json );
});

$ajax->add_action("{$prefix}json", function( $data ) use ( $ajax, $plugin ) {

  if ( ! current_user_can( 'manage_options' )) return $ajax->error( 'Must be admin user' );
  if (empty( $data['file'] )) return $ajax->error( 'No file supplied' );

  return json_decode( file_get_contents( $data['file'] ) );
});
