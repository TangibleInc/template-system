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

  function test_list_count() {

    $html = tangible_template();

    $html->render(<<<'HTML'
    <List numbers>
      <Item>1</Item>
      <Item>2</Item>
      <Item>3</Item>
      <Item>4</Item>
      <Item>5</Item>
    </List>
    HTML);

    // All items

    $result = $html->render(<<<'HTML'
    <Loop list=numbers><Field /></Loop>
    HTML);

    $this->assertEquals('12345', $result);

    // Count

    $result = $html->render(<<<'HTML'
    <Loop list=numbers count=3><Field /></Loop>
    HTML);

    $this->assertEquals('123', $result);

    // Count and offset

    $result = $html->render(<<<'HTML'
    <Loop list=numbers count=3 offset=1><Field /></Loop>
    HTML);

    $this->assertEquals('234', $result);
  }
}
