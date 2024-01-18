<?php
if ( ! function_exists( 'tangible_object' ) ) {
  function tangible_object($props = []) {
    return tangible\create_object($props);
  }
}
