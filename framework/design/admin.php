<?php
namespace tangible\design;
use tangible\design;
use tangible\framework;
use tangible\template_system;

design::$state->is_plugin = false;

function is_plugin( $set = null ) {
  $is_plugin = &design::$state->is_plugin;
  if (is_bool($set)) {
    $is_plugin = $set;
  }
  return $is_plugin;
}

add_action('plugins_loaded', function() {
  /**
   * Show admin menu Tangible Design
   */
  $show_demo_menu = design\is_plugin() || (
    class_exists('tangible\\template_system') && template_system\is_plugin()
  );
  if (!$show_demo_menu) return;

  $callback = function() {
      
    design\enqueue();
    
    ?><div class="wrap"><?php
    
    include __DIR__ . '/html5-test.html'

    ?></div><?php
  };

  add_action('admin_menu', function() use ($callback) {
    add_menu_page(
      'Tangible Design', // Page title
      'Tangible Design', // Menu title
      'manage_options', // Capability
      'tangible-design', // Menu slug
      $callback, // Callback
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zeGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9Ii01IC01IDEwOSAxMDkiPgoKICAgIDxwYXRoIGQ9Ik0wIDAgSCAzMyBWIDMzIEggMCBMIDAgMCIgZmlsbD0iIzllYTNhOCI+PC9wYXRoPgogICAgPHBhdGggZD0iTTMzIDAgSCA2NiBWIDMzIEggMzMgTCAzMyAwIiBmaWxsPSIjOWVhM2E4Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNNjYgMCBIIDk5IFYgMzMgSCA2NiBMIDY2IDAiIGZpbGw9IiM5ZWEzYTgiPjwvcGF0aD4KCiAgICA8cGF0aCBkPSJNMCAzMyBIIDMzIFYgNjYgSCAwIEwgMCAzMyIgZmlsbD0iIzllYTNhOCI+PC9wYXRoPgogICAgPHBhdGggZD0iTTY2IDMzIEggOTkgViA2NiBIIDY2IEwgNjYgMzMiIGZpbGw9IiM5ZWEzYTgiPjwvcGF0aD4KCiAgICA8cGF0aCBkPSJNMzMgNjYgSCA2NiBWIDk5IEggMzMgTCAzMyA2NiIgZmlsbD0iIzllYTNhOCI+PC9wYXRoPgoKICA8L3N2Zz4=', // Icon
      30 // Position
    );  
  });
}, 10);
