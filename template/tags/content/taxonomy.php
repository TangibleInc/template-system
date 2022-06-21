<?php

$html->content_taxonomy_tag = function( $atts, $nodes ) use ( $html ) {

  $name = isset( $atts['name'] ) ? $atts['name'] : array_shift( $atts['keys'] );
  if (empty( $name )) return;

  // Create config as map

  $html->render_tag('Map', [
    'name' => 'current_content_taxonomy',
  ], $nodes);

  $config = $html->get_map( 'current_content_taxonomy' );

  $html->register_taxonomy( $name, $config );
};

return [
  'callback' => $html->content_taxonomy_tag,
];
