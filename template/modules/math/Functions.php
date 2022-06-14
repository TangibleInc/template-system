<?php

namespace Tangible\Math;

// spreadsheet functions emulation
class Functions {

  static function average() {
      $args = func_get_args();
      return ( call_user_func_array( array( 'self', 'sum' ), $args ) / count( $args ) );
  }

  static function max() {
      $args = func_get_args();
      $res  = array_pop( $args );
    foreach ( $args as $a ) {
      if ( $res < $a ) {
          $res = $a;
      }
    }
      return $res;
  }

  static function min() {
      $args = func_get_args();
      $res  = array_pop( $args );
    foreach ( $args as $a ) {
      if ( $res > $a ) {
          $res = $a;
      }
    }
      return $res;
  }

  static function mod( $op1, $op2 ) {
      return $op1 % $op2;
  }

  static function pi() {
      return pi();
  }

  static function power( $op1, $op2 ) {
      return pow( $op1, $op2 );
  }

  static function round( $val, $precision = 0 ) {
      return round( $val, $precision );
  }

  static function round_up( $number, $precision = 2 ) {
      $fig = (int) str_pad( '1', $precision, '0' );
      return ( ceil( $number * $fig ) / $fig );
  }

  static function round_down( $number, $precision = 2 ) {
      $fig = (int) str_pad( '1', $precision, '0' );
      return ( floor( $number * $fig ) / $fig );
  }

  static function sum() {
      $args = func_get_args();
      $res  = 0;
    foreach ( $args as $a ) {
        $res += $a;
    }
      return $res;
  }

  static function format() {
    $args      = func_get_args();
    $number    = ! empty( $args[0] ) ? $args[0] : 0;
    $decimals  = ! empty( $args[1] ) ? $args[1] : 2;
    $point     = ! empty( $args[2] ) ? $args[2] : '.';
    $thousands = ! empty( $args[3] ) ? $args[3] : '';
    return number_format( $number, $decimals, $point, $thousands );
  }


  protected static $randomseed = null;

  static function set_random_seed( $randomseed ) {
      self::$randomseed = $randomseed;
  }

  static function get_random_seed() {
    if ( is_null( self::$randomseed ) ) {
        return microtime();
    } else {
        return self::$randomseed;
    }
  }

  static function rand_int( $min, $max ) {
    if ( $min >= $max ) {
        return false; // error
    }
      $noofchars    = ceil( log( $max + 1 - $min, '16' ) );
      $md5string    = md5( self::get_random_seed() );
      $stringoffset = 0;
    do {
      while ( ( $stringoffset + $noofchars ) > strlen( $md5string ) ) {
          $md5string .= md5( $md5string );
      }
        $randomno      = hexdec( substr( $md5string, $stringoffset, $noofchars ) );
        $stringoffset += $noofchars;
    } while ( ( $min + $randomno ) > $max );
      return $min + $randomno;
  }

  static function rand_float() {
      $randomvalues = unpack( 'v', md5( self::get_random_seed(), true ) );
      return array_shift( $randomvalues ) / 65536;
  }

}
