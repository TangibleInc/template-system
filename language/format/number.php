<?php

/**
 * Format number
 * @see https://www.php.net/manual/en/function.number-format.php
 */
$html->format_number = function( $content, $options = [] ) {

  $number    = (float) $content;
  $decimals  = isset( $options['decimals'] ) ? (int) $options['decimals'] : 2;
  $point     = ! empty( $options['point'] ) ? $options['point'] : '.';
  $thousands = ! empty( $options['thousands'] ) ? $options['thousands'] : '';

  return number_format( $number, $decimals, $point, $thousands );
};
