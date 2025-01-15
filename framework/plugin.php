<?php
/**
 * Plugin Name: Tangible Framework
 * Description: Framework module shared by Tangible plugins
 * Version: 2025.01.15
 * GitHub URI: TangibleInc/framework
 */
use tangible\framework;

define('TANGIBLE_FRAMEWORK_IS_PLUGIN', true);

require_once __DIR__ . '/index.php';

add_action('plugins_loaded', function() {
  framework::$state->is_plugin = true;
}, 1); // After latest module version loaded
