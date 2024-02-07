<?php
namespace tangible\template_system;
use tangible\template_system;

/**
 * Import
 */

function import_templates($data) {

  $plugin = template_system::$system;

  $result = [
    'message'           => 'Success',
    'post_count'        => 0,
    'failed_post_count' => 0,
    'duplicates_found'  => [],
    'old_to_new_id'     => [], // old => new
  ];

  if ( ! isset( $data['post_types'] )) return $result;

  /**
   * Modes to handle duplicate templates: overwrite, keep_both, skip, or return
   *
   * By default, the mode "return" collects the IDs and returns it, so UI can ask
   * the user what to do with duplicates.
   */

  $handle_duplicates = isset( $data['handle_duplicates'] )
    ? $data['handle_duplicates']
    : 'return';

  $shared_assets = isset( $data['shared_assets'] ) ? $data['shared_assets'] : [];

  /**
   * Import taxonomies before post types to prepare map of new term IDs
   * On initial import only, not when processing duplicates
   */

  $taxonomy_term_ids = []; // taxonomy => term name => term ID

  if ( $handle_duplicates === 'return' && isset( $data['taxonomies'] ) ) {

    foreach ( $data['taxonomies'] as $taxonomy_name => $terms_map ) {

      $taxonomy_term_ids[ $taxonomy_name ] = [];

      foreach ( $terms_map as $term_name => $term_fields ) {

        /**
         * Add new term if it doesn't exist
         *
         * @see https://developer.wordpress.org/reference/functions/wp_insert_term/
         */

        $existing_term = get_term_by( 'name', $term_name, $taxonomy_name );
        if ( ! empty( $existing_term )) continue;

        // description, slug
        unset( $term_fields['parent'] ); // This is parent name, not ID

        $new_term_data = wp_insert_term( $term_name, $taxonomy_name, $term_fields );
        if ( ! is_wp_error( $new_term_data ) && isset( $new_term_data['term_id'] ) ) {
          $taxonomy_term_ids[ $taxonomy_name ][ $term_name ] = $new_term_data['term_id'];
        }
      }

      // Associate new parent term IDs after all terms of this taxonomy are created

      foreach ( $terms_map as $term_name => $term_fields ) {
        if (empty( $term_fields['parent'] )
          || ! isset( $taxonomy_term_ids[ $taxonomy_name ][ $term_name ] )
          || ! isset( $taxonomy_term_ids[ $taxonomy_name ][ $term_fields['parent'] ] )
        ) continue;

        $term_id        = $taxonomy_term_ids[ $taxonomy_name ][ $term_name ];
        $parent_term_id = $taxonomy_term_ids[ $taxonomy_name ][ $term_fields['parent'] ];

        wp_update_term($term_id, $taxonomy_name, [
          'parent' => $parent_term_id,
        ]);
      }
    } // Each taxonomy
  } // If import taxonomies

  /**
   * Import posts by post type
   */
  foreach ( $data['post_types'] as $post_type => $posts ) {

    foreach ( $posts as $post ) {

      $id         = 0;
      $name       = '';
      $title      = '';
      $content    = '';
      $status     = 'publish';
      $fields     = [];
      $taxonomies = [];

      $extract_vars = [ 'id', 'name', 'title', 'content', 'taxonomies' ];

      foreach ( $post as $key => $value ) {

        if ( in_array( $key, $extract_vars ) ) {
          $$key = $value;
          continue;
        }

        /**
         * IMPORTANT: Must add backslash \ escaping to compensate for the call
         * to stripslashes() by update_post_meta() and wp_insert_post().
         *
         * @see https://developer.wordpress.org/reference/functions/update_post_meta/#character-escaping
         */
        $fields[ $key ] = is_string( $value ) ? wp_slash( $value ) : $value;
      }

      if (empty( $id ) || empty( $name )) continue; // Just in case

      $old_id = $id;

      // By default, always create new post
      $id = 0;

      if ( $handle_duplicates !== 'keep_both' ) {

        // Check for duplicates

        $query_args = [
          'post_type'      => $post_type,
          'posts_per_page' => 1,
          'fields'         => 'ids',
          'post_status'    => 'any',
        ];

        if ( ! empty( $fields['universal_id'] ) ) {

          $query_args['meta_key']   = 'universal_id';
          $query_args['meta_value'] = $fields['universal_id'];

        } else {

          // For backward compatibility, check by post slug
          $query_args['name'] = $name;
        }

        $existing_posts = get_posts( $query_args );

        if ( ! empty( $existing_posts ) ) {

          // Duplicate(s) found

          if ($handle_duplicates === 'skip') continue; // Don't create post at all

          if ( $handle_duplicates === 'return' ) {

            // Keep track of old IDs for frontend to handle

            $result['duplicates_found'] [] = [
              'id'        => intval( $old_id ),
              'post_type' => $post_type,
              'title'     => $title,
            ];

            continue;
          }

          if ( $handle_duplicates === 'overwrite' ) {

            // Overwrite existing post
            $id = $existing_posts[0];

            /**
             * Clear any cached field values
             *
             * @see ../save.php, maybe_save_style_compiled()
             */
            $fields['style_compiled'] = false;
          }
        } // Found existing post(s) with same name
      } // Not keep both

      /**
       * Create attachments if necessary
       *
       * @see /includes/template/assets/import.php
       */

      if ( ! empty( $fields['assets'] ) && is_array( $fields['assets'] ) ) {

        $imported_assets = [];

        foreach ( $fields['assets'] as $asset_index => $asset ) {

          /**
           * Create a non-numeric key to prevent JS/PHP confusion with array index.
           * @see ./export.php
           */
          $asset_id  = $asset['id'];
          $asset_key = '_' . $asset_id;

          // Asset data not found
          if ( ! isset( $shared_assets[ $asset_key ] )) continue;

          $attachment_id = 0;
          $universal_id = $shared_assets[ $asset_key ]['universal_id'] ?? false;
          if (!empty($universal_id)) {
            /**
             * Pass to import_template_asset() below
             * @see ../template-assets/import.php
             */
            $asset['universal_id'] = $universal_id;
          }

          if ( isset( $shared_assets[ $asset_key ]['attachment_id'] ) ) {

            // Already imported
            $attachment_id = $shared_assets[ $asset_key ]['attachment_id'];

          } elseif (isset($shared_assets[ $asset_key ]['text'])) {

            // Text

            $asset_data = $shared_assets[ $asset_key ]['text'];
            $attachment_id = $plugin->import_template_asset( $asset, $asset_data );
            $shared_assets[ $asset_key ]['attachment_id'] = $attachment_id;
            
          } elseif (isset( $shared_assets[ $asset_key ]['base64'] ) ) {

            // Binary - Decode data and create attachment file

            try {
              $asset_data = base64_decode(
                $shared_assets[ $asset_key ]['base64']
              );
            } catch ( \Throwable $th ) {
              // Invalid data
              continue;
            }

            $attachment_id = $plugin->import_template_asset( $asset, $asset_data );
            $shared_assets[ $asset_key ]['attachment_id'] = $attachment_id;
          }

          if ( empty( $attachment_id ) ) {

            // TODO: Handle import fail

            continue;
          }

          // Update attachment ID
          $asset['id'] = $attachment_id;

          $imported_assets [] = $asset;

        } // Each asset

        // Update field with successfully imported assets

        $fields['assets'] = $imported_assets;

      } // Has assets

      // Handle special fields that can't be updated with udpate_post_meta()

      /**
       * Post status
       */
      if ( isset( $fields['post_status'] ) ) {
        $status = $fields['post_status'];
        unset( $fields['post_status'] );
      }

      /**
       * Post order, internally called "menu_order"
       */
      $menu_order = false;

      if ( isset( $fields['menu_order'] ) ) {
        $menu_order = $fields['menu_order'];
        unset( $fields['menu_order'] );
      }

      /**
       * Create/update post
       *
       * @see https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters
       *
       * Return value: Post ID on success; value 0 or WP_Error on failure
       */

      $post_data = [
        'ID'           => $id,
        'post_type'    => $post_type,
        'post_name'    => $name,
        'post_title'   => $title,
        'post_content' => $content,
        'post_status'  => $status,
        'meta_input'   => $fields,
      ];

      if ( $menu_order !== false ) {
        $post_data['menu_order'] = $menu_order;
      }

      $post_id = wp_insert_post( $post_data );

      if ( empty( $post_id ) || is_wp_error( $post_id ) ) {

        $result['failed_post_count']++;
        continue;
      }

      // Import post success

      $result['post_count']++;
      $result['old_to_new_id'][ $old_id ] = $post_id;

      /**
       * Duplicate post must be given a new universal ID
       */
      if ( $handle_duplicates === 'keep_both' && ! empty( $fields['universal_id'] ) ) {
        $plugin->set_universal_id( $post_id );
      }

      /**
       * When overwriting existing template, any cached field values like compiled CSS must cleared
       *
       * @see ../save.php, maybe_save_style_compiled()
       */
      if ( $handle_duplicates === 'overwrite' && $fields['style_compiled'] === false ) {
        delete_post_meta( $post_id, 'style_compiled' );
      }

      /**
       * Assign taxonomies
       *
       * @see https://developer.wordpress.org/reference/functions/wp_set_post_terms/
       */

      foreach ( $taxonomies as $taxonomy_slug => $term_names ) {

        // Gather term IDs from term names
        $term_ids = [];

        foreach ( $term_names as $term_name ) {

          if ( isset( $taxonomy_term_ids[ $taxonomy_slug ] )
            && isset( $taxonomy_term_ids[ $taxonomy_slug ][ $term_name ] )
          ) {
            $term_ids [] = $taxonomy_term_ids[ $taxonomy_slug ][ $term_name ];
            continue;
          }

          // Find new term ID and cache it

          $term = get_term_by( 'name', $term_name, $taxonomy_slug );
          if (empty( $term )) continue;

          $term_id     = $term->term_id;
          $term_ids [] = $term_id;

          if ( ! isset( $taxonomy_term_ids[ $taxonomy_slug ] ) ) {
            $taxonomy_term_ids[ $taxonomy_slug ]               = [];
            $taxonomy_term_ids[ $taxonomy_slug ][ $term_name ] = $term_id;
          }
        }

        if ( ! empty( $term_ids ) ) {
          wp_set_post_terms( $post_id, $term_ids, $taxonomy_slug );
        }
      }

    } // Each post
  } // Each post type

  return $result;
};

// Deprecated
$plugin->import_templates = __NAMESPACE__ . '\\import_templates';
