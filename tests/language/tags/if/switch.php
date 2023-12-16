<?php
namespace Tests\Template\Tags;

class Switch_TestCase extends \WP_UnitTestCase {
  /**
   * Switch/when value matches regular expression pattern
   * Based on If matches paattern test from ./pattern.php
   */
  function test_when_match_pattern() {
    $check = "http://example.com";
    $match = '/http(s?):\/\//';
    $expected = "TRUE";
    $template = "<Switch check=\"{$check}\"><When matches_pattern=\"{$match}\" />TRUE<When />FALSE</Switch>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $check = "https://example.com";
    $expected = "TRUE";
    $template = "<Switch check=\"{$check}\"><When matches_pattern=\"{$match}\" />TRUE<When />FALSE</Switch>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $check = "example.com";
    $expected = "FALSE";
    $template = "<Switch check=\"{$check}\"><When matches_pattern=\"{$match}\" />TRUE<When />FALSE</Switch>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Pattern with curly braces

    $match = '/.{4,}/'; // Repetition

    $check = "123abc";
    $expected = "TRUE";
    $template = "<Switch check=\"{$check}\"><When matches_pattern=\"{$match}\" />TRUE<When />FALSE</Switch>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $check = "123";
    $expected = "FALSE";
    $template = "<Switch check=\"{$check}\"><When matches_pattern=\"{$match}\" />TRUE<When />FALSE</Switch>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );
 
    // Support dynamic tags (only without delimiters)

    $check = "123abc";
    $expected = "TRUE";
    $template = "<Set pattern>{$match}</Set><Switch check=\"{$check}\"><When matches_pattern=\"{Get pattern}\" />TRUE<When />FALSE</Switch>";
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );
  }
};
