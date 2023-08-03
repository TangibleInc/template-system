<?php
/**
 * Utilities
 */
namespace Tangible\TemplateSystem;

use Tangible\TemplateSystem as system;

system::$state->is_plugin = false;

function is_plugin( $set = null ) {
  $is_plugin = &system::$state->is_plugin;
  if (is_bool($set)) {
    $is_plugin = $set;
  }
  return $is_plugin;
}
