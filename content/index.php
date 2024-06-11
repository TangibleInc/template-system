<?php
use tangible\framework;
use tangible\template_system;

/**
 * Create content structure: post types, field groups, taxonomies, user roles
 */

require_once __DIR__ . '/content-type/index.php';
require_once __DIR__ . '/field-group/index.php';
require_once __DIR__ . '/taxonomy/index.php';
require_once __DIR__ . '/metabox/index.php';
require_once __DIR__ . '/tags/index.php';
require_once __DIR__ . '/site-structure/index.php';

add_action('init', function() use ( $html ) {

  /**
   * @see /admin/template-post/data.php
   * @see ./tags for supported content tags
   */
  $templates = template_system\get_all_templates( 'tangible_content' );

  foreach ($templates as $template) {
    if (isset($template['content'])) {
      $html->render_content_tags( $template['content'] );
    }
  }

  $html->init_content_types();
  $html->init_field_groups();

  $html->init_taxonomies();
  $html->init_metaboxes();
});

/**
 * Admin settings to enable the feature
 * @see /admin/settings
 * 
 * Registered as post type
 * @see /admin/post-types/index.php
 */
// if (template_system\get_settings('content')) {
  // framework\register_admin_menu([
  //   'name'  => 'tangible-content',
  //   'title' => 'Content',
  //   'capability' => 'manage_options',
  //   'callback' => function () {
  //   },
  //   'position' => 32, // After Template
  // ]);
// }
