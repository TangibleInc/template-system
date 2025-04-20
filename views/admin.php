<?php
namespace tangible\template_system\view;

use tangible\framework;
use tangible\template_system;

/**
 * Optional for now
 * @see /admin/settings
 */
if (!template_system\get_settings('views')) return;

// Remove any notifications that disrupt the IDE screen styling
add_action('in_admin_header', function () {
  $screen = get_current_screen();
  if (!empty($screen) && $screen->base==='tangible_page_tangible-view') {
    remove_all_actions('admin_notices');
    remove_all_actions('all_admin_notices');
  }
}, 999);

framework\register_admin_menu([
  'name'  => 'tangible-views',
  'title' => 'Views',
  'capability' => 'manage_options',
  'callback' => 'tangible\\template_system\\view\\load', // See ./enqueue
  'position' => 50, // After template post types
]);
