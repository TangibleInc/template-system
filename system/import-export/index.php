<?php

use Tangible\TemplateSystem as system;

require_once __DIR__ . '/ajax/index.php';
require_once __DIR__ . '/enqueue.php';
require_once __DIR__ . '/export.php';
require_once __DIR__ . '/import.php';
require_once __DIR__ . '/menu.php';

/**
 * Allow JSON and SVG file types during import
 * 
 * May be necessary on some site setups to import templates.
 * 
 * On multisite setup, it may also be necessary to add to the list of
 * allowed file types for sub-sites, under Network Admin -> Settings.
 * 
 * Note that PHP determines the MIME type of a JSON file to be "text/plain",
 * instead of "application/json" which is correct.
 * 
 * @see /admin/settings
 * @see https://stackoverflow.com/questions/63455255/allow-json-upload-file-in-wordpress
 */

add_filter('upload_mimes', function($mimes) {
  $settings = system\get_settings();
  if (!empty($settings['allow_json_upload'])) {
    $mimes['json'] = 'text/plain';
  }
  if (!empty($settings['allow_svg_upload'])) {
    $mimes['svg'] = 'image/svg+xml';
  }
  return $mimes;
});
