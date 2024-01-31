<?php
namespace Tests\Integrations;

class ACF_TestCase extends \WP_UnitTestCase {

  function test_dependency_active() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $this->assertEquals( true, function_exists('acf'), 'Advanced Custom Fields is not installed and active' );

    $plugin = tangible_template_system();
  }
}
