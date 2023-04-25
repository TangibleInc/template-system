<?php
class Template_Tag_Tag_Attributes_TestCase extends WP_UnitTestCase {
  public function test_template_tag_tag_attributes_case() {

    $html = tangible_template();

    $key = 'test';
    $value = 'Test 1';

    $this->assertEquals(
      "<div {$key} key=\"{$key}\">{$value}</div>",
      $html->render("<div tag-attributes=\"{$key} key={$key}\">{$value}</div>")
    );

    $html->render("<Set tag-attributes=\"{$key}\">{$value}</Set>");
    $this->assertEquals( $value, $html->render("<Get {$key} />"));

    $value = 'Test 2';
    $html->render("<Set tag-attributes=\"name={$key}\">{$value}</Set>");
    $this->assertEquals( $value, $html->render("<Get {$key} />"));
  }
}
