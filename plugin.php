<?php
/**
 * Plugin Name: Tangible Module: Template System
 * Description: Template system shared by Tangible Blocks and Loops & Logic
 */

require_once __DIR__ . '/index.php';

use tangible\template_system;

add_action('plugins_loaded', function() {
  template_system\is_plugin( true );
}, 1); // After latest module version loaded
