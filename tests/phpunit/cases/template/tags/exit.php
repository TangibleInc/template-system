<?php
class Template_Tags_Exit_TestCase extends WP_UnitTestCase {
	public function test_template_tags_exit_catch() {
		$template = '<div><Exit /></div>';
		$this->assertEquals('<div></div>', tangible_template($template));

		$template = '<div><Exit />what about this?</div>';
		$this->assertEquals('<div></div>', tangible_template($template));

		$template = '<If check="_test" is value="_test"><Exit /></If>';
		$template .= 'This part will display only if condition above did not match.';
		$this->assertEmpty(tangible_template($template));

		$template = '<Catch><Exit />This will not show because it\'s after exit.</Catch>';
		$template .= 'This will show because it\'s after exit was caught.';
		$this->assertEquals('This will show because it\'s after exit was caught.', tangible_template($template));
	}
}
