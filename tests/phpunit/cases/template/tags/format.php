<?php
class Template_Tags_Format_TestCase extends WP_UnitTestCase {
    /**
     * @dataProvider _test_template_tags_format_case_data
     */
  public function test_template_tags_format_case( $case, $expected ) {
      $template = "<Format case=$case>Hello, world</Format>";
      $this->assertEquals( $expected, tangible_template( $template ) );
  }

  public function _test_template_tags_format_case_data() {
      return [
          'kebab'   => [ 'kebab', 'hello-world' ],
          'snake'   => [ 'snake', 'hello_world' ],
          'pascal'  => [ 'pascal', 'HelloWorld' ],
          'camel'   => [ 'camel', 'helloWorld' ],
          'lower'   => [ 'lower', 'hello, world' ],
          'upper'   => [ 'upper', 'HELLO, WORLD' ],
          'unknown' => [ 'unknown', 'Hello, world' ],
      ];
  }

    /**
     * @dataProvider _test_template_tags_format_case_spaces_data
     */
  public function test_template_tags_format_case_spaces( $case, $expected ) {
        $template = "<Format case=$case>Hello,     world</Format>";
        $this->assertEquals( $expected, tangible_template( $template ) );
  }

  public function _test_template_tags_format_case_spaces_data() {
        return [
            'kebab'  => [ 'kebab', 'hello-world' ],
            'snake'  => [ 'snake', 'hello_world' ],
            'pascal' => [ 'pascal', 'HelloWorld' ],
            'camel'  => [ 'camel', 'helloWorld' ],
        ];
  }

    // public function test_template_tags_format_case_utf8() {
    // $template = '<Format case=upper>привет, мир!</Format>';
    // $this->assertEquals('ПРИВЕТ, МИР!', tangible_template($template));
    // }

    /**
     * @dataProvider _test_template_tags_format_length_data
     */
  public function test_template_tags_format_length( $length, $content, $expected ) {
      $template = "<Format length=$length>$content</Format>";
      $this->assertEquals( $expected, tangible_template( $template ) );

      $template = "<Format length characters=$length>$content</Format>";
      $this->assertEquals( $expected, tangible_template( $template ) );
  }

  public function _test_template_tags_format_length_data() {
      return [
          'five'                    => [
              5,
              'Hornswaggle bowsprit six pounders sutler lateen sail parrel boatswain coxswain tackle warp. Line squiffy lass mizzenmast yard fathom clipper bucko barque cog. Jack starboard parley marooned bilge water hearties chandler heave to hands sloop.',
              'Horns',
          ],
          'minus-one-hundred-fifty' => [
              -150,
              'Hornswaggle bowsprit six pounders sutler lateen sail parrel boatswain coxswain tackle warp. Line squiffy lass mizzenmast yard fathom clipper bucko barque cog. Jack starboard parley marooned bilge water hearties chandler heave to hands sloop.',
              'Hornswaggle bowsprit six pounders sutler lateen sail parrel boatswain coxswain tackle warp.',
          ],
          'utf8'                    => [
              6,
              'Привет, мир!',
              'Привет',
          ],
      ];
  }

  public function test_template_tags_format_code() {
      $template = '<Format code>this & that</Format>';
      $this->assertEquals( 'this &amp; that', tangible_template( $template ) );
  }

  public function test_template_tags_format_slug() {
      $template = '<Format slug>Hello, World!</Format>';
      $this->assertEquals( 'hello-world', tangible_template( $template ) );

      // UTF-8
      $template = '<Format slug>Привет, мир!</Format>';
      $this->assertEquals( '%d0%bf%d1%80%d0%b8%d0%b2%d0%b5%d1%82-%d0%bc%d0%b8%d1%80', tangible_template( $template ) );
  }


  public function test_template_tags_format_cases() {
      $template = '<Format uppercase>Hello, World!</Format>';
      $this->assertEquals( 'HELLO, WORLD!', tangible_template( $template ) );

      $template = '<Format lowercase>Hello, World!</Format>';
      $this->assertEquals( 'hello, world!', tangible_template( $template ) );

      $template = '<Format capital>hello, world!</Format>';
      $this->assertEquals( 'Hello, world!', tangible_template( $template ) );

      $template = '<Format capital_words>hello, world!</Format>';
      $this->assertEquals( 'Hello, World!', tangible_template( $template ) );

      // UTF-8
      // $template = '<Format uppercase>Привет, Мир!</Format>';
      // $this->assertEquals('ПРИВЕТ, МИР!', tangible_template($template));

      // $template = '<Format lowercase>Привет, Мир!</Format>';
      // $this->assertEquals('привет, мир!', tangible_template($template));

      // $template = '<Format capital>привет, мир!</Format>';
      // $this->assertEquals('Привет, мир!', tangible_template($template));

      // $template = '<Format capital_words>привет, мир!</Format>';
      // $this->assertEquals('Привет, Мир!', tangible_template($template));
  }

  public function test_template_tags_format_urlencode() {
      $template = '<Format url_query>?a=привет</Format>';
      $this->assertEquals( '%3Fa%3D%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82', tangible_template( $template ) );
  }

  public function test_template_tags_format_replace() {
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
  }

  public function test_template_tags_format_number() {
      $template = '<Format number>1987.2407</Format>';
      $this->assertEquals( '1987.24', tangible_template( $template ) );

      $template = '<Format number decimals="5">1987.2407</Format>';
      $this->assertEquals( '1987.24070', tangible_template( $template ) );

      $template = '<Format number decimals=0 thousands=,>1987.2407</Format>';
      $this->assertEquals( '1,987', tangible_template( $template ) );
  }

  public function test_template_tags_format_html() {
      $template = '<Format html_attribute>"\'</Format>';
      $this->assertEquals( '&quot;&#039;', tangible_template( $template ) );

      $template = '<Format html_entities>&</Format>';
      $this->assertEquals( '&amp;', tangible_template( $template ) );
  }

    // @todo: date, embed
}
