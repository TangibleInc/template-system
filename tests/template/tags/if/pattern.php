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
  }
}
