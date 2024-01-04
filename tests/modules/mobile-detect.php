<?php
namespace Tests\Modules;

class Mobile_Detect_TestCase extends \WP_UnitTestCase {

  function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $result = $html->render("<If device=desktop>TRUE<Else />FALSE</If>");

    $this->assertNull( $error );
  }
}
