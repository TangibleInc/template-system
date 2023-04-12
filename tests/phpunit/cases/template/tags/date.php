<?php
class Template_Tags_Date_TestCase extends WP_UnitTestCase {
    /**
     * @dataProvider _test_template_tags_date_data
     */
  public function test_template_tags_date( $input, $expected, $locale, $format ) {
      $_locale     = tangible_date()->getLocale();
      $date_format = get_option( 'date_format' );

      tangible_date()->setTestNow( tangible_date()->create( -14159025 ) );
      update_option( 'date_format', $format );
      tangible_date()->setLocale( $locale );

      $this->assertEquals( $expected, tangible_template( $input ) );

      // Reset.
      tangible_date()->setTestNow();
      tangible_date()->setLocale( $_locale );
      update_option( 'date_format', $date_format );
  }

  public function _test_template_tags_date_data() {
      return [
          'default'      => [ '<Date />', 'July 21, 1969', 'en', 'F j, Y' ],
          'now'          => [ '<Date>now</Date>', 'July 21, 1969', 'en', 'F j, Y' ],
          'today'        => [ '<Date>today</Date>', '1969-07-21T00:00:00+00:00', 'ru', 'c' ],
          'yesterday'    => [ '<Date>today</Date>', 'Juli 21, 1969, 12:00 am', 'de', 'F j, Y, g:i a' ],
          'timestamp'    => [ '<Date timestamp>now</Date>', '-14159025', 'de', 'F j, Y, g:i a' ],
          'start_of_day' => [ '<Date>start_of_day</Date>', '-14169600', 'de', 'U' ],
          'end_of_day'   => [ '<Date>end_of_day</Date>', 'Juli 21, 1969, 11:59 pm', 'de', 'F j, Y, g:i a' ],
          'format'       => [ '<Date format="Y-m-d H:i:s">+16 hours</Date>', '1969-07-21 18:56:15', 'de', 'F j, Y, g:i a' ],
          'all_locale'   => [ '<Date all_locale />', 'de', 'de', 'U' ],
      ];
  }

  public function test_template_tags_date_all_locale() {
      $_locale = tangible_date()->getLocale();
      tangible_date()->setLocale( 'en' );
      tangible_date()->setTestNow( tangible_date()->create( -14159025 ) );

      $this->assertEquals( 'en', tangible_template( '<Date all_locale />' ) );
      $this->assertEmpty( tangible_template( '<Date all_locale="de">now</Date>' ) );
      $this->assertEquals( 'de', tangible_template( '<Date all_locale />' ) );
      $this->assertEquals( 'Juli 21, 1969', tangible_template( '<Date />' ) );

      tangible_date()->setTestNow();
      tangible_date()->setLocale( $_locale );
  }
}
