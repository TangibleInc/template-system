<?php

/**
 * Add top-level admin menu
 *
 * @see https://developer.wordpress.org/reference/functions/add_menu_page/
 */

if ( ! is_admin()) return;

add_action(
  $plugin->is_multisite() ? 'network_admin_menu' : 'admin_menu',
  function() use ( $framework, $plugin ) {

    add_menu_page(
      'Tangible', // Page title
      'Tangible', // Menu title
      'manage_options', // Capability
      'tangible', // Menu slug
      '', // Callback
      $framework->tangible_dashicon, // Icon - See vendor/plugin-framework/settings/menu.php
      30 // Position
    );

    // Remove the extra submenu item "Tangible"
    remove_submenu_page( 'tangible', 'tangible' );

  }
);
