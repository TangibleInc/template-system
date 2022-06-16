<?php

/**
 * Enqueue style/script
 */

$plugin->enqueue_template_import_export = function() use ($plugin) {

  $url = $plugin->url;
  $version = $plugin->version;

  wp_enqueue_style(
    'tangible-template-import-export',
    $url . 'assets/build/template-import-export.min.css',
    ['tangible-select'],
    $version
  );

  wp_enqueue_script(
    'tangible-template-import-export',
    $url . 'assets/build/template-import-export.min.js',
    ['jquery', 'tangible-ajax', 'tangible-preact', 'tangible-select'],
    $version
  );

  wp_add_inline_script(
    'tangible-template-import-export',
    'window.Tangible = window.Tangible || {}; window.Tangible.isTangibleBlockEditorInstalled = '
      . (function_exists('tangible_block_editor') ? 'true' : 'false')
    ,
    'before'
  );

};
