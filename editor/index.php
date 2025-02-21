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
  'url' => framework\module_url( __FILE__ ),
];

require_once __DIR__.'/enqueue.php';
