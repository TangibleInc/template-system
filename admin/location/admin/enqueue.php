<?php

$plugin->enqueue_template_location_editor = function() use ($plugin, $ajax) {

  $ajax->enqueue();

  wp_enqueue_script(
    'tangible-template-location-editor',
    $plugin->url . 'assets/build/template-location-editor.min.js',
    ['tangible-preact', 'tangible-ajax', 'tangible-select'],
    $plugin->version
  );

  wp_enqueue_style(
    'tangible-template-location-editor',
    $plugin->url . 'assets/build/template-location-editor.min.css',
    [],
    $plugin->version
  );

};
