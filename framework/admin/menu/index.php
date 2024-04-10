<?php
namespace tangible\framework;
use tangible\framework;
use tangible\template_system;

/**
 * Admin menu
 * @see https://developer.wordpress.org/reference/functions/add_menu_page/
 * @see https://developer.wordpress.org/reference/functions/add_submenu_page/
 */

framework::$state->admin_menus = [];

require_once __DIR__ . '/separator.php';

function get_admin_menus() {
  return framework::$state->admin_menus;
}

function sort_admin_menus() {
  // Sort by position
  $items = &framework::$state->admin_menus;
  usort($items, function($a, $b) {
    $p1 = $a['position'] ?? 0;
    $p2 = $b['position'] ?? 0;
    return $p1 > $p2 ? 1 : ($p1 < $p2 ? -1 : 0);
  });
  return $items;
}

function register_admin_menu($item) {

  $items = &framework::$state->admin_menus;

  if (!isset($item['name'])) {
    throw new Exception("Property \"name\" is required");
  }

  if (!isset($item['title'])) {
    $item['title'] = $item['name'];
  }

  if (!isset($item['callback'])) {
    $item['callback'] = '';
  }

  // By default, show in the order they were registered
  if (!isset($item['position'])) {
    $item['position'] = count($items) * 5;
  }

  $items []= $item;
}

add_action(
  'admin_menu', // is_multisite() ? 'network_admin_menu' : 'admin_menu'
  function() {

    // Only show if at least one menu item is registered
    $items = framework\sort_admin_menus();
    if (empty($items)) return;

    add_menu_page(
      'Tangible', // Page title
      'Tangible', // Menu title
      'manage_options', // Capability
      'tangible', // Menu slug
      '', // Callback
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zeGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9Ii01IC01IDEwOSAxMDkiPgoKICAgIDxwYXRoIGQ9Ik0wIDAgSCAzMyBWIDMzIEggMCBMIDAgMCIgZmlsbD0iIzllYTNhOCI+PC9wYXRoPgogICAgPHBhdGggZD0iTTMzIDAgSCA2NiBWIDMzIEggMzMgTCAzMyAwIiBmaWxsPSIjOWVhM2E4Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNNjYgMCBIIDk5IFYgMzMgSCA2NiBMIDY2IDAiIGZpbGw9IiM5ZWEzYTgiPjwvcGF0aD4KCiAgICA8cGF0aCBkPSJNMCAzMyBIIDMzIFYgNjYgSCAwIEwgMCAzMyIgZmlsbD0iIzllYTNhOCI+PC9wYXRoPgogICAgPHBhdGggZD0iTTY2IDMzIEggOTkgViA2NiBIIDY2IEwgNjYgMzMiIGZpbGw9IiM5ZWEzYTgiPjwvcGF0aD4KCiAgICA8cGF0aCBkPSJNMzMgNjYgSCA2NiBWIDk5IEggMzMgTCAzMyA2NiIgZmlsbD0iIzllYTNhOCI+PC9wYXRoPgoKICA8L3N2Zz4=', // Icon
      30 // Position
    );

    // Add exception for Tangible Blocks without Editor add-on
    $is_blocks_basic = function_exists('tangible_blocks')
      && !function_exists('tangible_blocks_editor')
      // And no other standalone plugin
      && !function_exists('tangible_loops_and_logic')
      && !template_system\is_plugin()
    ;
    $remove_items = $is_blocks_basic
      ? [
        'Templates',
        'Layouts',
        'Styles',
        'Scripts',
        'Settings',
      ]
      : []
    ;

    // Add menu items
    foreach ($items as $item) {

      $title = $item['title'];

      if ($is_blocks_basic) {
        if (in_array($title, $remove_items)) continue;
        if ($title==='Import & Export') {
          $title = 'Import';
        }
      }

      add_submenu_page(
        'tangible', // Parent menu slug
        $item['page_title'] ?? $title, // Page title
        $title, // Menu title
        $item['capability'] ?? 'manage_options',
        $item['name'], // Menu slug
        $item['callback'],
        $item['position'] // This doesn't make a difference in menu item order
      );  
    }
  },
  10
);

// Remove the extra submenu item "Tangible"
add_action('admin_menu', function() {
  remove_submenu_page( 'tangible', 'tangible' );
}, 999);

/**
 * Workaround for older version of Tangible Blocks removing menu items
 * at `admin_head` action priority 9.
 */

framework::$state->submenu = null;
add_action('admin_head', function() {
  global $submenu;
  framework::$state->submenu = $submenu['tangible'] ?? null;
}, 8);

add_action('admin_head', function() {
  global $submenu;
  if (isset($submenu['tangible'])) {
    $submenu['tangible'] = framework::$state->submenu;
  }
}, 10);
