<?php
namespace Tests\Integrations;
use tangible\template_system;

/**
 * - [Register ACF fields](https://www.advancedcustomfields.com/resources/register-fields-via-php/)
 */

class ACF_Date_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  /**
   * Date field - Saved as Ymd
   * @see /language/tags/field, /integrations/advanced-custom-fields/get-field
   */
  function test_date_fields__Date() {

    if (!$this->is_dependency_active()) {
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $date_field_name = 'date_field';
    $date_time_field_name = 'date_time_field';
    $time_field_name = 'time_field';

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


  /**
   * Date-time field - Saved as Y-m-d H:i:s
   */

  function test_date_fields__Date_Time() {

    if (!$this->is_dependency_active()) {
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $date_field_name = 'date_field';
    $date_time_field_name = 'date_time_field';
    $time_field_name = 'time_field';

    /**
     * Register fields
     * @see https://www.advancedcustomfields.com/resources/register-fields-via-php/
     */
    acf_add_local_field_group([
      'key' => wp_unique_id('test_group'),
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_1',
          'label' => 'Date field',
          'name' => $date_field_name,
          'type' => 'date_picker',

          // Different from raw value "Ymd"
          'return_format' => 'd/m/Y',
        ],
        [
          'key' => 'field_2',
          'label' => 'Date time field',
          'name' => $date_time_field_name,
          'type' => 'date_time_picker',

          // Different from raw value "Y-m-d H:i:s"
          'return_format' => 'd/m/Y g:i a',
        ],
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

    $value = '2020-01-31 12:34:56';
    update_post_meta($post_id, $date_time_field_name, $value );

    $result = get_post_meta( $post_id, $date_time_field_name, true );
    $this->assertEquals( $value, $result );

    // Default format is from ACF field setting
    $expected = '31/01/2020 12:34 pm';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name debug=true /></Loop>");
    
    $this->assertEquals( $expected, $result );

    // Format F j, Y @ g:i a

    $word_format = 'F j, Y @ g:i a';

    $expected = 'January 31, 2020 @ 12:34 pm';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name format=\"$word_format\" /></Loop>");

    $this->assertEquals( $expected, $result );

    // Different global locale

    global $locale;

    $locale = 'fr_FR';
    $result = get_locale();
    $this->assertEquals( $locale, $result );
    
    $expected = 'janvier 31, 2020 @ 12:34 pm';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name format=\"$word_format\" /></Loop>");

    $this->assertEquals( $expected, $result );

    // Field attribute "locale" has precedence

    $expected = 'January 31, 2020 @ 12:34 pm';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name locale=en format=\"$word_format\" /></Loop>");

    $this->assertEquals( $expected, $result );

    // Field attribute "format" has precedence

    $expected = '2020-01-31';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name format=\"Y-m-d\" /></Loop>");

    $this->assertEquals( $expected, $result );

    $expected = 'vendredi 31 janvier 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name format=\"l j F Y\" /></Loop>");

    $this->assertEquals( $expected, $result );

    // Restore global locale
    $locale = 'en_US';
    $result = get_locale();
    $this->assertEquals( $locale, $result );

  }

  /**
   * Time field - Saved as H:i:s
   */
  function test_date_fields__Time() {

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
