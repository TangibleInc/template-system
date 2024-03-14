<?php
namespace Tests\Integrations;
use tangible\template_system;

class ACF_Time_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  /**
   * Time field - Saved as H:i:s
   */
  function test_time_field() {

    if (!$this->is_dependency_active()) {
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $time_field_name = 'time_field';

    acf_add_local_field_group([
      'key' => wp_unique_id('test_group'),
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_3',
          'label' => 'Time field',
          'name' => $time_field_name,
          'type' => 'time_picker',
          // Different from raw value "H:i:s"
          'return_format' => 'g:i a',
        ],
      ],
      'location' => [
        [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ] ]
      ],
    ]);

    $post_id = self::factory()->post->create_object([
      'post_type' => 'post',
      'post_status'  => 'publish', // Important for Loop tag
      'post_title' => 'Test',
      'post_content' => '',
    ]);

    $value = '12:34:56';
    update_post_meta($post_id, $time_field_name, $value );
    
    $result = get_post_meta( $post_id, $time_field_name, true );
    $this->assertEquals( $value, $result );

    $expected = '12:34';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_time=$time_field_name format=\"H:i\" /></Loop>");
    $this->assertEquals( $expected, $result );

    $expected = '12:34 pm';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_time=$time_field_name format=\"g:i a\" /></Loop>");
    $this->assertEquals( $expected, $result );

  }

}
