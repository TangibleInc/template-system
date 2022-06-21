<?php
/**
 * Template category
 *
 * @see https://codex.wordpress.org/Function_Reference/register_taxonomy
 *
 * Admin column and filter implemented in ./extend.php
 */

register_taxonomy(
  'tangible_template_category', // Slug
  $plugin->template_post_types, // Associated post type(s)
  [
    'label'             => __( 'Template Categories', 'tangible_blocks' ),
    'hierarchical'      => true, // true is like category, false is like tags

    // Not used on the frontend
    // 'rewrite' => ['slug' => 'tangible-template-category'],

    // Admin column is renamed in ./extend.php
    'show_admin_column' => true,

    'show_in_rest'      => true,
    'labels'            => [
      'singular_name'              => __( 'Template Category', 'tangible_blocks' ),
      'all_items'                  => __( 'All Template Categories', 'tangible_blocks' ),
      'edit_item'                  => __( 'Edit Template Category', 'tangible_blocks' ),
      'view_item'                  => __( 'View Template Category', 'tangible_blocks' ),
      'update_item'                => __( 'Update Template Category', 'tangible_blocks' ),
      'add_new_item'               => __( 'Add New Template Category', 'tangible_blocks' ),
      'new_item_name'              => __( 'New Template Category Name', 'tangible_blocks' ),
      'search_items'               => __( 'Search Template Categories', 'tangible_blocks' ),
      'popular_items'              => __( 'Popular Template Categories', 'tangible_blocks' ),
      'separate_items_with_commas' => __( 'Separate authors with comma', 'tangible_blocks' ),
      'choose_from_most_used'      => __( 'Choose from most used authors', 'tangible_blocks' ),
      'not_found'                  => __( 'No template categories found', 'tangible_blocks' ),
    ],

  ]
);

add_action($plugin->is_multisite() ? 'network_admin_menu' : 'admin_menu',
  function() {

    // https://wordpress.stackexchange.com/questions/83768/add-menu-and-submenu-in-admin-with-a-url-instead-of-slug

    add_submenu_page(
      'tangible', // Parent menu slug
      'Template Categories', // Page title
      'Categories', // Menu title
      'manage_options', // Capability
      'edit-tags.php?taxonomy=tangible_template_category', // Menu slug
      '', // Callback
      30 // Position
    );

  },
  10
);

/**
 * Get all template taxonomies
 *
 * Used in /includes/template/import-export
 */
$plugin->get_template_taxonomies = function( $post ) use ( $plugin ) {

  if (is_numeric( $post )) $post = get_post( $post ); // Accept post ID
  if (empty( $post )) return [];

  $taxonomies = [
    'tangible_template_category' => [],
  ];

  foreach ( $taxonomies as $taxonomy_name => $value ) {

    $terms = get_the_terms( $post->ID, $taxonomy_name );

    if (empty( $terms )) continue;

    $taxonomies[ $taxonomy_name ] = [];

    foreach ( $terms as $term ) {
      // Return term names for export purpose
      $taxonomies[ $taxonomy_name ] [] = $term->name;
    }
  }

  return $taxonomies;
};

$plugin->get_template_taxonomy_term_fields = function( $taxonomy_name, $term ) {

  $term_fields = [
    // https://developer.wordpress.org/reference/classes/wp_term/
    'slug'        => $term->slug,
    'description' => $term->description,
  ];

  if ( ! empty( $term->parent ) ) {

    // Pass parent term name instead of ID for export purpose
    $parent_term = get_term_by( 'id', $term->parent, $taxonomy_name );

    if ( ! empty( $parent_term ) ) {
      $term_fields['parent'] = $parent_term->name;
    }
  }

  return $term_fields;
};
