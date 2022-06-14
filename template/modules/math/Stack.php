<?php

namespace Tangible\Math;

// for internal use

class Stack {

  var $stack = array();
  var $count = 0;

  function push( $val ) {
      $this->stack[ $this->count ] = $val;
      $this->count++;
  }

  function pop() {
    if ( $this->count > 0 ) {
        $this->count--;
        return $this->stack[ $this->count ];
    }
      return null;
  }

  function last( $n = 1 ) {
    if ( $this->count - $n >= 0 ) {
        return $this->stack[ $this->count - $n ];
    }
      return null;
  }
}
