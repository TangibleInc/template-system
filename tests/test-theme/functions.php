<?php

add_action('after_setup_theme', function() {

  // Support core block visual styles
  add_theme_support( 'wp-block-styles' );

  // Enqueue editor styles
  add_editor_style( 'style.css' );

});

add_action( 'wp_enqueue_scripts', function() {
  // Enqueue theme stylesheet
  wp_enqueue_style(
    'test-theme-style',
    get_template_directory_uri() . '/style.css',
    [],
    wp_get_theme()->get('Version')
  );
});

// Filter HTTP requests
add_filter( 'pre_http_request', function( $cancel, $args, $url ) {
  return true;
}, 1, 3 );
