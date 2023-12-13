<?php
/**
 * Define global function until all plugins migrate to new framework
 */
if ( ! function_exists( 'tangible_object' ) ) {
  function tangible_object($props = []) {
    tangible\create_object($props);
  }
}
