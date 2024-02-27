<?php
namespace Tests\Integrations;
use tangible\template_system;

class ACF_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  function test_dependency_active() {
    if (!$this->is_dependency_active()) {      
      echo 'Advanced Custom Fields is not installed and active';
    }
    $this->assertTrue(true);
  }

  function test_date_field() {

    if (!$this->is_dependency_active()) {
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $field_name = 'date_field';

    // https://www.advancedcustomfields.com/resources/register-fields-via-php/
    acf_add_local_field_group([
      'key' => 'group_1',
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_1',
          'label' => 'Date field',
          'name' => $field_name,
          'type' => 'date_picker',
        ]
      ],
      'location' => [
        [
          [
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'post',
          ]
        ]
      ],
    ]);
  
    $post_id = self::factory()->post->create_object([
      'post_type' => 'post',
      'post_status'  => 'publish', // Important for Loop tag
      'post_title' => 'Test',
      'post_content' => '',
    ]);

    // https://www.advancedcustomfields.com/resources/date-picker/#database-format
    $value = '20200101';
    update_post_meta($post_id, $field_name, $value );

    $result = get_post_meta( $post_id, $field_name, true );
    $this->assertTrue( $result === $value, print_r([$value, $result], true) );

    // Set default locale
    global $locale;

    $locale = 'en_US';
    $result = get_locale();
    $this->assertTrue( $result === $locale, print_r([$locale, $result], true) );

    update_option( 'date_format', 'F j, Y' );

    $expected = 'January 1, 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$field_name /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Different default locale

    $locale = 'fr_FR';
    $result = get_locale();
    $this->assertTrue( $result === $locale, print_r([$locale, $result], true) );
    
    $expected = 'janvier 1, 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$field_name /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Field attribute "locale" has precedence

    $expected = 'January 1, 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$field_name locale=en /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Field attribute "format" has precedence

    $expected = '2020-01-01';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$field_name format=\"Y-m-d\" /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    $expected = 'mercredi 1 janvier 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$field_name format=\"l j F Y\" /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

  }
}
