<?php
namespace tangible\template_system;
use tangible\framework;
use tangible\template_system;

/**
 * Show menu only for admins who can edit templates
 */
if (!(is_admin() && template_system\can_user_edit_template())) return;

framework\register_admin_menu([
  'name'  => 'tangible-template-system-settings',
  'title' => 'Settings',
  'position' => 180, // After all other menu items in /admin/post-types/menu
  'capability' => 'manage_options',
  'callback' => __NAMESPACE__ . '\\settings_page',
]);
