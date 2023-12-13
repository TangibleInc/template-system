<?php
namespace tangible\plugin;
use tangible\framework;

framework::$state->plugins = [];

/**
 * Register a plugin
 * 
 * Call this from action `plugins_loaded`.
 */
function register($plugin) {
  framework::$state->plugins []= $plugin;
}

require_once __DIR__.'/settings.php';
