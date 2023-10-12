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

/**
 * Map of active plugins - Used in:
 * - /system/import-export/enqueue
 * - Tangible Blocks for custom admin menu based on installed plugins
 */
function get_active_plugins() {
  static $has_plugins;
  return $has_plugins ?? ($has_plugins = [
    'loops'           => function_exists( 'tangible_loops_and_logic' ),
    'loops_pro'       => function_exists( 'tangible_loops_and_logic_pro' ),
    'blocks'          => function_exists( 'tangible_blocks' ),
    'blocks_editor'   => function_exists( 'tangible_blocks_editor' ),
    'blocks_pro'      => function_exists( 'tangible_blocks_pro' ),
    'template_system' => system\is_plugin(), // This module installed as plugin
  ]);
}
