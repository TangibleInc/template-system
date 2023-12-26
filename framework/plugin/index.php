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

    // Defaults

  ]);
  framework::$state->plugins []= $plugin;
  return $plugin;
}

require_once __DIR__ . '/settings/index.php';
