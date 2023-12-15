<?php

$html->create_tag_attributes_hash = function( $atts ) use ( $html ) {

  if (is_string( $atts )) return wp_hash( $atts );

  // Sort keys so their order is always the same
  $keys = array_keys( $atts );
  sort( $keys );

  $content = '';
  foreach ( $keys as $key ) {

    // Ignore empty array because they can get removed during JSON parse/decode
    if (is_array( $atts[ $key ] ) && empty( $atts[ $key ] )) continue;

    $content .= $key . '=' . (
      is_string( $atts[ $key ] )
        ? $atts[ $key ]
        : json_encode( $atts[ $key ] )
    ) . ';';
  }

  // tangible\log( $content );

  return wp_hash( $content );
};

$html->verify_tag_attributes_hash = function( $atts, $hash ) use ( $html ) {
  return strcmp( $hash, $html->create_tag_attributes_hash( $atts ) ) === 0;
};
