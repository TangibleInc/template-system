<?php

namespace Tangible\TemplateSystem\Editor;

use Tangible\TemplateSystem\Editor as editor;

require_once __DIR__.'/language.php';
// require_once __DIR__.'/linters.php';
require_once __DIR__.'/enqueue.php';
require_once __DIR__.'/menu.php';

/**
 * TODO: Settings page to enable features under development
 */
if ($system->is_plugin) {
  editor\register_settings_menu();
  editor\register_template_system_menu();
}
