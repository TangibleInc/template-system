<?php
namespace Tests\Admin;
use tangible\template_system;
use tangible\format;

class Template_Save_TestCase extends \WP_UnitTestCase {

  /**
   * Generate template slug from title
   * 
   * @see /admin/template-post/save.php
   */
  function test_template_slug() {

    $plugin = tangible_template_system();

    $title = 'Test - éùæøŸ';

    $post_id = self::factory()->post->create_object([
      'post_type' => 'post',
      'post_status' => 'publish',
      'post_title' => $title,
      // Important: wp_insert_post() throws error if these are not defined
      'post_content' => '',
      'post_excerpt' => '',
    ]);

    $expected = 'test-euaeoy';

    $this->assertEquals($expected, format\slugify($title));

    $post = get_post($post_id);

    $this->assertEquals($expected, $post->post_name);

  }
}
