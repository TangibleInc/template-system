<?php
namespace Tests\Integrations;
use tangible\template_system;

class ACF_Choice_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  /**
   * ACF stores field groups globally, not in the database, so they aren't
   * reset between tests. They are registered once, with keys unique to
   * this file.
   *
   * @see https://www.advancedcustomfields.com/resources/register-fields-via-php/
   */
  function register_fields() {

    static $is_registered = false;

    if ($is_registered) return;
    $is_registered = true;

    $field = function($name, $type, $config = []) {
      return array_merge([
        'key' => 'field_choice_test_' . $name,
        'label' => ucfirst(str_replace('_', ' ', $name)),
        'name' => $name,
        'type' => $type,
        'choices' => [
          'a' => 'Label A',
          'b' => 'Label B',
          'c' => 'Label C',
        ],
      ], $config);
    };

    acf_add_local_field_group([
      'key' => 'group_choice_test',
      'title' => 'My Group',
      'fields' => [
        $field('choice_select', 'select'),
        $field('choice_multi_select', 'select', [ 'multiple' => 1 ]),
        $field('choice_radio', 'radio'),
        $field('choice_checkbox', 'checkbox'),
      ],
      'location' => [
        [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ] ]
      ],
    ]);
  }

  function render($template) {

    $this->register_fields();

    $post_id = self::factory()->post->create_object([
      'post_type' => 'post',
      'post_status'  => 'publish', // Important for Loop tag
      'post_title' => 'Test',
      'post_content' => '',
    ]);

    update_field('choice_select', 'b', $post_id);
    update_field('choice_multi_select', [ 'a', 'c' ], $post_id);
    update_field('choice_radio', 'c', $post_id);
    update_field('choice_checkbox', [ 'a', 'b' ], $post_id);

    return trim(tangible_template()->render(
      "<Loop type=post id=$post_id>$template</Loop>"
    ));
  }

  function templates() {
    return [

      // Field tag

      'select value' => [ '<Field acf_select=choice_select />', 'b' ],
      'select label' => [ '<Field acf_select=choice_select field=label />', 'Label B' ],
      'radio value' => [ '<Field acf_radio=choice_radio />', 'c' ],
      'radio label' => [ '<Field acf_radio=choice_radio field=label />', 'Label C' ],
      'checkbox labels' => [
        '<Field acf_checkbox=choice_checkbox field=labels />',
        '["Label A","Label B"]',
      ],
      'multiple select labels' => [
        '<Field acf_multi_select=choice_multi_select field=labels />',
        '["Label A","Label C"]',
      ],
      'choices' => [
        '<Field acf_radio=choice_radio field=choices />',
        '[{"value":"a","label":"Label A"},{"value":"b","label":"Label B"},{"value":"c","label":"Label C"}]',
      ],
      'choices map' => [
        '<Field acf_select=choice_select field=choices_map />',
        '{"a":"Label A","b":"Label B","c":"Label C"}',
      ],
      'field label' => [ '<Field acf_select=choice_select field=field_label />', 'Choice select' ],

      // Loop tag

      'loop on values' => [
        '<Loop acf_checkbox=choice_checkbox><Field />,</Loop>',
        'a,b,',
      ],
      'loop on a single select' => [
        '<Loop acf_select=choice_select><Field />,</Loop>',
        'b,',
      ],
      'loop on labels' => [
        '<Loop acf_select=choice_multi_select field=labels><Field />,</Loop>',
        'Label A,Label C,',
      ],
      'loop on choices' => [
        '<Loop acf_select=choice_select field=choices><Field value />=<Field label />,</Loop>',
        'a=Label A,b=Label B,c=Label C,',
      ],

      // If tag

      'condition on value' => [
        '<If acf_select=choice_select value=b>yes<Else />no</If>|<If acf_select=choice_select value=a>yes<Else />no</If>',
        'yes|no',
      ],
    ];
  }

  /**
   * @dataProvider templates
   */
  function test_choice_field($template, $expected) {
    if (!$this->is_dependency_active()) {      
      $this->assertTrue(true);
      return;
    }

    $this->assertSame($expected, $this->render($template));
  }
}
