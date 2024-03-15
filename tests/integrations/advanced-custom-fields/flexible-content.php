<?php
namespace Tests\Integrations;
use tangible\template_system;

class ACF_Flexible_Content_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  function test_flexible_content_field() {
    if (!$this->is_dependency_active()) {
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $flexible_content_field_name = 'flexible_content_field';

    $group_key = wp_unique_id('test_group');

    acf_add_local_field_group([
      'key' => $group_key,
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_1',
          'label' => 'Flexible Content field',
          'name' => $flexible_content_field_name,
          'type' => 'flexible_content',
          'layouts' => [
            [
              'key' => 'layout_1',
              'name' => 'layout_1',
              'label' => 'Layout 1',
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
            [
              'key' => 'layout_2',
              'name' => 'layout_2',
              'label' => 'Layout 2',
              'sub_fields' => [
                [
                  'key' => 'field_4',
                  'label' => 'Text field',
                  'name' => 'text_field',
                  'type' => 'text',
                ],
                [
                  'key' => 'field_5',
                  'label' => 'Text field',
                  'name' => 'text_field_2',
                  'type' => 'text',
                ],
              ],
            ],
          ]
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
    update_field($flexible_content_field_name, [
      // Field can contain multiple values with different layouts
      [
        'acf_fc_layout' => 'layout_1',
        'text_field' => 'Test 1',
        'text_field_2' => 'Test 2',
      ],
      [
        'acf_fc_layout' => 'layout_2',
        'text_field' => 'Test 3',
        'text_field_2' => 'Test 4',
      ],
    ], $post_id);

    $expected = <<<'HTML'
    Layout 1:
    Test 1
    Test 2
    Layout 2:
    Test 3
    Test 4
    HTML;

    $result = $html->render(<<<HTML
    <Loop type=post id=$post_id><Loop acf_flexible="$flexible_content_field_name">
    <If field=layout value=layout_1>Layout 1:<Else if field=layout value=layout_2 />Layout 2:</If>
    <Field text_field />
    <Field text_field_2 />
    </Loop></Loop>
    HTML);

    $this->assertEquals(trim($expected), trim($result));
  }
}
