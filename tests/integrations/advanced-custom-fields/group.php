<?php
namespace Tests\Integrations;
use tangible\template_system;

class ACF_Group_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  function test_group_field() {
    if (!$this->is_dependency_active()) {      
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $group_field_name = 'group_field';

    $group_key = wp_unique_id('test_group');

    acf_add_local_field_group([
      'key' => $group_key,
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_1',
          'label' => 'Group field',
          'name' => $group_field_name,
          'type' => 'group',
          'sub_fields' => [
            [
              'key' => 'field_2',
              'label' => 'Text field',
              'name' => 'text_field',
              'type' => 'text',
            ],
            [
              'key' => 'field_3',
              'label' => 'Text field',
              'name' => 'text_field_2',
              'type' => 'text',
            ],
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
    update_field($group_field_name, [
      'text_field' => 'Test 1',
      'text_field_2' => 'Test 2'
    ], $post_id);

    $expected = <<<'HTML'
    Test 1
    Test 2
    HTML;

    $result = $html->render(<<<HTML
    <Loop type=post id=$post_id><Loop acf_group="$group_field_name">
    <Field text_field />
    <Field text_field_2 />
    </Loop></Loop>
    HTML);

    $this->assertEquals(trim($expected), trim($result));
  }
}
