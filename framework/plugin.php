<?php
/**
 * Plugin Name: Tangible: Framework
 * Description: Framework module shared by Tangible plugins
 * Version: 2024.10.21
 * GitHub URI: TangibleInc/framework
 */
use tangible\framework;

require_once __DIR__ . '/index.php';

add_action('plugins_loaded', function() {
  framework::$state->is_plugin = true;
}, 1); // After latest module version loaded
