<?php
use tangible\framework;

/**
 * Register template post type
 *
 * @see https://developer.wordpress.org/reference/functions/register_post_type/
 */
$plugin->register_template_post_type = function( $config ) {

  /**
   * Extract required config properties into variables
   */
  foreach ( [
    'post_type',
    'single',
    'plural',
    'description',
  ] as $key ) {
    $$key = $config[ $key ];
  }

  $labels = [
    'name'                  => 'Tangible ' . $plural,
    'singular_name'         => 'Tangible ' . $single,

    'menu_name'             => $plural,

    'name_admin_bar'        => $single,
    'archives'              => $single . ' Archives',
    'parent_item_colon'     => 'Parent ' . $single . ':',

    'all_items'             => $plural, // 'All ' . $plural . '',

    'add_new_item'          => 'Add New ' . $single,
    'add_new'               => 'Add New',
    'new_item'              => 'New ' . $single,
    'edit_item'             => 'Edit ' . $single,
    'update_item'           => 'Update ' . $single,
    'view_item'             => 'View ' . $single,
    'search_items'          => 'Search ' . $single,
    'not_found'             => 'Not found',
    'not_found_in_trash'    => 'Not found in Trash',
    'featured_image'        => 'Featured Image',
    'set_featured_image'    => 'Set featured image',
    'remove_featured_image' => 'Remove featured image',
    'use_featured_image'    => 'Use as featured image',
    'insert_into_item'      => 'Insert into ' . $single,
    'uploaded_to_this_item' => 'Uploaded to this ' . strtolower( $single ),
    'items_list'            => $plural . ' list',
    'items_list_navigation' => $plural . ' list navigation',
    'filter_items_list'     => 'Filter ' . strtolower( $plural ) . ' list',
  ];

  $args = [
    'description'         => $description,
    'labels'              => $labels,
    'supports'            => [ 'title' ], // , 'page-attributes', 'editor'

    'capability_type'     => 'options',
    'capabilities'        => [
      'edit_post'          => 'manage_options',
      'read_post'          => 'manage_options',
      'delete_post'        => 'manage_options',
      'edit_posts'         => 'manage_options',
      'edit_others_posts'  => 'manage_options',
      'publish_posts'      => 'manage_options',
      'read_private_posts' => 'manage_options',
      'create_posts'       => 'manage_options',
    ],

    'public'              => true,
    'hierarchical'        => false,

    'has_archive'         => false,

    /**
     * Enabling the following two will show permalink edit field. However, it also makes
     * public URLs for templates.
     */
    'rewrite'             => false,
    'publicly_queryable'  => false,

    /**
     * Menu position
     *
     * Default: null – defaults to below Comments
     *
     * 5 – below Posts
     * 10 – below Media
     * 15 – below Links
     * 20 – below Pages
     * 25 – below comments
     * 60 – below first separator
     * 65 – below Plugins
     * 70 – below Users
     * 75 – below Tools
     * 80 – below Settings
     * 100 – below second separator
     */
    'menu_position'       => 30,

    /**
     * Menu icon
     *
     * - The url to the icon to be used for this menu.
     * - Pass a base64-encoded SVG using a data URI, which will be colored to match
     * the color scheme -- this should begin with 'data:image/svg+xml;base64,'.
     * - Pass the name of a Dashicons helper class to use a font icon, e.g. 'dashicons-chart-pie'.
     * - Pass 'none' to leave div.wp-menu-image empty so an icon can be added via CSS. Defaults to use the posts icon.
     */
    'menu_icon'           => 'dashicons-editor-code',

    'show_ui'             => true,

    /**
     * Where to show the post type in the admin menu - true/false or string for sub menu
     */
    'show_in_menu'        => false, // 'tangible', // true,

    'show_in_admin_bar'   => false,
    'show_in_nav_menus'   => false,
    'show_in_rest'        => false,

    'can_export'          => true,
    'exclude_from_search' => true,

  ];

  if ( isset( $config['args'] ) ) {
    $args = array_merge( $args, $config['args'] );
  }

  register_post_type( $post_type, $args );

  framework\register_admin_menu([
    'name'  => "edit.php?post_type=$post_type",
    'title' => $plural,
    'page_title' => 'Tangible ' . $plural,
    'capability' => 'manage_options'
  ]);

};
