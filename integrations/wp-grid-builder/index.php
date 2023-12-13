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

require_once __DIR__ . '/settings.php';
require_once __DIR__ . '/blocks.php';







