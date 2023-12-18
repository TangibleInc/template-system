<?php
/**
 * Template System
 */

namespace tangible;

use tangible\template_system;

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
  'version' => include __DIR__.'/version.php',
  'path' => __DIR__,
  'url' => untrailingslashit( plugins_url( '/', __FILE__ ) ),
];

require_once __DIR__ . '/framework/index.php';

template_system::$system = $system; // From /admin/system
template_system::$loop   = require_once __DIR__ . '/loop/index.php';
template_system::$logic  = require_once __DIR__ . '/logic/index.php';
template_system::$html   = require_once __DIR__ . '/language/index.php';

// Features depend on above core modules

require_once __DIR__ . '/admin/index.php';
require_once __DIR__ . '/editor/index.php';
