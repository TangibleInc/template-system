<?php
/**
 * Utilities
 */
namespace tangible\template_system;
use tangible\template_system;

template_system::$state->is_plugin = false;

function is_plugin( $set = null ) {
  if (is_bool($set)) {
    template_system::$state->is_plugin = $set;
  }
  return template_system::$state->is_plugin;
}

/**
 * Map of active plugins - Used in:
 * - /system/import-export/enqueue
 * - Tangible Blocks for custom admin menu based on installed plugins
 */
function get_active_plugins() {
  static $has_plugins;
  return array_merge($has_plugins ?? ($has_plugins = [
    'loops'           => function_exists( 'tangible_loops_and_logic' ),
    'loops_pro'       => function_exists( 'tangible_loops_and_logic_pro' ),
    'blocks'          => function_exists( 'tangible_blocks' ),
    'blocks_editor'   => function_exists( 'tangible_blocks_editor' ),
    'blocks_pro'      => function_exists( 'tangible_blocks_pro' ),
  ]), [
    'template_system' => template_system\is_plugin(), // This module installed as plugin
  ]);
}
