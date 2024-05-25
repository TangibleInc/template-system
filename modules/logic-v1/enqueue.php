<?php

$logic->state['enqueued'] = false;

/**
 * This is the main frontend interface for the module consumer.
 *
 * Call it within action `wp_enqueue_scripts`.
 */
$logic->enqueue = function() use ( $logic ) {

  if ( $logic->state['enqueued'] ) {
    return;
  }

  $logic->state['enqueued'] = true;

  $url     = $logic->url;
  $version = $logic->version;
  $assets  = "$url/assets/build";

  wp_enqueue_script(
    'tangible-logic',
    "$assets/tangible-logic.js",
    [ 'jquery' ],
    $version,
    true
  );

  wp_enqueue_style(
    'tangible-logic-css',
    "$assets/tangible-logic.css",
    [],
    $version
  );
};
