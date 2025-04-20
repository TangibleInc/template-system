<?php

if ( ! $_WORDPRESS_DEVELOP_DIR = getenv( 'WORDPRESS_DEVELOP_DIR' ) ) {
  $_WORDPRESS_DEVELOP_DIR = __DIR__ . '/../wordpress-develop';
}
/**
 * Directory of PHPUnit test files
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#using-included-wordpress-phpunit-test-files
 */
if ( ! $_WORDPRESS_TESTS_DIR = getenv( 'WP_TESTS_DIR' ) ) {
  $_WORDPRESS_TESTS_DIR = $_WORDPRESS_DEVELOP_DIR . '/tests/phpunit';
}

require_once $_WORDPRESS_TESTS_DIR . '/includes/functions.php';

tests_add_filter('muplugins_loaded', function() {

  require __DIR__ . '/../plugin.php';

  /**
   * Plugin dependencies must be activated here, because WP_UnitTestCase::set_up
   * is after `plugins_loaded`, which is too late for some integration tests.
   */

  if ( ! function_exists('activate_plugin') ) {
    require_once ABSPATH . 'wp-admin/includes/plugin.php';
  }

  $required_plugins = [
    'advanced-custom-fields/acf.php',
    'beaver-builder-lite-version/fl-builder.php',
    'elementor/elementor.php',
  ];

  // WP Fusion Lite is not yet compatible with PHP 8
  if ( version_compare( PHP_VERSION, '8.0', '<' ) ) {
    $required_plugins []= 'wp-fusion-lite/wp-fusion-lite.php';
  }

  foreach ($required_plugins as $entry_file) {
    $entry_file_path = WP_CONTENT_DIR . '/plugins/' . $entry_file;
    if ( ! is_plugin_active( $entry_file ) &&
      file_exists($entry_file_path)
    ) {

      /**
       * We can't use `activate_plugin()` here because some functions like 
       * `wp_get_current_user` are missing on plugin activation.
       */
      // activate_plugin( $entry_file );

      require_once $entry_file_path;
    }  
  }

});

require $_WORDPRESS_TESTS_DIR . '/includes/bootstrap.php';
