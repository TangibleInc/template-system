<?php
class Template_Tags_Loop_TestCase extends WP_UnitTestCase {
  public function test_loop_post_type() {

    [$post_1, $post_2, $post_3] = self::factory()->post->create_many(3, [
      'post_type' => 'custom'
    ]);

    $this->assertEquals(
      "[$post_1][$post_2][$post_3]",
      tangible_template('<Loop type=custom>[<Field id>]</Loop>')
    );

    $this->assertEquals(
      "[$post_1][$post_2][$post_3]",
      tangible_template('<Loop type=post post_type=custom>[<Field id>]</Loop>')
    );

    /**
     * Ensure attribute "post_type" can access a post type which has the same
     * name as existing loop type.
     */

    [$post_1, $post_2, $post_3] = self::factory()->post->create_many(3, [
      'post_type' => 'user'
    ]);

    $this->assertEquals(
      "[$post_1][$post_2][$post_3]",
      tangible_template('<Loop type=post post_type=user>[<Field id>]</Loop>')
    );

    $this->assertEquals(
      "[$post_1][$post_2][$post_3]",
      tangible_template('<Loop post_type=user>[<Field id>]</Loop>')
    );

    $this->assertNotEquals(
      "[$post_1][$post_2][$post_3]",
      tangible_template('<Loop type=user>[<Field id>]</Loop>')
    );

  }

  /**
   * Default loop context
   */
  public function test_loop_post_type_archive() {

    register_post_type( 'custom', [
      'has_archive' => true
    ]);
    
    [$post_1, $post_2, $post_3] = self::factory()->post->create_many(3, [
      'post_type' => 'custom'
    ]);

    $this->go_to( get_post_type_archive_link('custom') );

    $errored = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$errored ) {
      $errored = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    // Posts are ordered by most recent
    $this->assertEquals(
      "[$post_3][$post_2][$post_1]",
      tangible_template('<Loop>[<Field id>]</Loop>')
    );

    // Ensure no warning for missing type or post_type attribute
    $this->assertNull( $errored );
  }

  /**
   * Sticky posts
   * @see /loop/types/post/index.php, attribute "sticky"
   */
  public function test_loop_sticky_posts() {

    [$post_id, $sticky_id, $post_id_2, $sticky_id_2] = self::factory()->post->create_many(4, []);

    stick_post($sticky_id);
    stick_post($sticky_id_2);

    // Without sticky set, include sticky posts but treat them as normal posts, not at the top
    $this->assertEquals(
      "[$post_id][$sticky_id][$post_id_2][$sticky_id_2]",
      tangible_template('<Loop type=post>[<Field id>]</Loop>')
    );

    // With sticky=true, include sticky posts at the top - regardless of orderby
    $expected = "[$sticky_id][$sticky_id_2][$post_id][$post_id_2]";
    $this->assertEquals(
      $expected,
      tangible_template('<Loop type=post sticky=true orderby=id>[<Field id>]</Loop>')
    );

    // Convert deprecated ignore_sticky_posts=false to behave as sticky=true
    $this->assertEquals(
      $expected,
      tangible_template('<Loop type=post ignore_sticky_posts=false>[<Field id>]</Loop>')
    );

    // With sticky=false, exclude sticky posts
    $this->assertEquals(
      "[$post_id][$post_id_2]",
      tangible_template('<Loop type=post sticky=false>[<Field id>]</Loop>')
    );

    // With sticky=only, include sticky posts only
    $this->assertEquals(
      "[$sticky_id][$sticky_id_2]",
      tangible_template('<Loop type=post sticky=only>[<Field id>]</Loop>')
    );
  }
}
