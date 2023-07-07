<?php
namespace Tests\Template\Tags;

class Format_TestCase extends \WP_UnitTestCase {
  function test_format_case() {
    foreach ([
      [ 'kebab', 'hello-world' ],
      [ 'snake', 'hello_world' ],
      [ 'pascal', 'HelloWorld' ],
      [ 'camel', 'helloWorld' ],
      [ 'lower', 'hello, world' ],
      [ 'upper', 'HELLO, WORLD' ],
      [ 'unknown', 'Hello, world' ],
    ] as [$case, $expected]) {
      $template = "<Format case=$case>Hello, world</Format>";
      $this->assertEquals( $expected, tangible_template( $template ) );
    }
  }

  function test_format_case_spaces() {
    foreach ([
      [ 'kebab', 'hello-world' ],
      [ 'snake', 'hello_world' ],
      [ 'pascal', 'HelloWorld' ],
      [ 'camel', 'helloWorld' ],
    ] as [$case, $expected]) {
      $template = "<Format case=$case>Hello,     world</Format>";
      $this->assertEquals( $expected, tangible_template( $template ) );
    }
  }
    // function test_format_case_utf8() {
    // $template = '<Format case=upper>привет, мир!</Format>';
    // $this->assertEquals('ПРИВЕТ, МИР!', tangible_template($template));
    // }

  function test_format_length() {

    $text = 'Hornswaggle bowsprit six pounders sutler lateen sail parrel boatswain coxswain tackle warp. Line squiffy lass mizzenmast yard fathom clipper bucko barque cog. Jack starboard parley marooned bilge water hearties chandler heave to hands sloop.';

    foreach ([
      [
        5,
        $text,
        'Horns',
      ],
      [
        -150,
        $text,
        substr($text, 0, -150),
      ],
      [
        6,
        'Привет, мир!',
        'Привет',
      ],
    ] as [$length, $content, $expected]) {

      $template = "<Format length=$length>$content</Format>";
      $this->assertEquals( $expected, tangible_template( $template ) );

      $template = "<Format length characters=$length>$content</Format>";
      $this->assertEquals( $expected, tangible_template( $template ) );
    }
  }

  function test_format_words() {

    $text = 'Hornswaggle bowsprit six pounders sutler lateen sail parrel boatswain coxswain tackle warp. Line squiffy lass mizzenmast yard fathom clipper bucko barque cog. Jack starboard parley marooned bilge water hearties chandler heave to hands sloop.';

    foreach ([
      1, 5, 50
    ] as $words) {
      $template = "<Format words=$words>$content</Format>";
      $this->assertEquals(
        wp_trim_words($content, $words, ''),
        tangible_template( $template ),
        $template
      );
    }
  }

  function test_format_reverse() {
    $content = 'Hornswaggle';
    
    $template = "<Format reverse>$content</Format>";
    $this->assertEquals( strrev($content), tangible_template( $template ) );
  }

  function test_format_code() {
      $template = '<Format code>this & that</Format>';
      $this->assertEquals( 'this &amp; that', tangible_template( $template ) );
  }

  function test_format_slug() {
      $template = '<Format slug>Hello, World!</Format>';
      $this->assertEquals( 'hello-world', tangible_template( $template ) );

      // UTF-8
      $template = '<Format slug>Привет, мир!</Format>';
      $this->assertEquals( '%d0%bf%d1%80%d0%b8%d0%b2%d0%b5%d1%82-%d0%bc%d0%b8%d1%80', tangible_template( $template ) );
  }


  function test_format_cases() {
      $template = '<Format uppercase>Hello, World!</Format>';
      $this->assertEquals( 'HELLO, WORLD!', tangible_template( $template ) );

      $template = '<Format lowercase>Hello, World!</Format>';
      $this->assertEquals( 'hello, world!', tangible_template( $template ) );

      $template = '<Format capital>hello, world!</Format>';
      $this->assertEquals( 'Hello, world!', tangible_template( $template ) );

      $template = '<Format capital_words>hello, world!</Format>';
      $this->assertEquals( 'Hello, World!', tangible_template( $template ) );
  }

  function test_format_cases_multibyte() {
    $template = '<Format uppercase>Привет, Мир!</Format>';
    $this->assertEquals('ПРИВЕТ, МИР!', tangible_template($template));

    $template = '<Format lowercase>Привет, Мир!</Format>';
    $this->assertEquals('привет, мир!', tangible_template($template));

    $template = '<Format capital>привет, мир!</Format>';
    $this->assertEquals('Привет, мир!', tangible_template($template));

    $template = '<Format capital_words>привет, мир!</Format>';
    $this->assertEquals('Привет, Мир!', tangible_template($template));
  }


  function test_format_urlencode() {
      $template = '<Format url_query>?a=привет</Format>';
      $this->assertEquals( '%3Fa%3D%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82', tangible_template( $template ) );
  }

  function test_format_replace() {
      $template = '<Format replace="lo worl" with="">hello world</Format>';
      $this->assertEquals( 'held', tangible_template( $template ) );

      $template = '<Format replace="_" with="_" replace_2="lo worl" with_2="">hello world</Format>';
      $this->assertEquals( 'held', tangible_template( $template ) );

      $template = '<Format replace="_" with="_" replace_2="_" with_2="_" replace_3="lo worl" with_3="">hello world</Format>';
      $this->assertEquals( 'held', tangible_template( $template ) );

      srand( 0 );
      $template = '<Format replace="world" with="{Random /}">Hello world</Format>';
      $this->assertEquals( 'Hello 99', tangible_template( $template ) );

      $template = '<Format replace="world" with="{{Random /}}">Hello world</Format>';
      $this->assertEquals( 'Hello {Random /}', tangible_template( $template ) );

      $link = '<a>Test</a>';

      $template = '<Format replace="world" with="{a}Test{/a}">Hello world</Format>';
      $this->assertEquals( 'Hello '.$link, tangible_template( $template ) );

      $template = '<Set _><Raw>'.$link.'</Raw></Set><Format replace="world" with="{Get _}">Hello world</Format>';
      $this->assertEquals( 'Hello '.$link, tangible_template( $template ) );
    }

  function test_format_number() {
      $template = '<Format number>1987.2407</Format>';
      $this->assertEquals( '1987.24', tangible_template( $template ) );

      $template = '<Format number decimals="5">1987.2407</Format>';
      $this->assertEquals( '1987.24070', tangible_template( $template ) );

      $template = '<Format number decimals=0 thousands=,>1987.2407</Format>';
      $this->assertEquals( '1,987', tangible_template( $template ) );
  }

  function test_format_slash() {
    $this->assertEquals( '/test', tangible_template(
      '<Format start_slash>test</Format>'
    ) );

    $this->assertEquals( '/test', tangible_template(
      '<Format start_slash>//test</Format>'
    ) );

    $this->assertEquals( 'test/', tangible_template(
      '<Format end_slash>test</Format>'
    ) );

    $this->assertEquals( 'test/', tangible_template(
      '<Format end_slash>test//</Format>'
    ) );

    $this->assertEquals( '/test/', tangible_template(
      '<Format start_slash end_slash>test</Format>'
    ) );

    $this->assertEquals( '/test', tangible_template(
      '<Format start_slash end_slash=false>test//</Format>'
    ) );

    $this->assertEquals( 'test/', tangible_template(
      '<Format end_slash start_slash=false>//test</Format>'
    ) );
  }


}
