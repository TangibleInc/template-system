<?php
namespace Tests\Template\Modules;

class Chart_TestCase extends \WP_UnitTestCase {
  public function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['Chart']) );

    $result = $html->render('<Chart />');

    $this->assertNull( $error );
    $this->assertEquals( true, !empty($result) );
  }
}
