<?php
namespace Tests\Template\Modules;

class Gallery_TestCase extends \WP_UnitTestCase {
  public function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['Gallery']) );

    $result = $html->render('<Gallery />');

    $this->assertNull( $error );
    // $this->assertEquals( true, !empty($result) );
  }
}
