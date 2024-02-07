<?php
namespace Tests\Integrations;

class Beaver_TestCase extends \WP_UnitTestCase {

  function test_dependency_active() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $this->assertEquals( true, class_exists( 'FLBuilder' ), 'Beaver Builder is not installed and active' );

    $this->assertNull( $error );
  }
}
