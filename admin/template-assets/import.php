<?php

/**
 * Import template asset
 *
 * Asset data in second argument is expected to be text or binary, decoded from base64 already.
 *
 * Used in ../import-export/import.php
 *
 * References:
 * - [Base64 Image to Wordpress Uploads directory](https://gist.github.com/tjhole/3ddfc6cbf6da01c7ce0f)
 * - [Attachment metadata](https://wordpress.stackexchange.com/questions/125805/auto-add-image-title-caption-alt-text-description-while-uploading-images-in-word#answer-212390)
 */
$plugin->import_template_asset = function($asset, $asset_data) {

  if (empty($asset['filename'])) return;

  $filename = $asset['filename'];

  // Create temporary file

  if ( ! function_exists( 'wp_tempnam' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
  }

  $temporary_filepath = wp_tempnam( $filename );

  // Returns number of bytes saved, or false on failure
  $tmp_result = file_put_contents($temporary_filepath, $asset_data);

  if ($tmp_result===false) {

    // TODO: Keep track of failed imports and report to user

    return;
  }

  $upload_dir       = wp_upload_dir();
  $upload_path      = str_replace( '/', DIRECTORY_SEPARATOR, $upload_dir['path'] ) . DIRECTORY_SEPARATOR;

  /**
   * "Side load" the file into media library
   *
   * @see https://developer.wordpress.org/reference/functions/wp_handle_sideload/
   */
  if( !function_exists( 'wp_handle_sideload' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
  }

  $file = [
    'error' => '',
    'tmp_name' => $temporary_filepath,
    'name' => $filename,
    'type' => $asset['mime'],
    'size' => filesize($temporary_filepath),
  ];

  $file_result = wp_handle_sideload($file, [
    'test_form' => false // ?
  ]);

  if (!empty($file_result['error'])
    || empty($file_result['file'])
  ) {
    return;
  }

  $attachment_file_path = $file_result['file'];

  $attachment = [
    'post_mime_type' => $asset['mime'],
    'post_title'     => $asset['title'],
    'post_excerpt'   => $asset['caption'],
    'post_content'   => $asset['description'],
    'post_status'    => 'publish',
    'guid'           => $upload_dir['url'] . '/' . basename($attachment_file_path)
  ];

  if (!empty($asset['universal_id'])) {
    // Check for duplicate
    $posts = get_posts([
      'post_type'      => 'attachment',
      'posts_per_page' => 1,
      'fields'         => 'ids',
      'post_status'    => 'any',
      'meta_key'       => 'universal_id',
      'meta_value'     => $asset['universal_id'],
    ]);

    // Overwrite
    if ( ! empty( $posts ) ) {
      $attachment['ID'] = $posts[0];
    }
  }

  $attachment_id = wp_insert_attachment($attachment, $attachment_file_path);

  if (empty($attachment_id)) return;

  // Alternative text
  if (!empty($asset['alt'])) {
    update_post_meta($attachment_id, '_wp_attachment_image_alt', $asset['alt']);
  }

  if (!function_exists('wp_generate_attachment_metadata')) {
    require_once(ABSPATH . 'wp-admin/includes/image.php');
  }

  $metadata = wp_generate_attachment_metadata($attachment_id, $attachment_file_path);

  wp_update_attachment_metadata($attachment_id, $metadata);

  // TODO: Assign universal ID to attachment

  return $attachment_id;
};
