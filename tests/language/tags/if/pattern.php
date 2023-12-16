<?php
namespace Tests\Template\Tags;

class If_Pattern_TestCase extends \WP_UnitTestCase {
  /**
   * If value matches by regular expression
   * Also see ../format/regex.php
   */
  function test_if_match_regex() {
    $check = "http://example.com";
    $match = '/http(s?):\/\//';
    $expected = "TRUE";
    $template = "<If check=\"{$check}\" matches_pattern=\"{$match}\">TRUE<Else />FALSE</If>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $check = "https://example.com";
    $expected = "TRUE";
    $template = "<If check=\"{$check}\" matches_pattern=\"{$match}\">TRUE<Else />FALSE</If>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $check = "example.com";
    $expected = "FALSE";
    $template = "<If check=\"{$check}\" matches_pattern=\"{$match}\">TRUE<Else />FALSE</If>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Pattern with curly braces

    $match = '/.{4,}/'; // Repetition

    $check = "123abc";
    $expected = "TRUE";
    $template = "<If check=\"{$check}\" matches_pattern=\"{$match}\">TRUE<Else />FALSE</If>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $check = "123";
    $expected = "FALSE";
    $template = "<If check=\"{$check}\" matches_pattern=\"{$match}\">TRUE<Else />FALSE</If>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );
 
    // Support dynamic tags (only without delimiters)

    $check = "123abc";
    $expected = "TRUE";
    $template = "<Set pattern>{$match}</Set><If check=\"{$check}\" matches_pattern=\"{Get pattern}\">TRUE<Else />FALSE</If>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Invalid pattern

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $result = tangible_template('<If check="test" matches_pattern="/.{}"></If>');

    $this->assertNotNull( $error );
    [$errno, $errstr, $args] = $error;

    // Correctly throws warning, but inside test it's an erro 
    // $this->assertEquals( E_USER_WARNING, $errno );
  }
}
