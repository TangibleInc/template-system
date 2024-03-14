<?php
namespace Tests\Integrations;
use tangible\template_system;

class ACF_Date_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  /**
   * Date field - Saved as Ymd
   * @see /language/tags/field, /integrations/advanced-custom-fields/get-field
   */
  function test_date_field() {

    if (!$this->is_dependency_active()) {
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $date_field_name = 'date_field';

    // For testing, choose a date format different from raw value (Ymd)
    $return_format = 'd/m/Y';

    acf_add_local_field_group([
      'key' => wp_unique_id('test_group'),
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_1',
          'label' => 'Date field',
          'name' => $date_field_name,
          'type' => 'date_picker',
          'return_format'  => $return_format,
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

    $value = '20200131'; // Ymd in the database
    update_post_meta($post_id, $date_field_name, $value );

    $result = get_post_meta( $post_id, $date_field_name, true );
    $this->assertEquals( $value, $result );

    // Set locale
    global $locale;

    $locale = 'en_US';
    $result = get_locale();
    $this->assertEquals( $locale, $result );

    // Confirm that site setting for date format is *not* taken into consideration
    update_option( 'date_format', 'F j, Y' );

    // When no format is specified, use ACF field setting for return value
    $expected = '31/01/2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name /></Loop>");

    $this->assertEquals( $expected, $result );

    // Different global locale

    $locale = 'fr_FR';
    $result = get_locale();
    $this->assertEquals( $locale, $result );

    $expected = 'janvier 31, 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name format=\"F j, Y\" /></Loop>");

    $this->assertEquals( $expected, $result );

    // Field attribute "locale" has precedence

    $expected = 'January 31, 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name locale=en format=\"F j, Y\" /></Loop>");

    $this->assertEquals( $expected, $result );

    // Field attribute "format" has precedence

    $expected = '2020-01-31';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name format=\"Y-m-d\" /></Loop>");

    $this->assertEquals( $expected, $result );

    $expected = 'vendredi 31 janvier 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name format=\"l j F Y\" /></Loop>");

    $this->assertEquals( $expected, $result );

    // Restore global locale
    $locale = 'en_US';
    $result = get_locale();
    $this->assertEquals( $locale, $result );
  }

  function test_date_field_conditions() {

    if (!$this->is_dependency_active()) {
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $date_field_name = 'date_field';

    // For testing, choose a date format different from raw value (Ymd)
    $return_format = 'd/m/Y';

    acf_add_local_field_group([
      'key' => wp_unique_id('test_group'),
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_1',
          'label' => 'Date field',
          'name' => $date_field_name,
          'type' => 'date_picker',
          'return_format'  => $return_format,
        ],
        [
          'key' => 'field_1',
          'label' => 'Date field',
          'name' => $date_field_name . '_2',
          'type' => 'date_picker',
          'return_format'  => $return_format,
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

    // Past

    $value = '20200131';
    update_post_meta($post_id, $date_field_name, $value );

    $expected = 'PAST';
    $result = $html->render("<Loop type=post id=$post_id><If acf_date=$date_field_name before=now>PAST<Else />FUTURE</If></Loop>");

    $this->assertEquals( $expected, $result );

    // Future

    $value = '20401231';
    update_post_meta($post_id, $date_field_name . '_2', $value );

    $expected = 'FUTURE';
    $result = $html->render("<Loop type=post id=$post_id><If acf_date={$date_field_name}_2 before=now>PAST<Else />FUTURE</If></Loop>");

    $this->assertEquals( $expected, $result );

  }

}
