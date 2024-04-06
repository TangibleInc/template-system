<?php
namespace tangible\template_system;
use tangible\framework;
use tangible\template_system;

/**
 * Add submenu item Tangible -> Import / Export
 */
framework\register_admin_menu([
  'name'  => 'tangible_template_import_export',
  'title' => 'Import & Export',
  'position' => 120,
  'capability' => 'manage_options',
  'callback' => function() use ( $plugin ) {

    // The form is rendered by JavaScript in /assets/src/template-import-export
    $plugin->enqueue_template_import_export();

    // Nonce is automatically generated and validated by AJAX module in plugin framework.

    ?>
    <div class="wrap">
      <form id="tangible_template_import_export_form"></form>
    </div>
    <?php
  },
]);
