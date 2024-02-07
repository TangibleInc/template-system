<?php
namespace Tests\Admin;
use tangible\template_system;

class Universal_ID_TestCase extends \WP_UnitTestCase {

  function test_main() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $plugin = tangible_template_system();

    $this->assertEquals( true, isset($plugin->get_universal_id));
    $this->assertEquals( true, isset($plugin->set_universal_id));
    $this->assertEquals( true, isset($plugin->create_universal_id));

    $this->assertEquals( true, !empty($plugin->create_universal_id()));

    $namespace = 'tangible\\template_system';

    $this->assertEquals( true, is_callable($namespace.'\\get_universal_id'));
    $this->assertEquals( true, is_callable($namespace.'\\set_universal_id'));
    $this->assertEquals( true, is_callable($namespace.'\\create_universal_id'));
    $this->assertEquals( true, is_callable($namespace.'\\ensure_universal_id'));

    $this->assertEquals( true, !empty(template_system\create_universal_id()));

    $post_id = self::factory()->post->create_object([
      'post_type' => 'post',
      'post_status' => 'publish',
      // Important: wp_insert_post() throws error if these are not defined
      'post_title' => 'Test',
      'post_content' => '',
      'post_excerpt' => '',
    ]);
    $this->assertTrue( !empty($post_id) );
    $this->assertTrue( !is_wp_error($post_id), print_r($post_id, true) );

    $value = 123;
    update_post_meta($post_id, 'test', $value );
    $value_2 = (int) get_post_meta( $post_id, 'test', true );
    $this->assertTrue( $value_2 === $value, print_r([$value, $value_2], true) );

    $uid = template_system\set_universal_id( $post_id );
    $this->assertTrue( !empty($uid) );

    $uid_2 = template_system\get_universal_id( $post_id );
    $this->assertTrue( $uid_2 === $uid, print_r([$uid, $uid_2], true) );

    $uid = template_system\ensure_universal_id( $post_id );
    $this->assertTrue( !empty($uid) );

    $uid_2 = template_system\get_universal_id( $post_id );
    $this->assertTrue( $uid_2 === $uid, print_r([$uid, $uid_2], true) );

    $uid_3 = template_system\ensure_universal_id( $post_id );
    $this->assertTrue( $uid_3 === $uid, print_r([$uid, $uid_2, $uid_3], true) );
  }
}
