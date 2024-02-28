<?php
namespace Tests\Language;

class Map_TestCase extends \WP_UnitTestCase {
  function test_map_tag() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['Map']) );

    $result = $html->render('<Map />');

    $this->assertNull( $error );
    $this->assertEquals( true, !empty($result) );
  }

  function test_map_loop() {

    $loop = tangible_loop();

    $map = [
      'a' => 1,
      'b' => 2,
      'c' => 3,
    ];

    $map_loop = $loop->create_type('map', $map);

    $this->assertEquals($map, $map_loop->items[0]);

    $html = tangible_template();

    $html->render(<<<'HTML'
    <Map name=animals>
      <Key apple>🍎</Key>
      <Key ball>⚽</Key>
      <Key cat>🐈</Key>
      <Key dog>🐶</Key>
    </Map>
    HTML);

    $result = $html->render(<<<'HTML'
    <Loop map=animals><Field apple /><Field ball /><Field cat /><Field dog /></Loop>
    HTML);

    $this->assertEquals('🍎⚽🐈🐶', $result);
  }

  function test_map_key_order() {

    $html = tangible_template();

    $template = <<<'HTML'
    <Map name=animals>
      <Key cat>🐈</Key>
      <Key dog>🐶</Key>
      <Key ball>⚽</Key>
      <Key apple>🍎</Key>
    </Map>
    <Loop map_keys=animals>
    - <Field key />: <Field value />
    </Loop>
    HTML;

    $expected = <<<'HTML'
    - cat: 🐈
    - dog: 🐶
    - ball: ⚽
    - apple: 🍎
    HTML;

    $this->assertEquals(
      trim($expected),
      trim($html->render($template))
    );

    // Sort by field

    $template = <<<'HTML'
    <Loop map_keys=animals sort_field=key>
    - <Field key />: <Field value />
    </Loop>
    HTML;

    $expected = <<<'HTML'
    - apple: 🍎
    - ball: ⚽
    - cat: 🐈
    - dog: 🐶
    HTML;

    $this->assertEquals(
      $expected,
      trim($html->render($template))
    );
  }

}
