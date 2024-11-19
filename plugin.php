<?php
/**
 * Plugin Name: Tangible Template System
 * Description: Template system shared by Tangible Blocks and Loops & Logic
 * Version: 2024.11.19
 * GitHub URI: TangibleInc/template-system
 */
use tangible\framework;
use tangible\updater;

define('TANGIBLE_TEMPLATE_SYSTEM_IS_PLUGIN', true);

$module_path = is_dir(
  ($path = __DIR__ . '/vendor/tangible')
) ? $path : __DIR__ . '/..';

// require_once $module_path . '/framework/index.php';
require_once $module_path . '/updater/index.php';
require_once __DIR__ . '/index.php';

add_action('plugins_loaded', function() {
  updater\register_plugin([
    'name' => 'tangible-template-system',
    'file' => __FILE__,    
  ]);
});
