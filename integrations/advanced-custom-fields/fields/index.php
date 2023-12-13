<?php
use tangible\template_system;

require_once __DIR__ . '/message/index.php';

/**
 * ACF Template field
 * 
 * Load only when optional setting is enabled, because ACF loads field JS & CSS
 * on **every admin screen**.  We can load it by default after figuring out how
 * to fetch field JS & CSS on demand using frontend module loader.
 * 
 * @see /admin/settings
 * @see /template/module-loader/src/assetLoader
 */
if ( template_system\get_settings('acf_template_field') === true) {
  require_once __DIR__ . '/template/index.php';
}
