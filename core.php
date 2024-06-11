<?php
/**
 * Template System
 */

namespace tangible;

class template_system {

  static $state;

  /**
   * Reference to previous style of code organization with global functions
   * 
   * These are here to provide a backward-compatible "bridge", to be replaced
   * by feature state and methods defined in namespace `tangible`.
   */
  static $system; // tangible_template_system()
  static $loop;   // tangible_loop()
  static $logic;  // tangible_logic()
  static $html;   // tangible_template()
}

template_system::$state = (object) [
  'version' => '20240611', // Automatically updated with npm run version
  'path' => __DIR__,
  'url' => untrailingslashit( plugins_url( '/', __FILE__ ) ),
];

template_system::$system = $plugin = $system; // From /admin/system

require_once __DIR__ . '/logic/module.php';

template_system::$logic  = $logic  = require_once __DIR__ . '/modules/logic-v1/index.php';
template_system::$loop   = $loop   = require_once __DIR__ . '/loop/index.php';
template_system::$html   = $html   = require_once __DIR__ . '/language/index.php';

\Tangible\Loop\BaseLoop::$html = $html;

require_once __DIR__ . '/modules/index.php';
require_once __DIR__ . '/integrations/index.php';

// Features that depend on above modules

require_once __DIR__ . '/admin/index.php';
require_once __DIR__ . '/editor/index.php';
require_once __DIR__ . '/content/index.php';
require_once __DIR__ . '/form/index.php';
require_once __DIR__ . '/views/index.php';
