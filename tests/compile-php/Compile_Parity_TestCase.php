<?php
namespace Tests\CompilePhp;

class Compile_Parity_TestCase extends \WP_UnitTestCase {

  /**
   * @group compile-php
   */
  function test_fixtures() {
    if ( ! function_exists( 'tangible_template_compile_render' ) ) {
      $this->markTestSkipped('Compiler entry point not available.');
    }

    add_shortcode('compile_mode', function($atts = [], $content = '') {
      $content = (string) $content;
      if (strpos($content, '<Get') !== false) {
        return 'raw:' . $content;
      }
      return 'rendered:' . $content;
    });

    $fixtures_dir = __DIR__ . '/fixtures';
    $dirs = array_filter(glob($fixtures_dir . '/*'), 'is_dir');

    $normalize = function($value) {
      return str_replace(["\r\n", "\r"], "\n", trim($value));
    };

    $apply_context = function($html, $context) {
      if (empty($context)) return;
      foreach ($context as $key => $value) {
        if (!is_string($key) || $key === '') continue;
        $html->set_variable_type('variable', $key, $value, [
          'render' => false,
          'trim' => false,
        ]);
      }
    };

    foreach ($dirs as $dir) {
      $slug = basename($dir);

      $template_path = $dir . '/template.ll.html';
      $expected_path = $dir . '/expected.html';
      $context_path = $dir . '/context.json';
      $setup_path = $dir . '/setup.php';

      // Optional per-fixture setup, e.g. create posts for DB-backed tags.
      // Must be idempotent: the TS runner executes it per render pass.
      if (file_exists($setup_path)) {
        require $setup_path;
      }

      $template = file_get_contents($template_path);
      $expected = file_get_contents($expected_path);
      $context = json_decode(file_get_contents($context_path), true);

      if ($template === false || $expected === false || !is_array($context)) {
        $this->fail('Invalid fixture: ' . $slug);
      }

      // The TS runner trims templates before rendering; keep passes identical
      $template = trim($template);

      $html = tangible_template();
      $previous_variables = $html->variable_type_memory['variable'] ?? null;

      /**
       * Optional side-effect capture: runs after each render pass and
       * returns a string appended to the output before comparison. Must
       * reset whatever state it reads, since it runs once per pass.
       */
      $capture_path = $dir . '/capture.php';
      $capture = function () use ($capture_path) {
        return file_exists($capture_path) ? "\n" . require $capture_path : '';
      };

      /**
       * Optional output normalization for environment-dependent values
       * (e.g. salted hashes). Returns a callable applied to each pass.
       */
      $normalize_path = $dir . '/normalize.php';
      $normalize_fixture = file_exists($normalize_path) ? require $normalize_path : null;

      $apply_context($html, $context);
      $runtime = tangible_template($template) . $capture();

      if (is_array($previous_variables)) {
        $html->variable_type_memory['variable'] = $previous_variables;
      }

      $compiled = tangible_template_compile_render($template, $context) . $capture();

      if (is_callable($normalize_fixture)) {
        $runtime = $normalize_fixture($runtime);
        $compiled = $normalize_fixture($compiled);
      }

      $expected_norm = $normalize($expected);
      $this->assertEquals($expected_norm, $normalize($runtime), $slug . ' runtime');
      $this->assertEquals($expected_norm, $normalize($compiled), $slug . ' compiled');

      // Optional per-fixture cleanup, e.g. removing filters added in setup
      $teardown_path = $dir . '/teardown.php';
      if (file_exists($teardown_path)) {
        require $teardown_path;
      }
    }
  }
}
