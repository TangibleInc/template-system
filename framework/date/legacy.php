<?php
/**
 * Define global function until all plugins migrate to new framework
 */
if ( ! function_exists( 'tangible_date' ) ) {
  function tangible_date( $arg = false ) {
    // Ignore the Date module in plugin framework registering itself
    if (is_object($arg)) return tangible\date();
    return call_user_func_array('tangible\\date', func_get_args());
  }
}
