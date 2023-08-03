<?php

namespace Tangible\TemplateSystem;

use Tangible\TemplateSystem as system;

function get_state( $field = null ) {
  return is_null( $field )
    ? system::$state
    : ( system::$state[ $field ] ?? null )
  ;
}

function set_state( $new_state ) {
  foreach ($new_state as $key => $value) {
    system::$state->{$key} = $value;
  }
  return system::$state;
}
