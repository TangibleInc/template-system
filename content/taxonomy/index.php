<?php
use tangible\format;

/**
 * Register taxonomy
 *
 * @see https://developer.wordpress.org/reference/functions/register_taxonomy/
 */

$html->registered_taxonomies = []; // name => config

$html->register_taxonomy = function( $name, $config ) use ( $html ) {

  // Parse post types here to allow content types to associate these taxonomies on init

  if ( isset( $config['post_type'] ) ) {
    $config['post_type'] = ( is_array( $config['post_type'] ) ? $config['post_type']
      : format\multiple_values($config['post_type'] )
    );
  } else {
    $config['post_type'] = [ 'post' ];
  }

  $html->registered_taxonomies[ $name ] = $config;
};

// Call from "init" action
$html->init_taxonomies = function() use ( $html ) {
  foreach ( $html->registered_taxonomies as $name => $config ) {
    $html->create_taxonomy( $name, $config );
  };
};

$html->create_taxonomy = function( $name, $config ) use ( $html ) {

  // Shortcuts

  if ( isset( $config['title'] ) ) {
    $single = $config['title'];
    unset( $config['title'] );
  } else {
    $single = ucfirst( $name );
  }

  if ( isset( $config['title_plural'] ) ) {
    $plural = $config['title_plural'];
    unset( $config['title_plural'] );
  } else {
    $plural = $single . 's';
  }

  $plural_lower = strtolower( $plural );

  // Labels

  $config['labels'] = array_merge([
    'name'                       => _x( $plural, 'taxonomy general name' ),
    'menu_name'                  => __( $plural ),
    'singular_name'              => _x( $single, 'taxonomy singular name' ),

    'all_items'                  => __( "All {$plural}" ),
    'edit_item'                  => __( "Edit {$single}" ),
    'view_item'                  => __( "View {$single}" ),
    'update_item'                => __( "Update {$single}" ),
    'add_new_item'               => __( "Add New {$single}" ),
    'new_item_name'              => __( "New {$single} Name" ),

    'parent_item'                => __( "Parent {$single}" ),
    'parent_item_colon'          => __( "Parent {$single}:" ),
    'search_items'               => __( "Search {$plural}" ),
    'popular_items'              => __( "Popular {$plural}" ),

    'separate_items_with_commas' => __( 'Separate ' . $plural_lower . ' with commas' ),
    'add_or_remove_items'        => __( 'Add or remove ' . $plural_lower ),
    'choose_from_most_used'      => __( 'Choose from the most used ' . $plural_lower ),
    'not_found'                  => __( "No {$plural} found." ),
    'back_to_items'              => __( "← Back to {$plural}" ),
  ], isset( $config['labels'] ) ? $config['labels'] : []);

  /**
   * Post types
   * Passed as separate argument to register_taxonomy
   */

  $post_types = $config['post_type'];

  unset( $config['post_type'] );

  // Rewrite

  $config['rewrite'] = array_merge(
    [
      'slug' => $name,
    ],
    isset( $config['rewrite'] ) ? $config['rewrite'] : []
  );

  // Capabilities

  $config['capabilities'] = array_merge(
    [
      'manage_terms' => 'manage_categories',
      'edit_terms'   => 'manage_categories',
      'delete_terms' => 'manage_categories',
      'assign_terms' => 'edit_posts',
    ],
    isset( $config['capabilities'] ) ? $config['capabilities'] : []
  );

  // default_term - Map of name, slug, description

  // For these non-string types, convert given value based on default
  foreach ( [

    /**
     * Hierarchical taxonomies will have a list with checkboxes to select an existing category
     * in the taxonomy admin box on the post edit page (like default post categories).
     *
     * Non-hierarchical taxonomies will just have an empty text field to type-in taxonomy terms
     * to associate with the post (like default post tags).
     */
    'hierarchical'       => false,

    'query_var'          => true,

    'public'             => true,
    'publicly_queryable' => true,

    // Whether to generate and allow a UI for managing terms in this taxonomy in the admin
    'show_ui'            => true,

    // Whether to show the taxonomy in the admin menu. If true, the taxonomy is shown as a submenu of the object type menu. If false, no menu is shown.
    'show_in_menu'       => true,

    // Makes this taxonomy available for selection in navigation menus
    'show_in_nav_menus'  => true,

    'show_admin_column'  => true,

    // Whether to include the taxonomy in the REST API. Set this to true for the taxonomy to be available in the block editor.
    'show_in_rest'       => true,

    // Whether to list the taxonomy in the Tag Cloud Widget controls. If not set, the default is inherited from show_ui
    'show_tagcloud'      => true,

    // Whether to show the taxonomy in the quick/bulk edit panel. It not set, the default is inherited from $show_ui
    'show_in_quick_edit' => true,

  ] as $key => $default_value ) {

    if ( ! isset( $config[ $key ] ) ) {
      $config[ $key ] = $default_value;
      continue;
    }

    if ( is_integer( $default_value ) ) {
      $config[ $key ] = (int) $config[ $key ];
    } elseif ( is_bool( $default_value ) ) {
      $config[ $key ] = $config[ $key ] === true || $config[ $key ] === 'true';
    } elseif ( is_array( $default_value ) ) {
      $config[ $key ] = is_array( $config[ $key ] )
        ? $config[ $key ]
        : format\multiple_values($config[ $key ]);
    }
  }

  // tangible\see('create_taxonomy', $name, $post_types, $config);

  register_taxonomy( $name, $post_types, $config );
};
