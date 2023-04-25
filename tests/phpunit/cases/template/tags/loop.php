<?php
class Template_Tags_Loop_TestCase extends WP_UnitTestCase {
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

    // With sticky=true, include sticky posts at the top
    $this->assertEquals(
      "[$sticky_id][$sticky_id_2][$post_id][$post_id_2]",
      tangible_template('<Loop type=post sticky=true>[<Field id>]</Loop>')
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
