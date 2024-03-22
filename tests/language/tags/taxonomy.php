<?php
namespace Tests\Language\Tags;

class Taxonomy_TestCase extends \WP_UnitTestCase {
  function test_taxonomy_tag() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['Taxonomy']) );

    $result = $html->render('<Taxonomy />');

    $this->assertNull( $error );
    // $this->assertEquals( true, !empty($result) );

    restore_error_handler();
  }

  function test_taxonomy_loop() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
    });

    $post_id = self::factory()->post->create_object([
      'post_type' => 'post',
      'post_status'  => 'publish', // Important for Loop tag
      'post_title' => 'Test',
      'post_content' => '',
    ]);

    $categories = ['Cat 1', 'Cat 2'];
    $category_ids = wp_create_categories($categories, $post_id);

    foreach ($categories as $cat) {
      $this->assertEquals(true, category_exists($cat), "Category \"$cat\"");
    }


    $error = null;

    $html = tangible_template();

    $expected = implode(', ', $categories);
    $result = $html->render(<<<HTML
    <Loop type=post id=$post_id>
      <Taxonomy category><Term title /><If not last>, </If></Taxonomy>
    </Loop>
    HTML);

    $this->assertEquals(trim($expected), trim($result));
    $this->assertNull( $error );

    $expected = (string) $category_ids[0];
    $result = $html->render(<<<HTML
    <Loop type=post id=$post_id>
      <Taxonomy category include={$category_ids[0]}><Term id /><If not last>,</If></Taxonomy>
    </Loop>
    HTML);

    $this->assertEquals(trim($expected), trim($result));
    $this->assertNull( $error );

    restore_error_handler();
  }
}
