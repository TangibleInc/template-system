<?php
/**
 * Template post type(s)
 */

$plugin->template_post_types = [
  'tangible_template',
  'tangible_style',
  'tangible_script',
  'tangible_layout',
  'tangible_content',
];

/**
 * Post types with location rules editor
 *
 * @see ../editor/fields.php
 * @see ../location/admin/column.php
 */
$plugin->template_post_types_with_location = [
  'tangible_style',
  'tangible_script',
  'tangible_layout'
];

require_once __DIR__.'/menu.php';
require_once __DIR__.'/extend.php';
require_once __DIR__.'/register.php';


/**
 * Register post types
 */
add_action('init', function() use ($plugin) {

  /**
   * Post types: These will show in the admin menu in this order
   */

  $plugin->register_template_post_type([
    'post_type'   => 'tangible_template',
    'single'      => 'Template',
    'plural'      => 'Templates',
    'description' => 'Templates for Loops & Logic'
  ]);

  $plugin->register_template_post_type([
    'post_type'   => 'tangible_style',
    'single'      => 'Style',
    'plural'      => 'Styles',
    'description' => 'Styles for Loops & Logic'
  ]);

  $plugin->register_template_post_type([
    'post_type'   => 'tangible_script',
    'single'      => 'Script',
    'plural'      => 'Scripts',
    'description' => 'Scripts for Loops & Logic'
  ]);

  $plugin->register_template_post_type([
    'post_type'   => 'tangible_layout',
    'single'      => 'Layout',
    'plural'      => 'Layouts',
    'description' => 'Layouts for Loops & Logic'
  ]);

  // TODO: Content structure templates

  // $plugin->register_template_post_type([
  //   'post_type'   => 'tangible_content',
  //   'single'      => 'Content',
  //   'plural'      => 'Content',
  //   'description' => 'Content structure templates for Loops & Logic'
  // ]);

  require_once __DIR__.'/taxonomy.php';

});
