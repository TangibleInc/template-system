<?php
namespace tangible\template_system;
use tangible\template_system;

/**
 * Add submenu item Tangible -> Import / Export
 */
add_action(
  $plugin->is_multisite() ? 'network_admin_menu' : 'admin_menu',
  function() use ( $plugin ) {

    // https://developer.wordpress.org/reference/functions/add_submenu_page/
    add_submenu_page(
      'tangible', // Parent menu slug
      'Import & Export', // Page title
      'Import & Export', // Menu title
      'manage_options', // Capability
      'tangible_template_import_export', // Menu slug
      function() use ( $plugin ) {

        // The form is rendered by JavaScript in /assets/src/template-import-export
        $plugin->enqueue_template_import_export();

        // Nonce is automatically generated and validated by AJAX module in plugin framework.

        ?>
        <div class="wrap">
          <form id="tangible_template_import_export_form"></form>
        </div>
        <?php

      }, // Callback,
      30 // Position
    );

  },
  99 // At the bottom
);
