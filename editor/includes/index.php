<?php
namespace tangible\template_system;
use tangible\template_system;
use tangible\template_system\editor;

require_once __DIR__.'/enqueue.php';
require_once __DIR__.'/menu.php';

/**
 * @see /admin/settigs
 */
if (template_system\get_settings('ide')) {
  editor\register_template_system_menu();
}
