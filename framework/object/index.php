<?php
namespace tangible;

/**
 * Create object with dynamic methods and properties
 */
function create_object( $props = [] ) {

  $obj = new class extends \stdClass {

    public $name = 'tangible_object';

    function __call( $method = '', $args = [] ) {
      if ( isset( $this->$method ) ) {
        return call_user_func_array( $this->$method, $args );
      }
      $caller = current( debug_backtrace() );
      trigger_error( "Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> on line <b>{$caller['line']}</b><br>", E_USER_WARNING );
    }
  };

  foreach ( $props as $key => $value ) {
    $obj->{$key} = $value;
  }

  return $obj;
}

require_once __DIR__.'/legacy.php';
