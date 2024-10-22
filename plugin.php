<?php
/**
 * Plugin Name: Tangible Template System
 * Description: Template system shared by Tangible Blocks and Loops & Logic
 * Version: 2024.10.20
 * GitHub URI: TangibleInc/template-system
 */
use tangible\framework;
use tangible\updater;

define('TANGIBLE_TEMPLATE_SYSTEM_IS_PLUGIN', true);

// require_once __DIR__ . '/vendor/tangible/framework/index.php';
require_once __DIR__ . '/vendor/tangible/updater/index.php';
require_once __DIR__ . '/index.php';

add_action('plugins_loaded', function() {

  $plugin = framework\register_plugin([
    'name' => 'tangible-template-system',
    'title' => 'Template System',
    'setting_prefix' => 'tangible_template_system',
    'version' => '2024.10.21',
    'file_path' => __FILE__,
    'base_path' => plugin_basename( __FILE__ ),
    'dir_path' => plugin_dir_path( __FILE__ ),
    'url' => plugins_url( '/', __FILE__ ),
    'assets_url' => plugins_url( '/assets', __FILE__ ),
  ]);

  framework\register_plugin_settings($plugin, [
    // 'js' => $plugin->assets_url . '/build/admin.min.js',
    // 'css' => $plugin->assets_url . '/build/admin.min.css',
    'title_callback' => function() use ($plugin) {
      ?>
<style>
.plugin-title {
  position: relative;
  margin-bottom: 16px;
}

.plugin-logo {
  padding: 0;
  margin-right: .25rem;
  margin-bottom: -12px;
}
</style>
        <img class="plugin-logo"
          src="<?php echo framework::$state->path; ?>/design/tangible-logo.png"
          alt="Tangible Logo"
          width="40"
        >
        <?php echo $plugin->title; ?>
      <?php
    },
    'tabs' => [
      'welcome' => [
        'title' => 'Welcome',
        'callback' => function() {
          ?>Hello, world.<?php
          // require_once __DIR__ . '/welcome.php';
        }
      ],
    ],
  ]);

  // For local development
  // updater\set_server_url("http://localhost:7100");
  // updater\register_plugin([
  //   'name' => $plugin->name,
  //   'file' => __FILE__,    
  // ]);
});
