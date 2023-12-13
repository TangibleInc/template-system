<?php
namespace tangible\template_system;
use tangible\template_system;

/**
 * Show menu only for admins who can edit templates
 */
if (!(is_admin() && template_system\can_user_edit_template())) return;

/**
 * Admin menu
 * @see https://developer.wordpress.org/reference/functions/add_menu_page/
 * @see https://developer.wordpress.org/reference/functions/add_submenu_page/
 */

add_action(
  // is_multisite() ? 'network_admin_menu' : 'admin_menu',
  'admin_menu',
  function() {
    add_menu_page(
      'Tangible', // Page title
      'Tangible', // Menu title
      'manage_options', // Capability
      'tangible', // Menu slug
      '', // Callback
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zeGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9Ii01IC01IDEwOSAxMDkiPgoKICAgIDxwYXRoIGQ9Ik0wIDAgSCAzMyBWIDMzIEggMCBMIDAgMCIgZmlsbD0iIzllYTNhOCI+PC9wYXRoPgogICAgPHBhdGggZD0iTTMzIDAgSCA2NiBWIDMzIEggMzMgTCAzMyAwIiBmaWxsPSIjOWVhM2E4Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNNjYgMCBIIDk5IFYgMzMgSCA2NiBMIDY2IDAiIGZpbGw9IiM5ZWEzYTgiPjwvcGF0aD4KCiAgICA8cGF0aCBkPSJNMCAzMyBIIDMzIFYgNjYgSCAwIEwgMCAzMyIgZmlsbD0iIzllYTNhOCI+PC9wYXRoPgogICAgPHBhdGggZD0iTTY2IDMzIEggOTkgViA2NiBIIDY2IEwgNjYgMzMiIGZpbGw9IiM5ZWEzYTgiPjwvcGF0aD4KCiAgICA8cGF0aCBkPSJNMzMgNjYgSCA2NiBWIDk5IEggMzMgTCAzMyA2NiIgZmlsbD0iIzllYTNhOCI+PC9wYXRoPgoKICA8L3N2Zz4=', // Icon
      30 // Position
    );

    // Remove the extra submenu item "Tangible"
    remove_submenu_page( 'tangible', 'tangible' );
  }
);

add_action(
  // is_multisite() ? 'network_admin_menu' : 'admin_menu',
  'admin_menu',
  function() {
    add_submenu_page(
      'tangible', // Parent menu slug
      'Settings', // Page title
      'Settings', // Menu title
      'manage_options', // Capability
      'tangible-template-system-settings', // Menu slug
      __NAMESPACE__ . '\\settings_page', // Callback
      30 // Position
    );
  },
  100 // After all other menu items in /system/post-types/menu
);  
