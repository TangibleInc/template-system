<?php
namespace Tangible\Loop;

use tangible\format;

$loop->get_attachment_field = function( $attachment, $field_name, $args = [] ) use ( $loop ) {

  if ( is_numeric( $attachment ) ) {

    // get_attachment_field( $id, .. )

    $attachment = get_post( $attachment );

  } elseif ( is_string( $attachment ) ) {

    // get_attachment_field( $field_name, $args )

    $attachment = null;
    $args       = $field_name;
    $field_name = $attachment;
  }

  if (empty( $attachment )) $attachment = get_post(); // Current attachment?
  if (empty( $attachment ) || empty( $attachment->ID ) || $attachment->post_type !== 'attachment') return '';

  $id = $attachment->ID;

  // Check if extended field
  $value = $loop->get_filtered_field( 'attachment', $attachment, $field_name, $args );
  if ( ! is_null( $value )) return $value;

  if ( isset( $args['custom'] ) && $args['custom'] === 'true' ) {
    return get_post_meta( $id, $field_name, true );
  }

  // https://developer.wordpress.org/reference/functions/wp_get_attachment_metadata/

  switch ( $field_name ) {
    case 'all':
      $defined_fields = [];
      foreach ( AttachmentLoop::$config['fields'] as $key => $config ) {
        if ($key === 'all' || substr( $key, -2 ) === '_*') continue;
        $defined_fields[ $key ] = $loop->get_attachment_field( $attachment, $key, $args );
      }

      ob_start();
      ?><pre><code><?php
      print_r( $defined_fields );
?></code></pre><?php
      $value = ob_get_clean();
        break;
    case 'id':
      $value = $id;
        break;
    case 'name':
      $value = $attachment->post_name;
        break;
    case 'title':
      $value = $attachment->post_title;
        break;
    case 'caption':
      $value = $attachment->post_excerpt;
        break;
    case 'description':
      $value = $attachment->post_content;
        break;
    case 'status':
      $value = $attachment->post_status;
        break;
    case 'type':
    case 'mime':
      $value = $attachment->post_mime_type;
        break;
    case 'alt':
      $value = get_post_meta( $id, '_wp_attachment_image_alt', true );
        break;
    case 'url':
      if ( isset( $args['size'] ) ) {

        $image_size = $args['size'];
        $sources    = wp_get_attachment_image_src( $id, $image_size );
        if ( isset( $sources[0] ) ) {
          $value = $sources[0];
        }
      } else {
        // Full size
        $value = wp_get_attachment_url( $id );
      }

        break;
    case 'filename':
      $value = basename( wp_get_attachment_url( $id ) );
        break;
    case 'extension':
      $value = pathinfo( wp_get_attachment_url( $id ), PATHINFO_EXTENSION );
        break;
    case 'size':
      $metadata = wp_get_attachment_metadata( $id );
      if (isset( $metadata['filesize'] )) return $metadata['filesize'];
      if ( ! isset( $metadata['file'] )) return;

      $upload_dir      = wp_upload_dir();
      $upload_base_dir = $upload_dir['basedir'];
      $size            = filesize( $upload_base_dir . '/' . $metadata['file'] );

      if (isset( $args['raw'] )) return $size;

      if ( $size >= 1 << 30 )
        return number_format( $size / ( 1 << 30 ), 2 ) . ' GB';
      if ( $size >= 1 << 20 )
        return number_format( $size / ( 1 << 20 ), 2 ) . ' MB';
      if ( $size >= 1 << 10 )
        return number_format( $size / ( 1 << 10 ), 2 ) . ' KB';

        return number_format( $size ) . ' bytes';
    break;

    case 'srcset':
      // @see https://developer.wordpress.org/reference/functions/wp_get_attachment_image_srcset/

      $image_size = isset( $args['size'] ) ? $args['size'] : 'medium';

      if ( strpos( $image_size, ',' ) !== false ) {
        // array of width and height
        $image_size = array_map(function( $size ) {
          return (int) $size;
        }, format\multiple_values($image_size));
      }

      $value                       = wp_get_attachment_image_srcset( $id, $image_size );
      if ($value === false) $value = '';
        break;
    case 'sizes':
      // @see https://developer.wordpress.org/reference/functions/wp_get_attachment_image_sizes/

      $image_size = isset( $args['size'] ) ? $args['size'] : 'medium';

      if ( strpos( $image_size, ',' ) !== false ) {
        // array of width and height
        $image_size = array_map(function( $size ) {
          return (int) $size;
        }, format\multiple_values($image_size));
      }

      $value                       = wp_get_attachment_image_sizes( $id, $image_size );
      if ($value === false) $value = '';
        break;
    case 'image':
      $url              = $loop->get_attachment_field( $attachment, 'url', $args );
      $image_attributes = [
        'src' => $url,
      ];

      // Allowed image attributes

      foreach ( [
        'id',
        'class',
        'width',
        'height',
        'alt',
      ] as $key ) {
        if ( ! isset( $args[ $key ] )) continue;
        $image_attributes[ $key ] = $args[ $key ];
      }

      $value = tangible_template()->render_tag( 'img', $image_attributes );

        break;
    default:
      $value = $loop->get_post_field( $attachment, $field_name, $args );
        break;
  }

  return $value;
};
