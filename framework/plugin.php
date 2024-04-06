<?php
/**
 * Plugin Name: Tangible: Framework
 * Description: Framework module shared by Tangible plugins
 * Version: 20240322
 * GitHub Plugin URI: https://github.com/tangibleinc/framework
 */
use tangible\design;

require_once __DIR__ . '/index.php';

add_action('plugins_loaded', function() {
  design\is_plugin(true);
}, 1); // After latest module version loaded
