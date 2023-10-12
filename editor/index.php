<?php
/**
 * Code Editor
 * 
 * Organize features as editor::$state and editor\action(), in the same
 * pattern as System module.
 */
namespace Tangible\TemplateSystem;

use Tangible\TemplateSystem as system;
use Tangible\TemplateSystem\Editor as editor;

class Editor {
  static $state;
  static $html;
}

editor::$html = tangible_template();
editor::$state = (object) [
  'version' => system::$state->version,
  'url' => untrailingslashit( plugins_url('/', realpath(__FILE__)) ),
];

require_once __DIR__.'/includes/index.php';
