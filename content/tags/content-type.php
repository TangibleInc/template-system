<?php

$html->content_type_tag = function( $atts, $nodes ) use ( $html ) {

  $name = isset( $atts['name'] ) ? $atts['name'] : array_shift( $atts['keys'] );
  if (empty( $name )) return;

  // Create config as map

  $html->render_tag('Map', [
    'name' => 'current_content_type',
  ], $nodes);

  $config = $html->get_map( 'current_content_type' );

  $html->register_content_type( $name, $config );
};

return [
  'callback' => $html->content_type_tag,
];
