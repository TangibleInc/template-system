<?php
/**
 * Create post
 */
$html->form_actions['create'] = function( $attributes, $data ) use ( $html, $loop ) {

  if (empty( $attributes['type'] )) return [
    'error' => 'Action type is required',
  ];

  // Support loop types which alias real post type
  $type = $loop->get_post_type(
    $attributes['type']
  );

  // Ensure post type exists - wp_insert_post will create a post regardless
  if ( ! post_type_exists( $type ) ) {
    return [ 'error' => "Post type \"$type\" does not exist" ];
  }

  $post_data = [
    'ID'           => 0, // Maybe set ID for "update" action in the future
    'post_type'    => $type,
    // Title and content are required
    'post_title'   => '(No title)', // Cannot be empty
    'post_content' => '',
    'post_status'  => 'publish',
    // Custom fields
    'meta_input'   => [],
  ];

  // Aliases for post_* fields
  foreach ( [
    // 'name', // Generate slug from title
    'title',
    'content',
    'status',
  ] as $key ) {
    if ( isset( $data[ $key ] ) ) {
      $post_data[ "post_{$key}" ] = wp_strip_all_tags( $data[ $key ] );
      unset( $data[ $key ] );
    }
  }

  foreach ( $data as $key => $value ) {
    /**
     * Add backslash \ escaping to compensate for the call to stripslashes()
     * by wp_insert_post(), wp_update_post(), and update_post_meta().
     *
     * @see https://developer.wordpress.org/reference/functions/update_post_meta/#character-escaping
     */
    $post_data['meta_input'][ $key ] = is_string( $value )
      ? wp_slash( wp_strip_all_tags( $value ) )
      : $value
    ;
  }

  // TODO: Taxonomy

  /**
   * Create or update post
   *
   * For accepted properties, see: https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters
   *
   *  Values are passed through [sanitize_post](https://developer.wordpress.org/reference/functions/sanitize_post/)
   *
   *  Possible return types: Post ID on success; value 0 or WP_Error on failure
   */
  $result = wp_insert_post( $post_data );

  if ( empty( $result ) || is_wp_error( $result ) ) {
    return [ 'error' => "Failed action \"$action\"" ];
  }

  if ( isset( $attributes['mail'] ) ) {
    foreach ( $attributes['mail'] as $mail ) {

      $mail_result = $html->form_action([
        'action'   => 'mail',
        'template' => $mail,
      ], $data);

      // For testing
      // return $mail_result;

      if ( is_array( $mail_result ) && isset( $mail_result['error'] ) ) {
        /**
         * TODO: Inform site admin on mail error
         * For the user who filled out the form, continue with form success
         */
      }
    }
  }

  return [
    'id' => $result,
  ];
};
