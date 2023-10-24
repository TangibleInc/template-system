<?php

use Tangible\TemplateSystem as system;

require_once __DIR__ . '/message/index.php';

/**
 * ACF Template field
 * 
 * Deprecated because ACF loads field JS & CSS on every admin screen.
 * 
 * @see /admin/settings
 */
if ( system\get_settings('acf_template_field') === true) {
  require_once __DIR__ . '/template/index.php';
}
