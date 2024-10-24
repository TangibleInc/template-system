<?php
namespace tangible\framework;
use tangible\framework;

framework::$state->plugins = [];

/**
 * Register a plugin
 * 
 * Call this from action `plugins_loaded`. This is meant to support a minimum
 * subset of the plugin framework to ease migration.
 */
function register_plugin($config) {

  // Object with dynamic properties and methods - See ../object
  $plugin = \tangible\create_object($config + [

    // ..Defaults..

  ]);

  framework::$state->plugins []= $plugin;

  framework\load_plugin_features( $plugin );
  framework\check_plugin_dependencies( $plugin );

  if (isset($plugin->settings)) {
    framework\register_plugin_settings($plugin, $plugin->settings);
  }

  return $plugin;
}

function register_theme($config) {
  return register_plugin($config + [
    'is_theme' => true
  ]);
}

require_once __DIR__ . '/dependencies/index.php';
require_once __DIR__ . '/features/index.php';
require_once __DIR__ . '/settings/index.php';
