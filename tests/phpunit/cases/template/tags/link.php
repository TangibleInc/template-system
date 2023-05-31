<?php
namespace Tests\Template\Tags;

class Link_TestCase extends \WP_UnitTestCase {
  function test_link_with_urls() {

    $html = tangible_template();

    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $error = null;
    $html->render('<img src="example.com">');
    $this->assertNull( $error );

    $error = null;
    $html->render('<a href="example.com">');
    $this->assertNull( $error );

  }
}
