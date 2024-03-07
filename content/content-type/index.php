<?php
use tangible\format;

/**
 * Register post type
 *
 * @see https://developer.wordpress.org/reference/functions/register_post_type/
 */

$html->registered_content_types = []; // name => config

$html->register_content_type = function($name, $config) use ($html) {
  $html->registered_content_types[ $name ] = $config;
};

// Call from "init" action
$html->init_content_types = function() use ($html) {
  foreach ($html->registered_content_types as $name => $config) {
    $html->create_content_type($name, $config);
  };
};

/**
 * Reserved post types
 *
 * @see https://developer.wordpress.org/reference/functions/register_post_type/#reserved-post-types
 */
$html->reserved_post_types = array_reduce([
  'post',
  'page',
  'attachment',
  'revision',
  'nav_menu_item',
  'custom_css',
  'customize_changeset',
  'oembed_cache',
  'user_request',
  'wp_block',

  'action',
  'author',
  'order',
  'theme'
], function($types, $type) {
  $types[ $type ] = true;
  return $types;
}, []);

/**
 * Post type must declare Gutenberg support
 */
add_filter('gutenberg_can_edit_post_type', function($can_edit, $post_type) use ($html) {

  if ( ! isset($html->registered_content_types[ $post_type ]) ) return $can_edit;

  return isset($html->registered_content_types[ $post_type ]['gutenberg'])
    ? $html->registered_content_types[ $post_type ]['gutenberg']
    : false
  ;
}, 10, 2);

/**
 * Create
 */

$html->create_content_type = function($name, $config) use ($html) {

  if (isset($html->reserved_post_types[ $name ])) {
    trigger_error("Post type name \"{$name}\" is reserved", E_USER_WARNING);
    return;
  }

  // Shortcuts

  if (isset($config['title'])) {
    $single = $config['title'];
    unset($config['title']);
  } else {
    $single = ucfirst($name);
  }

  if (isset($config['title_plural'])) {
    $plural = $config['title_plural'];
    unset($config['title_plural']);
  } else {
    $plural = $single . 's';
  }

  /**
   * Associated taxonomies
   */

  if (isset($config['taxonomy'])) {
    $config['taxonomies'] = $config['taxonomy'];
    unset($config['taxonomy']);
  }

  if (!isset($config['taxonomies'])) {
    $config['taxonomies'] = [];
  }

  foreach ($html->registered_taxonomies as $taxonomy_name => $taxonomy_config) {
    if (in_array($name, $taxonomy_config['post_type'])) {
      $config['taxonomies'] []= $taxonomy_name;
    }
  }

  // Labels

  $config['labels'] = array_merge([
    'name'                  => $plural,
    'singular_name'         => $single,
    'menu_name'             => $plural,
    'name_admin_bar'        => $single,
    'archives'              => "$single Archives",
    'parent_item_colon'     => "Parent $single:",
    'all_items'             => "All $plural",
    'add_new_item'          => "Add New $single",
    'add_new'               => 'Add New',
    'new_item'              => "New $single",
    'edit_item'             => "Edit $single",
    'update_item'           => "Update $single",
    'view_item'             => "View $single",
    'search_items'          => "Search $single",
    'not_found'             => 'Not found',
    'not_found_in_trash'    => 'Not found in Trash',
    'featured_image'        => 'Featured Image',
    'set_featured_image'    => 'Set featured image',
    'remove_featured_image' => 'Remove featured image',
    'use_featured_image'    => 'Use as featured image',
    'insert_into_item'      => "Insert into $single",
    'uploaded_to_this_item' => 'Uploaded to this '.strtolower($single),
    'items_list'            => "$plural list",
    'items_list_navigation' => "$plural list navigation",
    'filter_items_list'     => 'Filter '.strtolower($plural).' list',
  ], isset($config['labels']) ? $config['labels'] : []);

  /**
   * Menu icon: Dashicon class name or SVG
   *
   * The SVG element should have width="20" height="20", and the path fill="black".
   * That allows WP core to apply styling such as hover color.
   */

  if (isset($config['icon'])) {
    $config['menu_icon'] = $config['icon'];
    unset($config['icon']);
  }

  if (isset($config['menu_icon'])) {

    $icon = trim($config['menu_icon']);

    // Convert SVG to data attribute
    if (substr($icon, 0, 4)==='<svg') {
      $icon = 'data:image/svg+xml;base64,' . base64_encode(
        $icon
      );
    } elseif ($icon!=='none' && substr($icon, 0, 10)!=='dashicons-') {
      $icon = 'dashicons-'.$icon;
    }

    $config['menu_icon'] = $icon;
  }

  $config = array_merge([
    'label'                 => $single,
    'description'           => '',
    'capability_type'       => 'page',
    'menu_icon'             => 'dashicons-editor-code',
  ], $config);

  // For these non-string types, convert given value based on default
  foreach ([

    'supports'              => ['title', 'editor'], // , 'page-attributes'

    'hierarchical'          => true,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'menu_position'         => 8,
    'show_in_admin_bar'     => false,
    'show_in_nav_menus'     => false,
    'can_export'            => true,
    'has_archive'           => false,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,

    'show_in_rest'          => false,

    // Alias
    'gutenberg'             => false,

  ] as $key => $default_value) {

    if (!isset($config[ $key ])) {
      $config[ $key ] = $default_value;
      continue;
    }

    if (is_integer($default_value)) {
      $config[ $key ] = (int) $config[ $key ];
    } elseif (is_bool($default_value)) {
      $config[ $key ] = $config[ $key ]===true || $config[ $key ]==='true';
    } elseif (is_array($default_value)) {
      $config[ $key ] = is_array($config[ $key ])
        ? $config[ $key ]
        : format\multiple_values($config[ $key ])
      ;
    }
  }

  // Enable/disable Gutenberg

  if ($config['gutenberg']) {
    if (!in_array('editor', $config['supports'])) {
      $config['supports'] []= 'editor';
    }
    $config['show_in_rest'] = true;
  }

  unset($config['gutenberg']);

  // tangible\see('Create type', $name, $config);

  register_post_type($name, $config);
};
