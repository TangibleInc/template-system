<?php

$plugin->is_saving_template_post = false;

/**
 * Save template post
 *
 * General purpose - Used by AJAX action
 */
$plugin->save_template_post = function( $data = [] ) use ( $plugin, $html ) {

  foreach ( [
    'id',
    'name',
    'title',
    'content',
  ] as $key ) {
    $$key = isset( $data[ $key ] ) ? $data[ $key ] : '';
  }

  if (empty( $id )) return new WP_Error(
    'save_error_id_required',
    __( 'Property "id" is required', 'tangible_template_system' )
  );

  if (empty( $title )) return new WP_Error(
    'save_error_title_required',
    __( 'Property "title" is required', 'tangible_template_system' )
  );

  $tax_input = [];
  if ( isset( $data['tax_input'] ) && is_array( $data['tax_input'] ) ) {
    // { taxonomy name: array of term IDs }
    $tax_input = $data['tax_input'];
  }
  unset( $data['tax_input'] );

  // Prepare fields

  $fields = $plugin->template_field_defaults; // Copy defaults

  foreach ( $fields as $key => $default_value ) {
    if ( ! isset( $data[ $key ] ) ) continue;

    /**
     * NOTE: Must add backslash "\" escaping to compensate for the call to stripslashes()
     * by update_post_meta() and wp_update_post().
     *
     * @see https://developer.wordpress.org/reference/functions/update_post_meta/#character-escaping
     */
    $value          = $data[ $key ];
    $fields[ $key ] = is_string( $value ) ? wp_slash( $value ) : $value;
  }

  $post_data = [
    'ID'           => $id,
    'post_content' => $content,
    'meta_input'   => $fields,
    'tax_input'    => $tax_input,
  ];

  if ( ! empty( $title ) ) {
    $post_data['post_title'] = $title;
  }

  $plugin->is_saving_template_post = true;

  /**
   * Create or update post
   *
   * For accepted properties, see: https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters
   *
   * Possible return types: Post ID on success; value 0 or WP_Error on failure
   */
  $result = wp_update_post( $post_data );

  $plugin->is_saving_template_post = false;

  if ( empty( $result ) ) {

    // Simplify error handling by ensuring an instance of WP_Error
    $result = new WP_Error( 'save_error', __( 'Unknown error', 'tangible_template_system' ) );

  } elseif ( ! is_wp_error( $result ) ) {

    // Update template slug

    $post = get_post( $result );

    $post_name = sanitize_title_with_dashes(remove_accents(
      ! empty( $name ) ? $name
        : ( ! empty( $title ) ? $title : 'no-title' )
    ), '', 'save');

    $plugin->save_unique_template_post_slug( $post, $post_name );

    if ( isset( $fields['style'] ) ) {
      $plugin->maybe_save_style_compiled( $post, $fields['style'] );
    }
  }

  return $result;
};


/**
 * Save template fields via form POST
 */
add_action( 'wp_after_insert_post', function( $post_id, $post, $update ) use ( $plugin, $html ) {

  if (( defined( 'DOING_AJAX' ) && DOING_AJAX )
    || $plugin->is_saving_template_post
    || empty( $post ) || ! in_array( $post->post_type, $plugin->template_post_types )
  ) return;

  // Update template slug

  $post_name = sanitize_title_with_dashes(remove_accents(
    ! empty( $_POST['name'] ) ? $_POST['name']
      : ( ! empty( $post->post_title ) ? $post->post_title
        : 'no-title'
      )
  ), '', 'save');

  $plugin->save_unique_template_post_slug( $post, $post_name );

  // Update template fields

  foreach ( $plugin->template_field_defaults as $key => $value ) {

    if ( ! isset( $_POST[ $key ] ) ) continue;

    // @see https://developer.wordpress.org/reference/functions/sanitize_post_field/
    $value = sanitize_post_field( $key, $_POST[ $key ], $post_id, 'raw' );

    /**
     * NOTE: Values coming from $_POST are backslash "\" escaped.
     * Post meta values are passed through stripslashes() by update_post_meta().
     *
     * @see https://developer.wordpress.org/reference/functions/update_post_meta/#character-escaping
     */
    update_post_meta( $post_id, $key, $value );

    if ( $key === 'style' ) {
      $plugin->maybe_save_style_compiled( $post, $value );
    }
  }

}, 10, 3 );

/**
 * Workaround for user option "Disable the visual editor when writing"
 * to prevent it from filtering template post content
 * 
 * When the option is enabled, the content goes through format_to_edit() with
 * second argument `rich_edit` set to `false`, which applies esc_textarea() to
 * it. This workaround forces it to be true to ensure that post content is
 * not processed.
 * 
 * @see https://developer.wordpress.org/reference/functions/format_to_edit/
 * @see https://developer.wordpress.org/reference/hooks/replace_editor/
 */

add_action('replace_editor', function($replace, $post) use ( $plugin ) {
   if (!empty( $post ) && in_array( $post->post_type, $plugin->template_post_types )) {
    add_filter('user_can_richedit', '__return_true', 99);
  }
}, 10, 2);


/**
 * Ensure unique slug
 *
 * The slug **must be pre-processed** with sanitize_title_with_dashes( $slug )
 *
 * @see https://developer.wordpress.org/reference/functions/wp_unique_post_slug/
 */
$plugin->save_unique_template_post_slug = function( $post, $slug ) {

  if (empty( $post )) return;

  global $wpdb;

  $wpdb->update($wpdb->prefix . 'posts',
    [
    'post_name' => wp_unique_post_slug(
        $slug,
        $post->ID,
        'publish',
        $post->post_type,
        $post->post_parent
      ),
    ],
    [ 'ID' => $post->ID ]
  );
};


/**
 * Precompile SASS on save
 *
 * Block post type is excluded from having precompiled CSS, because
 * it needs to replace placeholders with fresh control values.
 *
 * @see ./render.php, $plugin->enqueue_template_style()
 */

$plugin->maybe_save_style_compiled = function( $post, $style ) use ( $html ) {

  if ( $post->post_type === 'tangible_block' ) {
    return;
  }

  /**
   * NOTE: Must strip backslash "\" here to restore original value
   *
   * - From action "wp_after_insert_post", values in $_POST are backslash escaped.
   * - From $plugin->save_template_post() - such as via AJAX - it calls wp_slash()
   *   on all fields.
   */

  $css = $html->sass(
    stripslashes( $style ),
    [
      'source' => $post, // Extra info for any error message
    ]
  );

  update_post_meta( $post->ID, 'style_compiled', $css );
};
