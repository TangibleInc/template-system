<?php
class Usable_TestCase extends WP_UnitTestCase {
	public function test_template_system_module_is_loaded_and_usable() {
		$this->assertTrue(function_exists('tangible_template_system'), 'tangible_template_system() is not defined');
		$this->assertEquals('tangible_template_system', tangible_template_system()->name);
		$this->assertNotEmpty(did_action('tangible_template_system_ready'), 'tangible_template_system is not ready');
	}
}
