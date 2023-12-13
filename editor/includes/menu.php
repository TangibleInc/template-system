<?php
namespace tangible\template_system\editor;
use tangible\template_system\editor;

function register_template_system_menu() {

  add_action(
    is_multisite() ? 'network_admin_menu' : 'admin_menu',
    function() {

      // See /system/post-types/extend.php for menu separator

      add_submenu_page(
        'tangible', // Parent menu slug
        'Template System', // Page title
        'Template System', // Menu title
        'manage_options', // Capability
        'tangible-template-system', // Menu slug
        function () {
          editor\load_ide();
        }, // Callback
        0 // Position
      );
    },
    10
  );
}
