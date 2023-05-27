<?php
namespace Tests\Template\Loop;

class Loop_TestCase extends \WP_UnitTestCase {
  public function test_loop_deprecated_type_parameter() {

    /**
     * Ensure backward compatibility with PostLoop query parameter change from
     * "type" to "post_type"
     */

    $error = null;

    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    // Inherit definition for deprecated parameter: should not throw warning

    TestLoop::$config['query_args']['type'] = \Tangible\Loop\PostLoop::$config['query_args']['type'];

    new TestLoop;

    $this->assertNull( $error );

    // Ensure deprecated parameter is still usable in constructor

    $error = null;

    $post_type = 'test_post_type';

    [$post_1, $post_2, $post_3] = self::factory()->post->create_many(3, [
      'post_type' => $post_type
    ]);

    $test_loop = new TestLoop([
      'type' => $post_type
    ]);

    $this->assertNull( $error );
    $this->assertEquals( $test_loop->total_items, [$post_1, $post_2, $post_3] );

    // New parameter works the same

    $error = null;

    $test_loop = new TestLoop([
      'post_type' => $post_type
    ]);

    $this->assertNull( $error );
    $this->assertEquals( $test_loop->total_items, [$post_1, $post_2, $post_3] );

  }
}

class TestLoop extends \Tangible\Loop\PostLoop {};
