<?php

/**
 * Enqueue style/script
 */

$plugin->enqueue_template_cloud = function() use ( $plugin ) {

  $url     = $plugin->url;
  $version = $plugin->version;

  wp_enqueue_style(
    'tangible-template-cloud',
    $url . 'assets/build/template-cloud.min.css',
    [ 'tangible-select' ],
    $version
  );

  wp_enqueue_script(
    'tangible-template-cloud',
    $url . 'assets/build/template-cloud.min.js',
    [ 'jquery', 'tangible-ajax', 'tangible-preact', 'tangible-select' ],
    $version
  );

  wp_add_inline_script(
    'tangible-template-cloud',
    'window.Tangible = window.Tangible || {}; window.Tangible.isTangibleBlocksProInstalled = '
      . ( function_exists( 'tangible_blocks_pro' ) ? 'true' : 'false' ),
    'before'
  );

};
