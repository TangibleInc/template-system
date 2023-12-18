<?php
/**
 * Code Editor
 * 
 * Organize features as editor::$state and editor\action(), in the same
 * pattern as System module.
 */
namespace tangible\template_system;
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
require_once __DIR__.'/menu.php';

/**
 * @see /admin/settigs
 */
if (template_system\get_settings('ide')) {
  editor\register_template_system_menu();
}
