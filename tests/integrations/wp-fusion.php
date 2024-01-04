<?php
namespace Tests\Integrations;

class WP_Fusion_TestCase extends \WP_UnitTestCase {

  function test_dependency_active() {

    if ( version_compare( PHP_VERSION, '8.0', '>=' ) ) {
      // WP Fusion Lite is not yet compatible with PHP 8
      $this->assertTrue( true );
      return;
    }

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $this->assertEquals( true, function_exists('wp_fusion'), 'WP Fusion is not installed and active' );

    $plugin = tangible_template_system();
    $integration = $plugin->get_integration('wp_fusion');

    $this->assertNull( $error );
    $this->assertTrue( !empty($integration) );
  }
}
