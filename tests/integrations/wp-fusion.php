<?php
namespace Tests\Integrations;

class WP_Fusion_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('wp_fusion'); 
  }

  function test_dependency_active() {

    $this->assertTrue( true );

    // WP Fusion Lite is not yet compatible with PHP 8
    if ( version_compare( PHP_VERSION, '8.0', '>=' ) ) {
      return;
    }

    if (!$this->is_dependency_active()) {      
      echo 'WP Fusion is not installed and active';
    }
  }

  function test_dependency() {
    if (!$this->is_dependency_active()) {      
      $this->assertTrue(true);
      return;
    }

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $plugin = tangible_template_system();
    $integration = $plugin->get_integration('wp_fusion');

    $this->assertNull( $error );
    $this->assertTrue( !empty($integration) );
  }
}
