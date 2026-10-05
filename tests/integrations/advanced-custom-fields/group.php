<?php
namespace Tests\Integrations;
use tangible\template_system;

class ACF_Group_TestCase extends \WP_UnitTestCase {

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
        'key' => 'field_group_test_' . $name,
        'label' => ucfirst(str_replace('_', ' ', $name)),
        'name' => $name,
        'type' => $type,
      ], $config);
    };

    $choices = [
      'a' => 'Label A',
      'b' => 'Label B',
    ];

    acf_add_local_field_group([
      'key' => 'group_group_test',
      'title' => 'My Group',
      'fields' => [
        $field('group_field', 'group', [
          'sub_fields' => [
            $field('text_field', 'text'),
            $field('text_field_2', 'text'),
            $field('radio_field', 'radio', [ 'choices' => $choices ]),
            $field('checkbox_field', 'checkbox', [ 'choices' => $choices ]),
            $field('true_field', 'true_false'),
            $field('false_field', 'true_false'),
            $field('date_field', 'date_picker'),
            $field('post_field', 'relationship'),
            $field('image_field', 'image'),
            $field('inner_group', 'group', [
              'sub_fields' => [
                $field('inner_text', 'text'),
              ],
            ]),
            $field('repeater', 'repeater', [
              'sub_fields' => [
                $field('item', 'text'),
              ],
            ]),
          ],
        ]),
        $field('group_test_empty', 'group', [
          'sub_fields' => [
            $field('empty_text', 'text'),
          ],
        ]),
        $field('group_test_top_text', 'text'),
      ],
      'location' => [
        [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ] ]
      ],
    ]);
  }

  function create_post() {

    $this->register_fields();

    $related = [];

    foreach ([ 'Related 1', 'Related 2' ] as $title) {
      $related []= self::factory()->post->create_object([
        'post_type' => 'post',
        'post_status' => 'publish',
        'post_title' => $title,
        'post_content' => '',
      ]);
    }

    $image = self::factory()->attachment->create_object('group-test.png', 0, [
      'post_mime_type' => 'image/png',
      'post_title' => 'Image',
    ]);

    $post_id = self::factory()->post->create_object([
      'post_type' => 'post',
      'post_status'  => 'publish', // Important for Loop tag
      'post_title' => 'Test',
      'post_content' => '',
    ]);

    // https://www.advancedcustomfields.com/resources/update_field/
    update_field('group_field', [
      'text_field' => 'Test 1',
      'text_field_2' => 'Test 2',
      'radio_field' => 'b',
      'checkbox_field' => [ 'a', 'b' ],
      'true_field' => 1,
      'false_field' => 0,
      'date_field' => '20260115',
      'post_field' => $related,
      'image_field' => $image,
      'inner_group' => [
        'inner_text' => 'Inner',
      ],
      'repeater' => [
        [ 'item' => 'A' ],
        [ 'item' => 'B' ],
      ],
    ], $post_id);

    update_field('group_test_top_text', 'Top', $post_id);

    return $post_id;
  }

  function render($template) {

    $post_id = $this->create_post();

    return trim(tangible_template()->render(
      "<Loop type=post id=$post_id>$template</Loop>"
    ));
  }

  /**
   * Each template is rendered inside a loop on the post holding the fields
   */
  function templates() {

    $group = function($content) {
      return "<Loop acf_group=group_field>$content</Loop>";
    };

    return [

      // Sub-fields inside the group loop

      'sub-field by name' => [
        $group('<Field text_field />|<Field text_field_2 />'),
        'Test 1|Test 2',
      ],
      'sub-field by ACF type' => [
        $group('<Field acf_text=text_field />|<Field acf_text=text_field_2 />'),
        'Test 1|Test 2',
      ],
      'sub-field label' => [
        $group('<Field acf_text=text_field field=field_label />'),
        'Text field',
      ],
      'choice value and label' => [
        $group('<Field acf_radio=radio_field />|<Field acf_radio=radio_field field=label />'),
        'b|Label B',
      ],
      'choice labels' => [
        $group('<Loop acf_checkbox=checkbox_field field=labels><Field />,</Loop>'),
        'Label A,Label B,',
      ],
      'date format' => [
        $group('<Field acf_date=date_field format="Y/m/d" />'),
        '2026/01/15',
      ],
      'condition on true/false' => [
        $group('<If acf_true_false=true_field>yes<Else />no</If>|<If acf_true_false=false_field>yes<Else />no</If>'),
        'yes|no',
      ],
      'condition on value' => [
        $group('<If acf_radio=radio_field value=b>yes<Else />no</If>|<If acf_radio=radio_field value=a>yes<Else />no</If>'),
        'yes|no',
      ],

      // Loops inside the group loop

      'relationship loop' => [
        $group('<Loop acf_relationship=post_field orderby=title order=asc><Field title />,</Loop>'),
        'Related 1,Related 2,',
      ],
      'image loop' => [
        $group('<Loop acf_image=image_field><Field title /></Loop>'),
        'Image',
      ],
      'repeater loop' => [
        $group('<Loop acf_repeater=repeater><Field item /></Loop>'),
        'AB',
      ],
      'group loop' => [
        $group('<Loop acf_group=inner_group><Field inner_text />|<Field acf_text=inner_text /></Loop>'),
        'Inner|Inner',
      ],
      'sub-field after a nested loop' => [
        $group('<Loop acf_group=inner_group><Field inner_text /></Loop>|<Field acf_text=text_field />'),
        'Inner|Test 1',
      ],

      // Group loop and its surroundings

      'same group twice' => [
        $group('<Field acf_text=text_field />') . '|' . $group('<Field acf_text=text_field />'),
        'Test 1|Test 1',
      ],
      'post field after the group' => [
        $group('<Field text_field />') . '|<Field acf_text=group_test_top_text />',
        'Test 1|Top',
      ],
      'empty group' => [
        '[<Loop acf_group=group_test_empty>empty</Loop>]',
        '[]',
      ],
      'sub-field as post field' => [
        '<Field group_field_text_field />',
        'Test 1',
      ],

      // Field tag, without a group loop in the template

      'Field tag: sub-field' => [
        '<Field acf_group=group_field field=text_field />',
        'Test 1',
      ],
      'Field tag: choice sub-field' => [
        '<Field acf_group=group_field field=radio_field />',
        'b',
      ],
      'Field tag: nested sub-field' => [
        '<Field acf_group=group_field field=inner_group.inner_text />',
        'Inner',
      ],
      'Field tag: unknown sub-field' => [
        '[<Field acf_group=group_field field=unknown />]',
        '[]',
      ],
      'Field tag: empty group' => [
        '[<Field acf_group=group_test_empty field=empty_text />]',
        '[]',
      ],
      'Field tag: field label' => [
        '<Field acf_group=group_field field=field_label />',
        'Group field',
      ],
      'Field tag: inside a group loop' => [
        $group('<Field acf_group=inner_group field=inner_text />|<Field acf_text=text_field />'),
        'Inner|Test 1',
      ],
      'Field tag: before a group loop' => [
        '<Field acf_group=group_field field=text_field />|' . $group('<Field acf_text=text_field />'),
        'Test 1|Test 1',
      ],
    ];
  }

  /**
   * @dataProvider templates
   */
  function test_group_field($template, $expected) {
    if (!$this->is_dependency_active()) {      
      $this->assertTrue(true);
      return;
    }

    $this->assertSame($expected, $this->render($template));
  }

  function test_group_field_config() {
    if (!$this->is_dependency_active()) {      
      $this->assertTrue(true);
      return;
    }

    $config = json_decode(
      $this->render('<Field acf_group=group_field field=config />'),
      true
    );

    $this->assertSame('group', $config['type'] ?? null);
    $this->assertSame('group_field', $config['name'] ?? null);
  }
}
