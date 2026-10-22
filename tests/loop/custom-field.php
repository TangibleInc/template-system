<?php
namespace Tests\Template\Loop;

/**
 * Post loop: query by custom field
 *
 * @see https://github.com/TangibleInc/template-system/issues/169
 * @see https://github.com/TangibleInc/template-system/issues/170
 */
class CustomField_TestCase extends \WP_UnitTestCase {

  public function test_custom_field_compare_in_and_type_number() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    // Four posts: a choice value and a number each
    foreach ([ 'one' => 5, 'two' => 10, 'three' => 25, 'four' => 100 ] as $title => $number) {
      $id = self::factory()->post->create([
        'post_type'   => 'post',
        'post_status' => 'publish', // Important for Loop tag
        'post_title'  => $title,
      ]);
      update_post_meta( $id, 'test_choice', 'option_' . $title );
      update_post_meta( $id, 'test_number', $number );
    }

    $item = '<Field title />,';

    // #169: "in" with a comma-separated list - right posts, no PHP warning

    $result = $html->render("<Loop type=post custom_field=test_choice custom_field_value=option_one,option_three custom_field_compare=in orderby=title order=asc>$item</Loop>");

    $this->assertNull( $error );
    $this->assertEquals( 'one,three,', $result );

    // #170: custom_field_type=number compares as a number, not a string
    // (as strings, "5" > "20" and "100" < "20")

    $result = $html->render("<Loop type=post custom_field=test_number custom_field_value=20 custom_field_compare=after custom_field_type=number orderby=title order=asc>$item</Loop>");

    $this->assertEquals( 'four,three,', $result );

    $result = $html->render("<Loop type=post custom_field=test_number custom_field_value=20 custom_field_compare=before custom_field_type=number orderby=title order=asc>$item</Loop>");

    $this->assertEquals( 'one,two,', $result );

    // Both: "between" with a list and a numeric type

    $result = $html->render("<Loop type=post custom_field=test_number custom_field_value=8,30 custom_field_compare=between custom_field_type=number orderby=title order=asc>$item</Loop>");

    $this->assertNull( $error );
    $this->assertEquals( 'three,two,', $result );
  }
}
