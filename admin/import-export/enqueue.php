<?php
/**
 * Enqueue style/script
 */

namespace tangible\template_system;
use tangible\template_system;

$plugin->enqueue_template_import_export = function() use ( $plugin ) {

  $url     = $plugin->url;
  $version = $plugin->version;

  wp_enqueue_style(
    'tangible-template-import-export',
    $url . 'assets/build/template-import-export.min.css',
    [ 'tangible-select' ],
    $version
  );

  wp_enqueue_script(
    'tangible-template-import-export',
    $url . 'assets/build/template-import-export.min.js',
    [ 'jquery', 'tangible-ajax', 'tangible-preact', 'tangible-select' ],
    $version
  );

  wp_add_inline_script(
    'tangible-template-import-export',
    'window.Tangible = window.Tangible || {}; window.Tangible.templateSystemHasPlugin = '
      . json_encode( template_system\get_active_plugins() ),
    'before'
  );

};
