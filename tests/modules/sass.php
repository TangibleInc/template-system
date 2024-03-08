<?php
namespace Tests\Modules;

class Sass_TestCase extends \WP_UnitTestCase {
  public function test_sass_works() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertTrue( isset($html->sass) && is_callable($html->sass) );

    /**
     * Dynamic color property from variable
     */

    $result = $html->sass(<<<'SCSS'
    $test: 0.4;
    a.latest-post__link:hover {
      box-shadow: 0 4px 8px rgba(var(--clr-text), $test);
    }
    SCSS);
    $expected = 'a.latest-post__link:hover{box-shadow:0 4px 8px rgba(var(--clr-text), 0.4)}';

    $this->assertNull( $error );
    $this->assertEquals( $expected, $result );

    $error = null;

    /**
     * Known issue: The handling of / is not spec compliant
     * @see https://github.com/scssphp/scssphp/issues/146
     * 
     * For CSS properties that use a slash for any purpose other than division,
     * SCSS-PHP doesn't yet support the syntax and replaces with divided value.
     */

    $result = $html->sass(<<<'SCSS'
    $test: 1;
    a {
      grid-area: $test / $test / 2 / 2;
    }
    SCSS);
    $expected = 'a{grid-area:1/1/2/2}';

    // Wrong: 0.5
    // $this->assertEquals( $expected, $result );

    $result = $html->sass(<<<'SCSS'
    @media (min-aspect-ratio: 5/8) {
      a { color: green }
    }
    SCSS);
    $expected = '@media (min-aspect-ratio:5/8){a{color:green}}';

    // Wrong: 0.625
    // $this->assertEquals( $expected, $result );

    // Workaround is to use unquote('..')

    $result = $html->sass(<<<'SCSS'
    a {
      grid-area: unquote('1 / 1 / 2 / 2');
    }
    SCSS);
    $expected = 'a{grid-area:1 / 1 / 2 / 2}';

    $this->assertEquals( $expected, $result );

    $result = $html->sass(<<<'SCSS'
    @media (min-aspect-ratio: unquote('5/8')) {
      a { color: green }
    }
    SCSS);
    $expected = '@media (min-aspect-ratio:5/8){a{color:green}}';

    $this->assertEquals( $expected, $result );

  }
}
