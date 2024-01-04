<?php
/**
 * WP Fusion integration - Moved from Pro plugin
 *
 * @see tangible-blocks-pro/includes/integrations/index.php
 */
add_action('tangible_template_system_ready', function( $template_system ) use ( $plugin, $loop, $logic, $html ) {

  $key = 'wp-fusion';
  $config = [
    'slug'   => $key,
    'title'  => 'WP Fusion',
    'url'    => 'https://wpfusion.com/',
    'active' => function_exists( 'wp_fusion' ),
  ];

  $active = $template_system->register_plugin_integration( $config );
  if ( ! $active ) return;

  // Each integration gets its own instance of $plugin

  $name = str_replace( '-', '_', $key );
  $plugin = \tangible\create_object([
    'name' => 'template_system_' . $name . '_integration',
    'config' => $config,
  ]);

  $wp_fusion = wp_fusion();

  // local $plugin, $template_system, $wp_fusion, $loop, $logic, $html

  require_once __DIR__ . '/types/index.php';

  /**
   * Make integration methods available as object instance
   *
   * Used by tests, for example in ./types/user/test/index.php
   *
   * @see ../third-party/index.php, set_integration()
   */
  $template_system->set_integration( 'wp_fusion', $plugin );

});
