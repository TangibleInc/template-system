<?php
/**
 * WP Fusion integration - Moved from Pro plugin
 *
 * @see tangible-blocks-pro/includes/integrations/index.php
 */

add_action('tangible_blocks_ready', function(
  $tangible_blocks, $loop, $logic, $html, $interface
) use ($framework, $plugin) {

  if (function_exists('tangible_blocks_pro')
    && !empty(tangible_blocks_pro()->get_integration('wp_fusion'))
  ) {
    // Avoid loading if Pro plugin is older version that still includes WP Fusion integration
    return;
  }

  $tangible_blocks = $plugin;

  $key = 'wp-fusion';
  $config = [
    'slug'   => $key,
    'title'  => 'WP Fusion',
    'url'    => 'https://wpfusion.com/',
    'active' => function_exists('wp_fusion'),
  ];

  $active = $tangible_blocks->register_plugin_integration( $config );
  if ( ! $active ) return;

  // Each integration gets its own instance of $plugin

  $name = str_replace('-', '_', $key);
  $plugin = tangible_object([
    'name' => 'tangible_blocks_' . $name . '_integration',
    'config' => $config
  ]);

  $wp_fusion = wp_fusion();

  // local $framework, $plugin, $tangible_blocks, $wp_fusion, $loop, $logic, $html

  require_once __DIR__.'/types/index.php';

  /**
   * Make integration methods available as object instance
   *
   * Used by tests, for example in ./types/user/test/index.php
   *
   * @see ../third-party/index.php, set_integration()
   */
  $tangible_blocks->set_integration('wp_fusion', $plugin);

}, 20, 5); // After Tangible Blocks Pro at priority 10


/**
 * Define global function for backward compatibility
 */
if (!function_exists('tangible_loops_for_wp_fusion')) {
  function tangible_loops_for_wp_fusion() {
    return tangible_blocks()->get_integration('wp_fusion');
  }
}
