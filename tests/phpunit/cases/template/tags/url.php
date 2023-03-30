<?php
class Template_Tags_Url_TestCase extends WP_UnitTestCase {
	public function test_template_tags_url_current() {
		$template = '<Url />';

		$post_id = self::factory()->post->create([
		]);

		$this->set_permalink_structure('/%postname%');
		$this->go_to($permalink = get_permalink($post_id));
		$GLOBALS['wp']->query_params = '';

		$this->assertSame($permalink, tangible_template($template));

		tangible_template()->flush_variable_type_memory('url');

		$this->set_permalink_structure('/?p=%post_id%');
		$this->go_to($permalink = get_permalink($post_id));

		$this->assertSame($permalink, tangible_template($template));
	}
}
