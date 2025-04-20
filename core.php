<?php
/**
 * Template System
 * 
 * Each feature is organized as a set of state and functions in a namespace, like
 * `tangible\template_system`. A class of the same name is used to reference shared
 * state as a static property.
 * 
 * Previously, a module defined a global function like `tangible_loop` to access a
 * singleton, and was assigned to a variable in the local scope such as `$loop`.
 * This pattern is deprecated and will be gradually replaced.
 */

namespace tangible;
use tangible\framework;

class template_system {

  static $state;

  static $system; // tangible_template_system()
  static $loop;   // tangible_loop()
  static $logic;  // tangible_logic()
  static $html;   // tangible_template()
}

template_system::$state = (object) [
  'version' => '20250420', // Automatically updated with npm run version
  'path' => __DIR__,
  'url' => framework\module_url( __FILE__ ),
];

template_system::$system = $plugin = $system; // From /admin/system

require_once __DIR__ . '/logic/module.php';
template_system::$logic  = $logic  = require_once __DIR__ . '/modules/logic-v1/index.php';
template_system::$loop   = $loop   = require_once __DIR__ . '/loop/index.php';
template_system::$html   = $html   = require_once __DIR__ . '/language/index.php';

// Workaround for circular dependency
\Tangible\Loop\BaseLoop::$html = $html;

require_once __DIR__ . '/modules/index.php';
require_once __DIR__ . '/integrations/index.php';

// Features that depend on above modules

require_once __DIR__ . '/admin/index.php';
require_once __DIR__ . '/editor/index.php';
require_once __DIR__ . '/content/index.php';
require_once __DIR__ . '/form/index.php';
require_once __DIR__ . '/views/index.php';
