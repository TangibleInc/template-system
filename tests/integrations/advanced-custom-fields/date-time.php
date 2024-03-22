<?php
namespace Tests\Integrations;
use tangible\template_system;

class ACF_Date_Time_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  /**
   * Date-time field - Saved as Y-m-d H:i:s
   */

  function test_date_time_field() {

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


    // Conditions

    $result = $html->render(<<<HTML
    <Date format=timestamp>1990-01-01</Date>
    HTML);

    $this->assertEquals( '631152000', trim($result) );

    $result = $html->render(<<<HTML
    <Loop type=post id=$post_id><Field acf_date_time=$date_time_field_name format=timestamp /></Loop>
    HTML);

    $this->assertEquals( '1580474096', trim($result) );

    $result = $html->render(<<<HTML
    <Set yesterday>
      <Date format=timestamp>1990-01-01</Date>
    </Set>
    <Loop type=post id=$post_id>
      <If check="{Field acf_date_time=$date_time_field_name format=timestamp}" more_than value="{Get yesterday}">TRUE<Else />FALSE</If>
    </Loop>
    HTML);

    $this->assertEquals( 'TRUE', trim($result) );

    $result = $html->render(<<<HTML
    <Loop type=post id=$post_id>
      <If check="{Get yesterday}" less_than value="{Field acf_date_time=$date_time_field_name format=timestamp}">TRUE<Else />FALSE</If>
    </Loop>
    HTML);

    $this->assertEquals( 'TRUE', trim($result) );

  }

}
