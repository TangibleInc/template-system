<?php

/**
 * Template System
 * 
 * Currently consolidating features to remove dependencies, such as:
 * 
 * - jQuery -> Vanilla JS or React 
 * - Tangible Plugin Framework - See ./framework
 */

namespace Tangible;

use Tangible\TemplateSystem as system;

// System

class TemplateSystem {
  static $state;
}

system::$state = (object) [
  'version' => require_once __DIR__.'/version.php',
  'path' => __DIR__,
  'url' => plugins_url( '/', realpath( __FILE__ ) ),
];

// Core modules

require_once __DIR__ . '/framework/index.php';
require_once __DIR__ . '/interface/index.php';
require_once __DIR__ . '/loop/index.php';
require_once __DIR__ . '/logic/index.php';
require_once __DIR__ . '/template/index.php';

// Features depend on above modules

require_once __DIR__ . '/admin/index.php';
require_once __DIR__ . '/editor/index.php';
require_once __DIR__ . '/cloud/index.php';
