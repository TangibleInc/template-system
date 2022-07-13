<?php
/**
 * Plugin Name: Tangible Module: Template System
 * Description: Template system shared by Tangible Blocks and Loops & Logic
 */

require_once __DIR__ . '/index.php';

add_action('plugins_loaded', function() {
  $system = tangible_template_system();
  if (!empty($system)) $system->is_plugin = true;
}, 1); // After latest module version loaded
