<?php

namespace tangible;

/**
 * Create object with dynamic methods and properties
 */
function create_object( $props = [] ) {

  $obj = new class extends stdClass {
    public $name = 'tangible_object';
    function __call( $method = '', $args = [] ) {
      if ( isset( $this->$method ) ) {
        return call_user_func_array( $this->$method, $args );
      }
      $caller = current( debug_backtrace() );
      echo "Warning: Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>";
    }
  };

  foreach ( $props as $key => $value ) {
    $obj->{$key} = $value;
  }

  return $obj;
}

require_once __DIR__.'/global.php';
