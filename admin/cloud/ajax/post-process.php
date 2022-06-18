<?php

$plugin->block_dependency_fallbacks = [

  'sfwd-lms' => function () use ( $plugin, $framework ) {
    // Learndash's main file has a special naming
    return $framework->is_dependency_active( "sfwd-lms/sfwd_lms.php" );
  },

];

$plugin->get_block_dependency_fallback = function( $slug ) use( $plugin, $framework ) {
  return !empty( $plugin->block_dependency_fallbacks[ $slug ] )
    ? $plugin->block_dependency_fallbacks[ $slug ]
    : null
  ;
};

$plugin->post_process_block_downloads = function( $api_data ) use($plugin, $framework) {

  $api_data->products = array_map( function ( $product ) use ( $plugin, $framework ) {

    $product = $product->info;
    $plugin->add_block_dependency_data( $product ); // Modifies $product->info

    return $product;

  }, $api_data->products );

  return $api_data;
};

$plugin->add_block_dependency_data = function( $product ) use ( $plugin, $framework ) {

  $product->is_pro = false;
  if( !$product->dependencies ) return $product;

  $met = [];
  $unmet = [];

  foreach( $product->dependencies as $dependency ) {

    $slug = $dependency->slug;
    $active = $framework->is_dependency_active(
      "{$slug}/{$slug}.php",
      $plugin->get_block_dependency_fallback($slug)
    );

    if( $slug === 'tangible-blocks-pro' ) {
      $product->is_pro = true;
    }

    $arr = [
      'slug' => $slug,
      'name' => $dependency->name,
      'active' => $active
    ];

    $active? // Branching side effects on ternary condition *sigh*
      $met[]=$arr :
      $unmet[]=$arr;
  }

  $product->dependencies = [
    'met' => $met,
    'unmet' => $unmet
  ];

  return $product;
};
