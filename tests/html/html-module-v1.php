<?php

/**
 * Mock HTML module instance
 */
$html = new class extends stdClass {
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) {
      return call_user_func_array( $this->$method, $args );
    }
    $caller = current( debug_backtrace() );
    trigger_error( "Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> on line <b>{$caller['line']}</b><br>", E_USER_WARNING );
  }
};

/**
 * Mock WordPress functions used
 */
if (!function_exists('apply_filters')) {
  function apply_filters($name, $value) { return $value; };
}

require_once __DIR__ . '/../../language/html/index.php';

return $html;
