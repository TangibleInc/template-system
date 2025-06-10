<?php
namespace Tests\Integrations;
use tangible\template_system;

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
            ],
            [
              'key' => 'field_3',
              'label' => 'Date field',
              'name' => 'date_field',
              'type' => 'date',
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

    $text_1 = 'Test 1';
    $text_2 = 'Test 22';
    $text_3 = 'Test 333';

    $date_1 = '2020-01-01 06:15:00';
    $date_2 = '2020-01-02 12:30:00';
    $date_3 = '2020-01-03 18:45:00';

    // https://www.advancedcustomfields.com/resources/update_field/
    update_field('repeater_field', [
      [
        'text_field' => $text_1,
        'date_field' => $date_1
      ],
      [
        'text_field' => $text_2,
        'date_field' => $date_2
      ],
      [
        'text_field' => $text_3,
        'date_field' => $date_3
      ],
    ], $post_id);

    $expected = <<<HTML
    $text_1 - $date_1
    $text_2 - $date_2
    $text_3 - $date_3
    HTML;

    $result = $html->render(<<<HTML
    <Loop type=post id=$post_id><Loop acf_repeater="repeater_field">
    <Field text_field /> - <Field date_field />
    </Loop></Loop>
    HTML);

    $this->assertEquals(trim($expected), trim($result));

    $expected = <<<HTML
    $text_3 - $date_3
    $text_2 - $date_2
    $text_1 - $date_1
    HTML;

    $result = $html->render(<<<HTML
    <Loop type=post id=$post_id><Loop acf_repeater="repeater_field"
      sort_field=date_field sort_type=date sort_order=desc>
    <Field text_field /> - <Field date_field />
    </Loop></Loop>
    HTML);

    $this->assertEquals(trim($expected), trim($result));

  }
}
