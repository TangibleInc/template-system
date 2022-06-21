<?php

/**
 * Get array from array-like string of colors
 *
 * Example: "#bf2977, rgba(75, 192, 192, 0.5), hsl(9, 100%, 50%)"
 */
$html->colors_string_to_array = function( $value = [] ) {

  $colors_array = [];
  if (empty( $value )) return $colors_array;

  // Recognized color notations : hex(#), rgb, rgba, hsl, hsla
  $re = '/(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/';

  preg_match_all( $re, $value, $matches, PREG_SET_ORDER );

  foreach ( $matches as $m ) {
    $colors_array [] = $m[0];
  }

  return $colors_array;
};
