<?php

if ( ! defined( 'WPGB_VERSION' ) ) return;

/**
 * Integration with WP Grid Builder
 *
 * @see https://docs.wpgridbuilder.com/resources/
 */

add_filter('wp_grid_builder/block/types', function( $types ) {

  $types['tangible'] = __( 'Tangible', 'tangible_template_system' );

  return $types;
});

add_filter('wp_grid_builder/block/sources', function( $sources ) {

  $sources['tangible'] = __( 'Tangible', 'tangible_template_system' );

  return $sources;
});

add_filter('tangible_loop_tag_attributes', function($atts) {

  // Handle WP Grid Builder pagination
  if (isset($atts['wp_grid_builder']) && isset($atts['paged'])) {
    $atts['posts_per_page'] = $atts['paged']; // Move `paged` value to `posts_per_page`
    unset($atts['paged']); // Prevent L&L pagination from activating
  }

  return $atts;
});

require_once __DIR__ . '/settings.php';
require_once __DIR__ . '/blocks.php';







