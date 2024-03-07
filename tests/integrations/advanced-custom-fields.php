<?php
namespace Tests\Integrations;
use tangible\template_system;

/**
 * - [Register ACF fields](https://www.advancedcustomfields.com/resources/register-fields-via-php/)
 */

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

  /**
   * Date field
   * @see https://www.advancedcustomfields.com/resources/date-picker/#database-format
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

    acf_add_local_field_group([
      'key' => 'group_1',
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_1',
          'label' => 'Date field',
          'name' => $date_field_name,
          'type' => 'date_picker',
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

    $value = '20200101'; // Ymd
    update_post_meta($post_id, $date_field_name, $value );

    $result = get_post_meta( $post_id, $date_field_name, true );
    $this->assertTrue( $result === $value, print_r([$value, $result], true) );

    // Set locale
    global $locale;

    $locale = 'en_US';
    $result = get_locale();
    $this->assertTrue( $result === $locale, print_r([$locale, $result], true) );

    update_option( 'date_format', 'F j, Y' );

    $expected = 'January 1, 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Different global locale

    $locale = 'fr_FR';
    $result = get_locale();
    $this->assertTrue( $result === $locale, print_r([$locale, $result], true) );
    
    $expected = 'janvier 1, 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Field attribute "locale" has precedence

    $expected = 'January 1, 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name locale=en /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Field attribute "format" has precedence

    $expected = '2020-01-01';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name format=\"Y-m-d\" /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    $expected = 'mercredi 1 janvier 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date=$date_field_name format=\"l j F Y\" /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Restore global locale
    $locale = 'en_US';
    $result = get_locale();
    $this->assertTrue( $result === $locale, print_r([$locale, $result], true) );

  }


  /**
   * Date-time field - Saved as Y-m-d H:i:s
   * @see https://www.advancedcustomfields.com/resources/date-time-picker/#database-format
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
      'key' => 'group_1',
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_1',
          'label' => 'Date field',
          'name' => $date_field_name,
          'type' => 'date_picker',
        ],
        [
          'key' => 'field_2',
          'label' => 'Date time field',
          'name' => $date_time_field_name,
          'type' => 'date_time_picker',
        ],
        [
          'key' => 'field_3',
          'label' => 'Time field',
          'name' => $time_field_name,
          'type' => 'time_picker',
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

    $value = '2020-01-01 00:00:00';
    update_post_meta($post_id, $date_time_field_name, $value );
    
    $result = get_post_meta( $post_id, $date_time_field_name, true );
    $this->assertTrue( $result === $value, print_r([$value, $result], true) );

    // Default format is same as ACF, unlike Date field which gets it from site settings 
    $expected = '2020-01-01 00:00:00';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Format F j, Y @ g:i a

    $word_format = 'F j, Y @ g:i a';

    $expected = 'January 1, 2020 @ 12:00 am';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name format=\"$word_format\" /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Different global locale

    global $locale;

    $locale = 'fr_FR';
    $result = get_locale();
    $this->assertTrue( $result === $locale, print_r([$locale, $result], true) );
    
    $expected = 'janvier 1, 2020 @ 12:00 am';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name format=\"$word_format\" /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Field attribute "locale" has precedence

    $expected = 'January 1, 2020 @ 12:00 am';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name locale=en format=\"$word_format\" /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Field attribute "format" has precedence

    $expected = '2020-01-01';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name format=\"Y-m-d\" /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    $expected = 'mercredi 1 janvier 2020';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name format=\"l j F Y\" /></Loop>");

    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    // Restore global locale
    $locale = 'en_US';
    $result = get_locale();
    $this->assertTrue( $result === $locale, print_r([$locale, $result], true) );

  }

  /**
   * Time field - Saved as H:i:s
   * @see https://www.advancedcustomfields.com/resources/time-picker/#database-format
   */
  function test_date_fields__Time() {

    if (!$this->is_dependency_active()) {
      $this->assertTrue(true);
      return;
    }

    $html = tangible_template();

    $time_field_name = 'time_field';

    acf_add_local_field_group([
      'key' => 'group_3',
      'title' => 'My Group',
      'fields' => [
        [
          'key' => 'field_3',
          'label' => 'Time field',
          'name' => $time_field_name,
          'type' => 'time_picker',
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

    $value = '00:00:00';
    update_post_meta($post_id, $time_field_name, $value );
    
    $result = get_post_meta( $post_id, $time_field_name, true );
    $this->assertTrue( $result === $value, print_r([$value, $result], true) );

    $expected = '00:00';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_time=$time_field_name format=\"H:i\" /></Loop>");
    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

    $expected = '12:00 am';
    $result = $html->render("<Loop type=post id=$post_id><Field acf_time=$time_field_name format=\"g:i a\" /></Loop>");
    $this->assertTrue( $result === $expected, print_r([$expected, $result], true) );

  }

}
