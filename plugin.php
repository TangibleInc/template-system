<?php
/**
 * Plugin Name: Tangible Template System
 * Description: Template system shared by Tangible Blocks and Loops & Logic
 * Version: 2025.4.20
 * GitHub URI: TangibleInc/template-system
 * Author: Team Tangible
 * Author URI: https://teamtangible.com
 * License: GPLv2 or later
 */
use tangible\framework;
use tangible\updater;

define('TANGIBLE_TEMPLATE_SYSTEM_IS_PLUGIN', true);

$module_path = is_dir(
  ($path = __DIR__ . '/../../tangible') // Module
) ? $path : __DIR__ . '/vendor/tangible'; // Plugin

require_once $module_path . '/framework/index.php';
require_once $module_path . '/fields/index.php';
require_once $module_path . '/updater/index.php';
require_once __DIR__ . '/index.php';

add_action('plugins_loaded', function() {
  updater\register_plugin([
    'name' => 'tangible-template-system',
    'file' => __FILE__,    
  ]);
});
