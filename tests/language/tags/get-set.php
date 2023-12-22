<?php
namespace Tests\Template\Modules;

class Get_Set_TestCase extends \WP_UnitTestCase {
  public function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['Get']) );
    $this->assertEquals( true, isset($html->tags['Set']) );

    $value = '123';
    $html->render('<Set name>' . $value . '</Set>');
    $result = $html->render('<Get name />');

    $this->assertNull( $error );
    $this->assertEquals( $value, $result );
  }
}
