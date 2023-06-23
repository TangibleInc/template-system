<?php
namespace Tests\Template\Tags;

class Loop_RegularExpression_TestCase_ extends \WP_UnitTestCase {
  /**
   * Loop matched values by regular expression
   * Also see ../format/regex.php, ../if/regex.php
   */
  function test_loop_match_regex() {
    $template = <<<HTML
      <Set list=example><Format match="/\d+/">Test 123 and 456</Format></Set>
      <Loop list=example>[<Field />]</Loop>
    HTML;
    $result = trim( tangible_template( $template ) );
    $expected = '[123][456]';
    $this->assertEquals( $expected, $result, $template );
  }
}
