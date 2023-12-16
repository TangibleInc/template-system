<?php
namespace Tests\Template\Tags;

class Format_HTML_TestCase extends \WP_UnitTestCase {

  function test_format_html_attribute() {
    $template = '<Format html_attribute>"\'</Format>';
    $this->assertEquals( '&quot;&#039;', tangible_template( $template ) );
  }

function test_format_html_entities() {
  $template = '<Format html_entities>&</Format>';
  $this->assertEquals( '&amp;', tangible_template( $template ) );
}

  function test_format_remove_html() {
    $this->assertEquals( '123456', tangible_template(
      '<Format remove_html><a href="example.com">123</a><script>alert("hi")</script><b>456</b></Format>'
    ) );
  }

}
