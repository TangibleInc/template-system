<?php
class Template_Tags_Random_TestCase extends WP_UnitTestCase {
  public function test_template_tags_random_defaults() {
      srand( 0 );
      $this->assertEquals( '99', tangible_template( '<Random />' ), 'failed with seed 0' );
      $this->assertEquals( '19', tangible_template( '<Random />' ), 'failed with seed 0' );
  }

  public function test_template_tags_random_negative() {
      srand( 0 );
      $this->assertEquals( '-100', tangible_template( '<Random from=-100 to=-99/>' ), 'failed with seed 0' );
      $this->assertEquals( '-99', tangible_template( '<Random from=-100 to=-99/>' ), 'failed with seed 0' );
  }
}
