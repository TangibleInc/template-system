<?php
namespace Tests\Language;

class List_TestCase extends \WP_UnitTestCase {
  public function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['List']) );

    $result = $html->render('<List />');

    $this->assertNull( $error );
    $this->assertEquals( true, !empty($result) );
  }

  public function test_list_items() {

    $loop = tangible_loop();
    $html = tangible_template();

    $items = [1, 2, 3];

    $list_loop = $loop->create_type('list', $items);

    $this->assertEquals(
      $items,
      $list_loop->total_items
    );

    $result = $html->render(<<<'HTML'
    <List>
      <Item>3</Item>
      <Item>2</Item>
      <Item>1</Item>
    </List>
    HTML);

    $this->assertEquals(
      '["3","2","1"]',
      $result
    );

    // Sort by field

    $result = $html->render(<<<'HTML'
    <List sort_field=value>
      <Item>3</Item>
      <Item>2</Item>
      <Item>1</Item>
    </List>
    HTML);

    $this->assertEquals(
      '["1","2","3"]',
      $result
    );
  }
}
