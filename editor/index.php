<?php
/**
 * Code Editor
 */
namespace tangible\template_system;
use tangible\framework;
use tangible\template_system;
use tangible\template_system\editor;

class editor {
  static $state;
  static $html;
}

editor::$html = tangible_template();
editor::$state = (object) [
  'version' => template_system::$state->version,
  'url' => untrailingslashit( plugins_url('/', __FILE__) ),
];

require_once __DIR__.'/enqueue.php';

/**
 * @see /admin/settings
 */
if (template_system\get_settings('views')) {

  // Remove any notifications that disrupt the IDE screen styling
  add_action('in_admin_header', function () {
    $screen = get_current_screen();
    if (!empty($screen) && $screen->base==='tangible_page_tangible-views') {
      remove_all_actions('admin_notices');
      remove_all_actions('all_admin_notices');
    }
  }, 999);

  framework\register_admin_menu([
    'name'  => 'tangible-views',
    'title' => 'Views',
    'capability' => 'manage_options',
    'callback' => function () {
      editor\load_ide();
    },
    'position' => 50, // After template post types
  ]);
}
