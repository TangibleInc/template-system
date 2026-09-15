<?php
namespace Tests\Template\Modules;

class Math_TestCase extends \WP_UnitTestCase {
  public function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['Math']) );

    $result = $html->render('<Math />');

    $this->assertNull( $error );
    $this->assertEquals( true, !empty($result) );
  }

  public function test_wrong_argument_count_does_not_fatal() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    // Each hits a different wrong-argument-count branch in Math::nfx()
    $html->render('<Math>ceil(2.1, 2)</Math>'); // Built-in function
    $html->render('<Math>mod(5)</Math>'); // Calc function
    $html->render('<Math>double(x) = x * 2</Math><Math>double(1, 2)</Math>'); // User function
    $html->render('<Math>round()</Math>'); // No arguments

    $this->assertNull( $error );
  }
}
