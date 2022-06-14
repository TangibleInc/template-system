<?php
/**
 * Module loader
 *
 * Supports loading scripts and styles when page builders fetch and insert dynamic HTML
 */

$html->enqueue_dynamic_module_loader = function() use ($html, $interface) {

  wp_enqueue_script(
    'tangible-module-loader',
    "{$html->url}assets/build/module-loader.min.js",
    ['jquery'],
    $html->version
  );

  /**
   * Currently, *all* dynamic modules must be enqueued to ensure consistent handling of dependencies
   */

  // $interface->enqueue('dynamic-table');
  // $interface->enqueue('embed');
  // $interface->enqueue('glider');
  $interface->enqueue('slider');
  $interface->enqueue('chart');

  /**
   * Client-side conditional enqueue would be tricky, since script/style tags need to be loaded
   * in the right sequence, with possible dependencies of dependencies..
   */

  // global $wp_scripts, $wp_styles;
  // tangible()->see( $wp_scripts->registered );

};
