<?php

$html->random_tag = function( $atts, $nodes ) use ( $html ) {

  $from = isset( $atts['from'] )
    ? (int) $atts['from']
    : 1;

  $to = isset( $atts['to'] )
    ? (int) $atts['to']
    : 99;

  return rand( $from, $to );
};

return $html->random_tag;
