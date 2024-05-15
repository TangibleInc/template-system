<?php
namespace tangible\template_system\admin;
use tangible\template_system;

/**
 * Template post type(s)
 */

$plugin->template_post_types = apply_filters('tangible_template_post_types', [
  'tangible_block',
  'tangible_content',
  'tangible_layout',
  'tangible_script',
  'tangible_style',
  'tangible_template',
]);

/**
 * Post types with location rules editor
 *
 * @see ../editor/fields.php
 * @see ../location/admin/column.php
 */
$plugin->template_post_types_with_location = [
  'tangible_style',
  'tangible_script',
  'tangible_layout',
];

// Post type extensions
require_once __DIR__ . '/sortable-post-type/index.php';
require_once __DIR__ . '/duplicate-post/index.php';

require_once __DIR__ . '/extend.php';
require_once __DIR__ . '/register.php';

/**
 * Register post types
 */
add_action('init', function() use ( $plugin ) {

  /**
   * Post types: These will show in the admin menu in this order
   */

  $plugin->register_template_post_type([
    'post_type'   => 'tangible_template',
    'single'      => 'Template',
    'plural'      => 'Templates',
    'description' => 'Templates for Tangible Template System',
  ]);

  $plugin->register_template_post_type([
    'post_type'   => 'tangible_layout',
    'single'      => 'Layout',
    'plural'      => 'Layouts',
    'description' => 'Layouts for Tangible Template System',
  ]);

  $plugin->register_template_post_type([
    'post_type'   => 'tangible_style',
    'single'      => 'Style',
    'plural'      => 'Styles',
    'description' => 'Styles for Tangible Template System',
  ]);

  $plugin->register_template_post_type([
    'post_type'   => 'tangible_script',
    'single'      => 'Script',
    'plural'      => 'Scripts',
    'description' => 'Scripts for Tangible Template System',
  ]);

  // Content structure templates

  if (template_system\get_settings('content')) {
    $plugin->register_template_post_type([
      'post_type'   => 'tangible_content',
      'single'      => 'Content',
      'plural'      => 'Content',
      'description' => 'Content structure templates for Tangible Template System'
    ]);
  }

  require_once __DIR__ . '/taxonomy.php';

});
