<?php
/**
 * Empty theme functions and definitions.
 */

/**
 * Add theme support for various features.
 */
add_action( 'after_setup_theme', function() {

  // Adding support for core block visual styles.
  add_theme_support( 'wp-block-styles' );

  // Enqueue editor styles.
  add_editor_style( 'style.css' );

});

/**
 * Enqueue scripts and styles.
 */
add_action( 'wp_enqueue_scripts', function() {
  // Enqueue theme stylesheet.
  // wp_enqueue_style( 'emptytheme-style', get_template_directory_uri() . '/style.css', array(), wp_get_theme()->get( 'Version' ) );
});
