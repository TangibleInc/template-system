<?php
namespace Tests\Template\Modules;

class Shortcode_TestCase extends \WP_UnitTestCase {
  public function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['Shortcode']) );

    $value = '123';

    add_shortcode('test', function() use ($value) {
      return $value;
    });

    $result = $html->render('<Shortcode test />');

    $this->assertNull( $error );
    $this->assertEquals( $value, $result );
  }
}
