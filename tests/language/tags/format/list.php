<?php
namespace Tests\Template\Tags;

class Format_List_TestCase extends \WP_UnitTestCase {

  function set_up() {
    parent::set_up();
    // Convert warnings into errors
    set_error_handler(function ($severity, $message, $file, $line) {
      throw new \ErrorException($message, $severity, $severity, $file, $line);
    });    
  }

  function tear_down() {
    parent::tear_down();
    restore_error_handler();
  }

  /**
   * Length
   */
  function test_format_list_length() {

    $value = [1, 2, 3, 4, 5];
    $content = json_encode($value);

    // Length
    $template = "<Format list length=2>{$content}</Format>";
    $expected = json_encode( array_slice($value, 0, 2) );

    $result = tangible_template( $template );

    $this->assertEquals( $expected, $result, $template );

    // Negative length
    $template = "<Format list length=-2>{$content}</Format>";
    $expected = json_encode( array_slice($value, 0, -2) );

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Matching string functions

    // Length
    $template = '<Format length=2>あいうえお</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'あい', $result, $template );

    // Negative length
    $template = '<Format length=-2>あいうえお</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'あいう', $result, $template );
  }

  function test_format_list_offset() {

    $value = [1, 2, 3, 4, 5];
    $content = json_encode($value);

    // Offset
    $template = "<Format list offset=3>{$content}</Format>";
    $expected = json_encode( array_slice($value, 3) );

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Negative offset
    $template = "<Format list offset=-3>{$content}</Format>";
    $expected = json_encode( array_slice($value, -3) );

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Negative offset with length
    $template = "<Format list offset=-3 length=2>{$content}</Format>";
    $expected = json_encode( array_slice($value, -3, 2) );

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );


    // Matching string functions

    // Offset
    $template = '<Format offset=3>あいうえお</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'えお', $result, $template );

    $template = '<Format offset=2>ABCDEF</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'CDEF', $result, $template );

    // Negative offset

    $template = '<Format offset=-2>ABCDEF</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'EF', $result, $template );

    $template = '<Format offset=-3>あいうえお</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'うえお', $result, $template );

    // Negative offset with length
    $template = '<Format offset=-3 length=2>あいうえお</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'うえ', $result, $template );
  }

  function test_format_list_index() {

    $value = [1, 2, 3, 4, 5];
    $content = json_encode($value);

    
    $error = null;

    error_reporting(E_STRICT);
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });


    // Index starts from 0
    $template = "<Format list index=1>{$content}</Format>";
    $expected = json_encode( $value[1] );

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );


    // Ensure no warning
    $this->assertNull( $error );


    $template = '<Format list index=1>[1,2,3]</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( '2', $result, $template );

    // Negative index
    $template = "<Format list index=\"-2\">{$content}</Format>";
    $expected = json_encode( array_slice($value, -2, 1)[0] );

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $template = '<Format list index=-1>[1,2,3]</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( '3', $result, $template );

    // Matching string functions

    // Index starts from 0

    $template = '<Format index=1>ABC</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'B', $result, $template );

    $template = '<Format index=1>Привет</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'р', $result, $template );

    $template = '<Format index=1>あいうえお</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'い', $result, $template );

    // Negative index

    $template = '<Format index=-1>ABC</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'C', $result, $template );

    $template = '<Format index=-1>Привет</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'т', $result, $template );

    $template = '<Format index=-1>あいうえお</Format>';
    $result = tangible_template( $template );
    $this->assertEquals( 'お', $result, $template );
  }

  function test_format_list_trim() {
    $template = "<Format trim=\" \t\n\"> \t\nあ \t\n</Format>";
    $result = tangible_template( $template );
    $this->assertEquals( 'あ', $result, $template );
  }

  function test_format_list_split() {
    $source = 'あ・い・う・え・お';
    // UTF8 string must be quoted
    $template = "<Format split=\"・\">{$source}</Format>";
    $result = tangible_template( $template );
    $expected = ['あ', 'い', 'う', 'え', 'お'];
    $this->assertEquals( json_encode($expected), $result, $template );
  }

  function test_format_list_join() {
    $source = json_encode(['あ', 'い', 'う', 'え', 'お']);
    // UTF8 string must be quoted
    $template = "<Format join=\"・\">{$source}</Format>";
    $result = tangible_template( $template );
    $expected = 'あ・い・う・え・お';
    $this->assertEquals( $expected, $result, $template );
  }

  function test_format_list_reverse() {
    $list = [1, 2, 3];

    $template = "<Format list reverse>".json_encode($list)."</Format>";
    $this->assertEquals(
      array_reverse($list),
      json_decode(tangible_template( $template ))
    );
  }

  function test_format_list_chain_formats() {

    // Split

    $items = ["#Red*", "  !Green)", " @Blue(  "];
    
    $template = '<Format split="," trim>'.implode(', ', $items).'</Format>';

    $expected = json_encode( array_map('trim', $items) );
    
    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $split_template = $template;

    // Replace

    $pattern = '/[^a-zA-Z0-9_-]/s';
    $source = $items[0];

    $template = "<Format replace_pattern=\"{$pattern}\" with=\"\">$source</Format>";
    
    $expected = preg_replace($pattern, '', $source);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Split and list replace

    $template = "<Format list replace_pattern=\"{$pattern}\" with=\"\">$split_template</Format>";

    $trimmed_and_replaced_items = array_map(
      function($item) use ($pattern) {
        return preg_replace($pattern, '', $item);
      },
      array_map('trim', $items)
    );

    $expected = json_encode($trimmed_and_replaced_items);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Split, list replace, list lowercase

    $replace_split_template = $template;
    $template = "<Format list case=lower>$replace_split_template</Format>";

    $trimmed_replaced_and_lowercased_items = array_map(
      'strtolower',
      $trimmed_and_replaced_items
    );

    $expected = json_encode($trimmed_replaced_and_lowercased_items);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Prefix

    $replace_split_lowercase_template = $template;

    $template = "<Format prefix=\"color-\">blue</Format>";

    $expected = 'color-blue';

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Split, list replace, list lowercase, list prefix

    $template = "<Format list prefix=\"color-\">$replace_split_lowercase_template</Format>";

    $trimmed_replaced_lowercased_and_prefixed_items = array_map(
      function($item) { return 'color-' . $item; },
      $trimmed_replaced_and_lowercased_items
    );

    $expected = json_encode($trimmed_replaced_lowercased_and_prefixed_items);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    // Split, list replace, list lowercase, list prefix, then join

    $replace_split_lowercase_prefix_template = $template;

    $template = "<Format join=\" \">$replace_split_lowercase_prefix_template</Format>";

    $expected = implode(" ", $trimmed_replaced_lowercased_and_prefixed_items);

    $result = tangible_template( $template );
    $this->assertEquals( $expected, $result, $template );

    $template = <<<HTML
    <Format join=" ">
      <Format list prefix="color-">
        <Format list case=lower>
          <Format list replace_pattern="/[^a-zA-Z0-9_-]/s" with="">
            <Format split="," trim>#Red*, !Green), @Blue(</Format>
          </Format>
        </Format>
      </Format>
    </Format>
    HTML;

    $result = tangible_template( $template );
    $expected = 'color-red color-green color-blue';
    $this->assertEquals( $expected, $result, $template );
  }

}
