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
 * @see /admin/settigs
 */
if (template_system\get_settings('views')) {

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
