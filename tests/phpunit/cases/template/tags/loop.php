<?php
class Template_Tags_Loop_TestCase extends WP_UnitTestCase {
	/**
	 * @link https://app.clickup.com/t/860qja6hm
	 * @link https://wordpress.org/support/topic/sticky-post-not-showing-in-loop/
	 */
	public function test_loop_ignore_sticky_posts() {
		[$post_id, $sticky_id, $slimey_id] = self::factory()->post->create_many(3, []);
		stick_post($sticky_id);

		$this->assertEquals(
			"[$post_id][$sticky_id][$slimey_id]",
			tangible_template('<Loop type="post">[<Field id>]</Loop>')
		);

		$this->assertEquals(
			"[$post_id][$sticky_id][$slimey_id]",
			tangible_template('<Loop type="post" sticky="default">[<Field id>]</Loop>')
		);

		$this->assertEquals(
			"[$sticky_id]",
			tangible_template('<Loop type="post" sticky="only">[<Field id>]</Loop>')
		);

		$this->assertEquals(
			"[$post_id][$slimey_id]",
			tangible_template('<Loop type="post" sticky="hidden">[<Field id>]</Loop>')
		);

		$this->assertEquals(
			"[$sticky_id][$post_id][$slimey_id]",
			tangible_template('<Loop type="post" sticky="first">[<Field id>]</Loop>')
		);
	}
}
