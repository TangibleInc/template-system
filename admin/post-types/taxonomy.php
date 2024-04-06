<?php
use tangible\framework;

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
    'label'             => __( 'Template Categories', 'tangible_template_system' ),
    'hierarchical'      => true, // true is like category, false is like tags

    // Not used on the frontend
    // 'rewrite' => ['slug' => 'tangible-template-category'],

    // Admin column is renamed in ./extend.php
    'show_admin_column' => true,

    'show_in_menu'      => false,
    'show_in_rest'      => true,
    'labels'            => [
      'singular_name'              => __( 'Template Category', 'tangible_template_system' ),
      'all_items'                  => __( 'All Template Categories', 'tangible_template_system' ),
      'edit_item'                  => __( 'Edit Template Category', 'tangible_template_system' ),
      'view_item'                  => __( 'View Template Category', 'tangible_template_system' ),
      'update_item'                => __( 'Update Template Category', 'tangible_template_system' ),
      'add_new_item'               => __( 'Add New Template Category', 'tangible_template_system' ),
      'new_item_name'              => __( 'New Template Category Name', 'tangible_template_system' ),
      'search_items'               => __( 'Search Template Categories', 'tangible_template_system' ),
      'popular_items'              => __( 'Popular Template Categories', 'tangible_template_system' ),
      'separate_items_with_commas' => __( 'Separate authors with comma', 'tangible_template_system' ),
      'choose_from_most_used'      => __( 'Choose from most used authors', 'tangible_template_system' ),
      'not_found'                  => __( 'No template categories found', 'tangible_template_system' ),
    ],

  ]
);

framework\register_admin_menu([
  'name'  => 'edit-tags.php?taxonomy=tangible_template_category',
  'title' => 'Categories',
  'page_title' => 'Template Categories',
  'capability' => 'manage_options',
  'position' => 80,
  'separator' => 'before'
]);

/**
 * Admin menu highlight
 *
 * Without this, the admin menu tries to open at Posts -> Tags,
 * because it sees edit-tags.php.
 *
 * @see https://stackoverflow.com/questions/32984834/wordpress-show-taxonomy-under-custom-admin-menu
 */
add_filter('parent_file', function( $parent_file ) {
  global $plugin_page, $submenu_file, $post_type, $taxonomy;
  if ( $taxonomy == 'tangible_template_category' ) {
      $plugin_page  = 'edit-tags.php?taxonomy=tangible_template_category'; // the submenu slug
      $submenu_file = 'edit-tags.php?taxonomy=tangible_template_category';    // the submenu slug
  }
  return $parent_file;
});


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
