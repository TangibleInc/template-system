<?php

namespace Tangible\TemplateSystem\Editor;

use Tangible\TemplateSystem as system;
use Tangible\TemplateSystem\Editor as editor;

require_once __DIR__.'/language.php';
// require_once __DIR__.'/linters.php';
require_once __DIR__.'/enqueue.php';
require_once __DIR__.'/menu.php';

/**
 * @see /admin/settigs
 */
if (system\get_settings('ide')) {
  editor\register_template_system_menu();
}
