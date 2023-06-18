<?php
namespace Tests\Template\Tags;

class Format_RegularExpression_TestCase extends \WP_UnitTestCase {
  /**
   * Replace by regular expression
   * Also see ../if/regex.php
   */
  function test_replace_regex() {

    $source = "Test 123 and 456";
    $replace = "/\d+/i";
    $with = "NUM";
    $template = "<Format replace=\"{$replace}\" with=\"{$with}\">{$source}</Format>";

    $expected = preg_replace($replace, $with, $source);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $source = "あいうえお";
    $replace = "/い/i";
    $with = "I";
    $template = "<Format replace=\"{$replace}\" with=\"{$with}\">{$source}</Format>";

    $expected = preg_replace($replace, $with, $source);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $source = "https://example.com";
    $replace = "/http(s?):\/\//";
    $with = "";
    $template = "<Format replace=\"{$replace}\" with=\"{$with}\">{$source}</Format>";

    $expected = preg_replace($replace, $with, $source);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

  }
}
