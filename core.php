<?php
/**
 * Template System
 */

namespace tangible;

use tangible\template_system;

// System

class template_system {
  static $state;
}

template_system::$state = (object) [
  'version' => include __DIR__.'/version.php',
  'path' => __DIR__,
  'url' => plugins_url( '/', __FILE__ ),
];

// Core modules

require_once __DIR__ . '/framework/index.php';
require_once __DIR__ . '/loop/index.php';
require_once __DIR__ . '/logic/index.php';
require_once __DIR__ . '/language/index.php';

// Features depend on above modules

require_once __DIR__ . '/admin/index.php';
require_once __DIR__ . '/editor/index.php';
