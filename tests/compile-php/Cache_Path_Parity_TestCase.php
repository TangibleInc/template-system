<?php
namespace Tests\CompilePhp;

use tangible\template_system;

/**
 * Renders every parity fixture through the processed template post cache
 * (off, store, hit) and asserts the three outputs are identical. This is
 * the render path users hit with the "object cache" setting enabled, and
 * it round-trips parsed nodes through serialization (transients in the
 * options table), the category behind forum thread #1333.
 */
class Cache_Path_Parity_TestCase extends \WP_UnitTestCase {

  /**
   * @group compile-php
   */
  function test_fixtures_through_processed_cache() {

    $fixtures_dir = __DIR__ . '/fixtures';
    $dirs = array_filter(glob($fixtures_dir . '/*'), 'is_dir');

    $html = tangible_template();
    $plugin = tangible_template_system();

    $settings_key = \tangible\template_system::$state->settings_key;
    $set_cache_setting = function ($enabled) use ($settings_key) {
      $settings = get_option($settings_key) ?: [];
      $settings['object_cache_processed_template_post'] = $enabled;
      update_option($settings_key, $settings);
    };

    $normalize = function ($value) {
      return str_replace(["\r\n", "\r"], "\n", trim((string) $value));
    };

    foreach ($dirs as $dir) {
      $slug = basename($dir);

      // Side-effect captures accumulate across the three renders
      if (file_exists($dir . '/capture.php')) {
        continue;
      }

      $template = trim(file_get_contents($dir . '/template.ll.html'));
      $context = json_decode(file_get_contents($dir . '/context.json'), true);

      if (file_exists($dir . '/setup.php')) {
        require $dir . '/setup.php';
      }

      $normalize_fixture = file_exists($dir . '/normalize.php')
        ? require $dir . '/normalize.php'
        : null;

      foreach ((array) $context as $key => $value) {
        if (!is_string($key) || $key === '') continue;
        $html->set_variable_type('variable', $key, $value, [
          'render' => false,
          'trim' => false,
        ]);
      }

      // Template post holding the fixture template
      kses_remove_filters();
      $post_id = wp_insert_post([
        'post_type' => 'tangible_template',
        'post_status' => 'publish',
        'post_title' => 'Cache Parity ' . $slug,
        'post_name' => 'cache-parity-' . $slug,
        'post_content' => $template,
      ]);
      kses_init_filters();
      $post = get_post($post_id);

      $set_cache_setting(false);
      $direct = $plugin->render_template_post($post);

      $set_cache_setting(true);
      template_system\delete_processed_template_post_cache($post);
      $store = $plugin->render_template_post($post);
      $hit = $plugin->render_template_post($post);

      $set_cache_setting(false);

      if (is_callable($normalize_fixture)) {
        $direct = $normalize_fixture($direct);
        $store = $normalize_fixture($store);
        $hit = $normalize_fixture($hit);
      }

      $this->assertEquals($normalize($direct), $normalize($store), $slug . ' cache store');
      $this->assertEquals($normalize($direct), $normalize($hit), $slug . ' cache hit');

      if (file_exists($dir . '/teardown.php')) {
        require $dir . '/teardown.php';
      }
    }
  }
}
