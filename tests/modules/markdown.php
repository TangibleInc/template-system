<?php
namespace Tests\Template\Modules;

class Markdown_TestCase extends \WP_UnitTestCase {
  public function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['Markdown']) );

    $result = $html->render('<Markdown># Title</Markdown>');

    $this->assertNull( $error );
    $this->assertEquals( '<h1>Title</h1>', $result );
  }
}
