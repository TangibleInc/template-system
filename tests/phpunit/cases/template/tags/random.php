<?php
namespace Tests\Template\Tags;

class Random_TestCase extends \WP_UnitTestCase {
  public function test_template_tags_random_defaults() {
    $result = tangible_template( '<Random />' );
    $this->assertEquals( true, is_numeric($result) );
    // Another number
    $result = tangible_template( '<Random />' );
    $this->assertEquals( true, is_numeric($result) );
  }

  public function test_template_tags_random_negative() {
    $result = tangible_template( '<Random from=-100 to=-99/>' );
    $this->assertEquals( true, $result >= -100, 'from -100' );
    $this->assertEquals( true, $result <= -99, 'to -99' );
  }
}
