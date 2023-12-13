<?php
namespace Tests\Template\Tags;

use tangible\date;

class Date_Tag extends \WP_UnitTestCase {
  function test_date() {

    $tdate = \tangible\date();

    $this->assertEquals( true, is_object($tdate), 'is object' );
    
    $tdate->setLocale('fr');
    
    $date = $tdate('3 days ago');

    $expected = 'il y a 3 jours';
    $this->assertEquals( $expected, $date->ago(), $expected );

    $date = $tdate('2020-04-07');

    $expected = 'mardi 7 avril 2020';
    $this->assertEquals( $expected, $date->format('l j F Y'), $expected );

    // Create from date and time

    $some_day = '2000-01-31';
    $date = $tdate( $some_day );

    $expected = $some_day;
    $this->assertEquals( $expected, $date->format('Y-m-d'), $expected );

    $date = $tdate->create(2000, 1, 31);

    $this->assertEquals( $expected, $date->format('Y-m-d'), $expected );

    $date = $tdate->create(2000, 1, 31, 12, 0, 0);

    $this->assertEquals( $expected, $date->format('Y-m-d'), $expected );

    // Add/subtract
    
    $yesterday = $date->sub('1 day');

    $this->assertEquals( '2000-01-30', $date->format('Y-m-d'), $expected );

    $tomorrow  = $date->add('1 day');

    $this->assertEquals( $expected, $date->format('Y-m-d'), $expected );

    $tomorrow  = $date->add('1 day');

    $this->assertEquals( '2000-02-01', $date->format('Y-m-d'), $expected );

    // Duration

    $date = $tdate->create(2000, 1, 31, 12, 0, 0);
    
    $duration = $tdate->now()->diffInDays(
      $tdate('+1000 days')
    );

    $this->assertEquals( '1000', $duration, $expected );


    // Various date expressions

    foreach ([
      'default'      => [ '<Date />', 'July 21, 1969', 'en', 'F j, Y' ],
      'now'          => [ '<Date>now</Date>', 'July 21, 1969', 'en', 'F j, Y' ],
      'today'        => [ '<Date>today</Date>', '1969-07-21T00:00:00+00:00', 'ru', 'c' ],
      'yesterday'    => [ '<Date>today</Date>', 'Juli 21, 1969, 12:00 am', 'de', 'F j, Y, g:i a' ],
      'timestamp'    => [ '<Date timestamp>now</Date>', '-14159025', 'de', 'F j, Y, g:i a' ],
      'start_of_day' => [ '<Date>start_of_day</Date>', '-14169600', 'de', 'U' ],
      'end_of_day'   => [ '<Date>end_of_day</Date>', 'Juli 21, 1969, 11:59 pm', 'de', 'F j, Y, g:i a' ],
      'format'       => [ '<Date format="Y-m-d H:i:s">+16 hours</Date>', '1969-07-21 18:56:15', 'de', 'F j, Y, g:i a' ],
      'all_locale'   => [ '<Date all_locale />', 'de', 'de', 'U' ],
    ] as $key => [
      $input, $expected, $locale, $format
    ]) {
      $_locale     = $tdate->getLocale();
      $date_format = get_option( 'date_format' );

      $tdate->setTestNow( $tdate->create( -14159025 ) );
      update_option( 'date_format', $format );
      $tdate->setLocale( $locale );

      $this->assertEquals( $expected, tangible_template( $input ), $input );

      // Reset.
      $tdate->setTestNow();
      $tdate->setLocale( $_locale );
      update_option( 'date_format', $date_format );
    }
  }

  function test_date_all_locale() {

    $tdate = \tangible\date();

    $_locale = $tdate->getLocale();
    $tdate->setLocale( 'en' );
    $tdate->setTestNow( $tdate->create( -14159025 ) );

    $this->assertEquals( 'en', tangible_template( '<Date all_locale />' ) );
    $this->assertEmpty( tangible_template( '<Date all_locale="de">now</Date>' ) );
    $this->assertEquals( 'de', tangible_template( '<Date all_locale />' ) );
    $this->assertEquals( 'Juli 21, 1969', tangible_template( '<Date />' ) );

    $tdate->setTestNow();
    $tdate->setLocale( $_locale );
  }
}
