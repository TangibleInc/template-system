<?php

namespace Tangible\Loop;

/**
 * Keep track of current post(s) whose content is being rendered,
 * to prevent infinite loop. See "content" field below.
 */
$loop->currently_inside_post_content_ids = [];

$loop->get_post_field = function( $post, $field_name, $args = [] ) use ( $loop ) {

  if ( is_numeric( $post ) ) {

    // get_post_field( $id, .. )

    $post = get_post( $post );

  } elseif ( is_string( $post ) ) {

    // get_post_field( $field_name, $args )

    $post       = null;
    $args       = $field_name;
    $field_name = $post;
  }

  if (empty( $post )) $post = get_post(); // Current post
  if (empty( $post )) return;

  $id   = $post->ID;
  $type = $post->post_type;

  // Check if extended field
  $value = $loop->get_filtered_field( $type, $post, $field_name, $args );
  if ( ! is_null( $value )) return $value;

  /**
   * Extended fields for custom loop types are handled by $loop->get_field().
   * In case that wasn't found, try extended fields for post.
   */
  if ( $type !== 'post' ) {
    $value = $loop->get_filtered_field( 'post', $post, $field_name, $args );
    if ( ! is_null( $value )) return $value;
  }

  // $defined_fields = &PostLoop::$config['fields'];

  $should_format_content = ! isset( $args['format'] ) || (
    $args['format'] !== 'false' && $args['format'] !== false // From tag or direct
  );

  /**
   * Subfields of another loop type
   */

  $parts    = explode( '_', $field_name );
  $prefix   = $parts[0];
  $subfield = implode( '_', array_slice( $parts, 1 ) );

  switch ( $prefix ) {
    case 'author':
      $author_id   = $post->post_author;
      $author_loop = $loop->create_type( 'user', [ 'id' => $author_id ] );
  
      if (empty( $subfield )) return $author_loop;

      $author_loop->next();
      return $author_loop->get_field( $subfield, $args );

    case 'modified':
      // https://developer.wordpress.org/reference/functions/the_modified_author/
      if (($parts[1] ?? '')==='author') {

        $author_id   = get_post_meta( $id, '_edit_last', true );

        $author_loop = ($author_id===false || $author_id==='')
          ? $loop( 'list', [] )
          : $loop->create_type( 'user', [ 'id' => $author_id ] )
        ;

        $subfield = implode( '_', array_slice( $parts, 2 ) );
        if (empty( $subfield )) return $author_loop;

        $author_loop->next();
        return $author_loop->get_field( $subfield, $args );  
      }
      break;

    case 'parent':
      if ($subfield === 'ids') return get_post_ancestors( $id );

      $parent_id   = $post->post_parent;
      $parent_loop = empty( $parent_id ) ? $loop( 'list', [] )
        : $loop->create_type( $type, [ 'id' => $parent_id ] );

      if (empty( $subfield )) return $parent_loop;

      $parent_loop->next();
      $value = $parent_loop->get_field( $subfield, $args );

      // Important: Restore current post in $wp_query
      $parent_loop->reset();

        return $value;

    case 'children':
      $children_loop = $loop->create_type($type, [
        'type'   => $type,
        'parent' => $id,
        'keys'   => [],
      ] + $args ); // Support passing query parameters like orderby, order

      if (empty( $subfield )) return $children_loop;
      if ($subfield === 'ids') return $children_loop->get_items(); // Array of IDs

        return; // No other fields

    // Featured image

    case 'image':
      $image_id = get_post_thumbnail_id( $id );

      $image_loop = empty( $image_id ) ? $loop( 'list', [] )
        : $loop->create_type( 'attachment', [ 'id' => $image_id ] );

      if (empty( $subfield )) return $image_loop;

      $image_loop->next();
      $value = $image_loop->get_field( $subfield, $args );

      // Important: Restore current post in $wp_query
      $image_loop->reset();

        return $value;
  }

  /**
   * Post fields
   */

  if ( isset( $args['custom'] ) && $args['custom'] ) {
    return get_post_meta( $id, $field_name, true );
  }

  switch ( $field_name ) {
    case 'all':
      $defined_fields = [];
      foreach ( PostLoop::$config['fields'] as $key => $config ) {
        if ($key === 'all' || substr( $key, -2 ) === '_*') continue;
        $defined_fields[ $key ] = $this->get_post_field( $post, $key, $args );
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

    case 'type':
          $value = $type;
        break;
    case 'slug': // Alias
    case 'name':
          $value = $post->post_name;
        break;
    case 'title':
      $value = $post->post_title;
        break;
    case 'content':
      $value = $post->post_content;

      if ( $should_format_content

        // Prevent infinite loop for post content

        && ! in_array( $post->ID, $loop->currently_inside_post_content_ids )
      ) {

        $loop->currently_inside_post_content_ids [] = $post->ID;

        $value = apply_filters( 'the_content', $post->post_content );

        array_pop( $loop->currently_inside_post_content_ids );
      }

        break;
    case 'excerpt':
      // $value = $post->post_excerpt;

      if ( has_excerpt( $post ) ) {

        $value = wp_strip_all_tags( get_the_excerpt( $post ) );

      } elseif ( isset( $args['auto'] ) && $args['auto'] === 'true' ) {

        /**
         * Optionally generate excerpt from post content
         * Based on: https://developer.wordpress.org/reference/functions/wp_trim_excerpt/
         */

        $excerpt_length = isset( $args['words'] )
          ? (int) $args['words']
          : (int) apply_filters( 'excerpt_length', 55 );

        $excerpt_more = isset( $args['more'] )
          ? str_replace( [ '{', '}' ], [ '<', '>' ], $args['more'] ) // Restore tags from attribute value
          : false;

        if ( $excerpt_more === 'false' ) {
          $excerpt_more = false;
        } elseif ( $excerpt_more === 'true' ) {
          // Default text to append when excerpt was cut short
          $excerpt_more = apply_filters( 'excerpt_more', ' [&hellip;]' );
        }

        /**
         * Wrap read more text in link to post, with quick check to ensure
         * the text is not already in HTML
         */
        if ( ! empty( $excerpt_more ) && $excerpt_more[0] !== '<' ) {
          $excerpt_more = sprintf( '<a href="%1$s" class="more-link">%2$s</a>',
            esc_url( get_permalink( $id ) ),
            $excerpt_more
          );
        }

        $value = wp_trim_words(
        str_replace( ']]>', ']]&gt;',
            apply_filters('the_content',
            excerpt_remove_blocks(
                strip_shortcodes(
                  get_the_content( '', false, $post )
                )
              )
            )
          ),
          $excerpt_length,
          $excerpt_more
        );

      }

        break;
    case 'status':
      /*
      'publish' - A published post or page
      'pending' - post is pending review
      'draft' - a post in draft status
      'auto-draft' - a newly created post, with no content
      'future' - a post to publish in the future
      'private' - not visible to users who are not logged in
      'inherit' - a revision. see get_children.
      'trash' - post is in trashbin.
      custom status
      */
      $value = $post->post_status;
        break;

    // Publish and modify date - Format: 0000-00-00 00:00:00
    case 'publish_date':
          $value = $post->post_date;
        break;
    case 'modify_date':
          $value = $post->post_modified;
        break;

    case 'url':
          $value = get_permalink( $id );
        break;
    case 'edit_url':
          $value = get_edit_post_link( $id, false );
        break;

    // @see https://developer.wordpress.org/reference/functions/post_class/
    case 'post_class':
          $value = join( ' ', get_post_class( '', $id ) );
        break;

    case 'menu_order':
          $value = $post->menu_order;
        break;

    case 'ancestors':
      // https://developer.wordpress.org/reference/functions/get_ancestors/

      // Ancestor IDs from lowest to highest in the hierarchy
      $ancestors = get_ancestors( $id, $type, 'post_type' );

      // Support reverse=true
      if ( isset( $args['reverse'] ) ) {
        $ancestors = array_reverse( $ancestors );
      }

      return $loop($type, [
        'include' => $ancestors,
      ]);

    // TODO: comments count, categories, tags, ..

    default:
      if ( isset( $args['custom'] ) && ! $args['custom'] ) {
        return false;
      }
      $value = get_post_meta( $id, $field_name, true );
        break;
  }

  return $value;
};
