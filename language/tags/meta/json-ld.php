<?php

$html->json_ld_tag = function( $atts, $nodes ) use ( $html ) {
  array_unshift($nodes, [
    'tag' => 'Key',
    'attributes' => [
      'name' => '@context',
      'value' => 'http://schema.org',
    ],
    'children' => []
  ]);
  $html->render([
    [
      'tag'        => 'Map',
      'attributes' => [ 'name' => '_json_ld' ],
      'children'   => $nodes
    ]
  ]);

  $schema = $html->get_map( '_json_ld' );  

  return $html->render_raw_tag('script', [
    'type' => 'application/ld+json'
  ], json_encode($schema));
};

$html->add_open_tag( 'JSON-LD', $html->json_ld_tag );
