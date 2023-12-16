<?php

class Template_Tags_Raw extends WP_UnitTestCase {
  public function test_raw_tag() {

    $html = tangible_template();

    // Arbitrary text including possibly malformed HTML
    $content = '<a><b/><>';

    $nodes = $html->parse("<Raw>{$content}</Raw>");

    $this->assertEquals( $content, @$nodes[0]['children'][0]['text'] );
  }
}