<?php

namespace Tangible\Loop;

// @see https://developer.wordpress.org/reference/classes/wp_user/

$loop->get_user_field = function( $user, $field_name = '', $args = [] ) use ( $loop ) {

  if ( is_numeric( $user ) ) {

    // get_user_field( $id, .. )

    $user = get_userdata( $user );

  } elseif ( is_string( $user ) ) {

    // get_user_field( $field_name, $args )

    $field_name = $user;
    $args       = empty( $field_name ) ? [] : $field_name;
    $user       = null;
  }

  if (empty( $user )) $user = wp_get_current_user(); // Current user
  if (empty( $user ) || ! isset( $user->ID ) || $user->ID === 0) return;

  $id    = $user->ID;
  $value = $loop->get_filtered_field( 'user', $user, $field_name, $args );
  if ( ! is_null( $value )) return $value;

  if ( isset( $args['custom'] ) && $args['custom'] ) {
    return $user->get( $field_name );
  }

  switch ( $field_name ) {

    // For dev purpose: all user fields
    case 'all':
      $defined_fields = [];
      foreach ( UserLoop::$config['fields'] as $key => $config ) {
        if ($key === 'all' || substr( $key, -2 ) === '_*') continue;
        $defined_fields[ $key ] = $loop->get_user_field( $user, $key, $args );
      }

      ob_start();
      ?><pre><code><?php
      print_r( $defined_fields );
      ?></code></pre><?php
      $value = ob_get_clean();
        break;
    case 'meta':
      ob_start();
      ?><pre><code><?php
      print_r( get_user_meta( $id, '', true ) );
      ?></code></pre><?php
      $value = ob_get_clean();
        break;
    case 'id':
      $value = $id;
        break;
    case 'name':
      $value = $user->get( 'user_login' );
        break;
    case 'full_name':
      $value = $user->get( 'display_name' );
      if ( empty( $value ) ) {
        $value                      = $user->get( 'user_nicename' );
        if (empty( $value )) $value = $user->get( 'first_name' ) . ' ' . $user->get( 'last_name' );
      }
        break;

    case 'email':
      $value = $user->get( 'user_email' );
        break;

    case 'url':
      $value = $user->get( 'user_url' );
        break;
    case 'archive_url':
      $value = get_author_posts_url( $id );
        break;
    case 'edit_url':
      $value = admin_url( 'user-edit.php?user_id=' . $id );
        break;

    case 'posts':
    case 'post_count':
      /**
       * Get posts authored by user
       *
       * @see https://developer.wordpress.org/reference/functions/get_posts_by_author_sql/#more-information
       */

      global $wpdb;

      $loop_type = isset( $args['post_type'] )
        ? $args['post_type'] // For shortcut with Field tag which reserves "type" attribute
        : ( isset( $args['type'] )
          ? $args['type']
          : 'post'
        );

      // In case it's an aliased loop type
      $post_type = $loop->get_post_type( $loop_type );

      $where = get_posts_by_author_sql(
        $post_type, // Post type
        true,       // Return full WHERE statement
        $id,        // Author ID
        true        // Public only
      );

      $posts = $wpdb->get_results(
        // Use $wpdb->prepare() if placeholders needed
        "SELECT ID FROM $wpdb->posts $where"
      );

      if ( $field_name === 'post_count' ) {
        return count( $posts );
      }

      $post_ids = array_map(function( $post ) {
        return $post->ID;
      }, $posts);

      /**
       * Create loop of author posts
       *
       * NOTE: Assumes all loop types can accept array of IDs
       */

        return empty( $post_ids ) ? $loop( 'list', [] ) : $loop->create_type( $loop_type, [
        'id' => $post_ids,
      ]);

    break;

    case 'avatar':
      $value = get_avatar($user->ID,
        isset( $args['size'] ) ? (int) $args['size'] : 240
      );
        break;
    case 'avatar_url':
      $value = get_avatar_url($user, [
        'size' => isset( $args['size'] ) ? (int) $args['size'] : 96,
      ]);
        break;

    case 'registration_date':
      $date = $user->user_registered;

      $format = isset( $args['date_format'] )
        ? $args['date_format']
        : get_option( 'date_format' );
      $value  = mysql2date( $format, $date );
        break;

    case 'role':
    case 'roles':
      $data  = get_userdata( $user->ID );
      $value = (array) $data->roles;
        break;
    case 'locale':
      $value                      = $user->locale;
      if (empty( $value )) $value = get_locale(); // Fallback to site locale
        break;
    default:
      if ( isset( $args['custom'] ) && ! $args['custom'] ) {
        return false;
      }
      $value = $user->get( $field_name );
        break;
  }

  return $value;
};
