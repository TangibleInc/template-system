<?php
namespace Tests\Framework;
use tangible\format;

class Format_TestCase extends \WP_UnitTestCase {

  function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $namespace = 'tangible\\format';
    $this->assertTrue(is_callable($namespace.'\\multiple_values'));

    $expected = [1, 2, 3];

    // Comma-separate list
    $this->assertEquals(format\multiple_values('1,2,3'), $expected);
    $this->assertEquals(format\multiple_values('1, 2, 3'), $expected);
    // JSON array
    $this->assertEquals(format\multiple_values('[1, 2, 3]'), $expected);
  }
}
