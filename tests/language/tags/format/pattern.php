<?php
namespace Tests\Template\Tags;

class Format_Pattern_TestCase extends \WP_UnitTestCase {

  function set_up() {
    parent::set_up();
    // Convert warnings into errors
    set_error_handler(function ($severity, $message, $file, $line) {
      throw new \ErrorException($message, $severity, $severity, $file, $line);
    });    
  }

  function tear_down() {
    parent::tear_down();
    restore_error_handler();
  }

  /**
   * Replace by regular expression
   * Also see ../if/regex.php
   */
  function test_replace_pattern() {

    $source = "Test 123 and 456";
    $replace = "/\d+/i";
    $with = "NUM";
    $template = "<Format replace_pattern=\"{$replace}\" with=\"{$with}\">{$source}</Format>";

    $expected = preg_replace($replace, $with, $source);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Regular "replace" for literal string

    $source = "Test /\d+/i and 456";
    $replace = "/\d+/i";
    $with = "NUM";
    $template = "<Format replace=\"{$replace}\" with=\"{$with}\">{$source}</Format>";

    $expected = str_replace($replace, $with, $source);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // UTF-8

    $source = "あいうえお";
    $replace = "/い/i";
    $with = "I";
    $template = "<Format replace_pattern=\"{$replace}\" with=\"{$with}\">{$source}</Format>";

    $expected = preg_replace($replace, $with, $source);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $source = "https://example.com";
    $replace = "/http(s?):\/\//";
    $with = "";
    $template = "<Format replace_pattern=\"{$replace}\" with=\"{$with}\">{$source}</Format>";

    $expected = preg_replace($replace, $with, $source);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Capture group

    $source = "1234567890";
    $replace = "/(\d{3})(\d{3})(\d{4})/";
    $with = '$1-$2-$3';
    $template = "<Format replace_pattern=\"{$replace}\" with=\"{$with}\">{$source}</Format>";

    $expected = preg_replace($replace, $with, $source);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );
  }
}
