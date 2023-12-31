<?php
class Template_Usable_TestCase extends WP_UnitTestCase {
  public function test_template_module_is_loaded_and_usable() {
      $this->assertTrue( function_exists( 'tangible_template' ), 'tangible_template() is not defined' );
      $this->assertEquals( 'tangible_template', tangible_template()->name );
      $this->assertNotEmpty( did_action( 'tangible_templates_ready' ) );
  }

  public function test_dynamic_methods_does_not_exist() {
      $errored = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$errored ) {
          $errored = [ $errno, $errstr, $args ];
          restore_error_handler();
    });
      tangible_template()->_this_method_does_not_exist();

      $this->assertNotNull( $errored, '_this_method_does_not_exist did not trigger a warning' );
      [$errno, $errstr, $args] = $errored;

      $this->assertEquals( E_USER_WARNING, $errno, '_this_method_does_not_exist did not trigger an E_USER_WARNING' );
  }

  public function test_dynamic_method_exists() {
      tangible_template()->_this_method_returns_true = '__return_true';
      $this->assertTrue( tangible_template()->_this_method_returns_true(), '_this_method_returns_true does not return true' );
  }
}
