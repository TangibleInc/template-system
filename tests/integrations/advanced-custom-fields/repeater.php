<?php
namespace Tests\Integrations;
use tangible\template_system;

/**
 * - [Register ACF fields](https://www.advancedcustomfields.com/resources/register-fields-via-php/)
 */

class ACF_Repeater_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  function test_repeater_field() {
    if (!$this->is_dependency_active()) {      
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $repeater_field_name = 'repeater_field';

    $group_key = wp_unique_id('test_group');

    acf_add_local_field_group([
      'key' => $group_key,
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_1',
          'label' => 'Repeater field',
          'name' => $repeater_field_name,
          'type' => 'repeater',
          'sub_fields' => [
            [
              'key' => 'field_2',
              'label' => 'Text field',
              'name' => 'text_field',
              'type' => 'text',
            ]
          ],
        ],
      ],
      'location' => [
        [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ] ]
      ],
    ]);

    // \tangible\see(acf_get_local_field_group($group_key));
    
    $post_id = self::factory()->post->create_object([
      'post_type' => 'post',
      'post_status'  => 'publish', // Important for Loop tag
      'post_title' => 'Test',
      'post_content' => '',
    ]);

    // https://www.advancedcustomfields.com/resources/update_field/
    update_field('repeater_field', [
      [
        'text_field' => 'Test 1'
      ],
      [
        'text_field' => 'Test 22'
      ],
      [
        'text_field' => 'Test 333'
      ],
    ], $post_id);

    $expected = <<<'HTML'
    Test 1
    Test 22
    Test 333
    HTML;

    $result = $html->render(<<<HTML
    <Loop type=post id=$post_id><Loop acf_repeater="repeater_field">
    <Field text_field />
    </Loop></Loop>
    HTML);

    $this->assertEquals(trim($expected), trim($result));
  }
}
