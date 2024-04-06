<?php
/**
 * Module loader: Ensure newest version is loaded when multiple plugins bundle
 * the same module. Module must define: name, version (YYYYMMDD), and load().
 * The function `load()` is called on `plugins_loaded` action at priority 0.
 */
return function($module) {

  $name     = $module->name;
  $priority = 99999999 - absint( $module->version );

  remove_all_filters( $name, $priority ); // Same version

  add_action( $name, function() use ($module) {
    remove_all_filters( $module->name );  // This instance wins
    $module->load();
  }, $priority );

  $ensure_action = function() use ( $name ) {
    if ( ! did_action( $name ) ) do_action( $name );
  };

  if (doing_action('plugins_loaded') || did_action('plugins_loaded')) {
    $ensure_action();
    return;
  }

  add_action('plugins_loaded', $ensure_action, 0);
  add_action('after_setup_theme', $ensure_action, 0);

  if (method_exists($module, 'init')) $module->init();
};
