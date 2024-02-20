<?php
namespace Tests\HTML;

require_once __DIR__ . '/../../html/common.php';

/**
 * HTML module: Verify parse and render against snapshots in test suite
 */
class HTML_Verify_Snapshots extends \WP_UnitTestCase {

  function test_html_parse() {

    $html = tangible_template();

    $snapshots_dir = __DIR__ . '/../../html/snapshots';
    $files = \tangible\tests\html\get_test_html_files();

    foreach ($files as $file) {

      $parsed_json_file = str_replace('.html', '--parsed.json', $file['name']);

      $expected = json_decode(
        file_get_contents($snapshots_dir . '/' . $parsed_json_file),
        true
      );
      $parsed = $html->parse( $file['content'] );

      $this->assertEquals(
        $expected,
        $parsed,
        $parsed_json_file
      );
    }
  }

  function test_html_render() {

    $html = tangible_template();

    $snapshots_dir = __DIR__ . '/../../html/snapshots';
    $files = glob(
      $snapshots_dir . '/*--parsed.json'
    );

    /**
     * Render these as raw tags for now because they're processed differently
     */
    unset($html->tags['a']);
    unset($html->tags['link']);
    unset($html->tags['img']);
    unset($html->tags['title']);
    unset($html->tags['script']);
    unset($html->tags['style']);

    $html->add_raw_tag('script', function($atts, $children) use ($html) {
      return $html->render_raw_tag('script', $atts, $children);
    });
    
    foreach ($files as $file) {

      $parsed = json_decode( file_get_contents($file), true );
      $rendered_html_file = str_replace('--parsed.json', '--rendered.html', $file);

      $expected = file_get_contents( $rendered_html_file );
      $rendered = $html->render( $parsed );

      $this->assertEquals(
        /**
         * Handle difference between esc_attr (WordPress function) and htmlspecialchars
         */
        str_replace(['&#039;'], ['&#39;'], $expected),
        str_replace(['&#039;'], ['&#39;'], $rendered),
        str_replace($snapshots_dir . '/', '', $rendered_html_file)
      );
    }
  }
}
