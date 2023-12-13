<?php
/**
 * Generic loop paginator using AJAX
 */

use tangible\ajax;

$html->paginator_scripts_registered = false;

$html->register_paginator_scripts = function() use ( $html ) {

  if ($html->paginator_scripts_registered) return;
  $html->paginator_scripts_registered = true;

  wp_register_style(
    'tangible-paginator',
    $html->url . 'assets/build/paginator.min.css',
    [],
    $html->version
  );

  wp_register_script(
    'tangible-paginator',
    $html->url . 'assets/build/paginator.min.js',
    [ 'jquery', 'tangible-ajax' ],
    $html->version
  );
};

add_action( 'wp_enqueue_scripts', $html->register_paginator_scripts );

$html->enqueue_paginator = function() use ( $html ) {

  ajax\enqueue();

  $html->register_paginator_scripts();

  wp_enqueue_style( 'tangible-paginator' );
  wp_enqueue_script( 'tangible-paginator' );
};
