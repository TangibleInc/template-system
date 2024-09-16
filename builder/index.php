<?php
/**
 * Builder - Unified interface to edit and manage all template types, libraries, assets.
 */
namespace tangible\template_system;

use tangible\template_system;
use tangible\template_system\builder;

class builder {
  static $state;
}

builder::$state = (object) [
  'version' => template_system::$state->version,
  'url' => untrailingslashit( plugins_url('/', __FILE__) ),
];

require_once __DIR__ . '/admin.php';
require_once __DIR__ . '/enqueue.php';
