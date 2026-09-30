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

/**
 * The ajax module format data using $.ajax, which strips empty arrays
 * and turns boolean/integer into strings
 *
 * This function must be used before hashing otherwise hashes won't match
 */
$html->format_signed_data = function( $value ) use ( $html ) {

  if ( is_bool( $value ) ) return $value ? 'true' : 'false';
  if ( is_scalar( $value ) || is_null( $value ) ) return (string) $value;
  if ( ! is_array( $value ) ) return $value;

  return array_filter(
    array_map( $html->format_signed_data, $value ),
    fn( $item ) => $item !== []
  );
};

/**
 * Signed data printed in a data attribute
 *
 * Browsers decode entities inside attributes and template data will come back
 * different in the ajax request (which will make the hash verification fail)
 *
 * To prevent that, we replace & with \u0026 (which JSON.parse() converts back)
 *
 * @see https://www.php.net/manual/en/json.constants.php#constant.json-hex-amp
 */
$html->encode_signed_data = function( $data ) {
  return json_encode( $data, JSON_HEX_AMP );
};
