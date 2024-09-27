<?php
namespace tangible\design;
use tangible\design;

function enqueue() {

  $url = design::$state->url;
  $version = design::$state->version;

  wp_enqueue_style(
    'tangible-design',
    $url . '/build/design.min.css',
    [],
    $version
  );
}
