# Plugin

Common utilities for plugins

## Register plugin

```php
use tangible\framework;

add_action('plugins_loaded', function() {

  $plugin = framework\register_plugin([
    'name' => 'tangible-example',
    'title' => 'Tangible example',
    'setting_prefix' => 'tangible_example',
    'version' => '0.0.0',
    'file_path' => __FILE__,
    'base_path' => plugin_basename( __FILE__ ),
    'dir_path' => plugin_dir_path( __FILE__ ),
    'url' => plugins_url( '/', __FILE__ ),
    'assets_url'     => plugins_url( '/assets', __FILE__ ),
  ]);

  // ...Load plugin features
});
```

## Plugin settings

Register a plugin settings page under admin menu Settings -> Plugin Name.

```php
framework\register_plugin_settings($plugin, [
  'js' => $plugin->assets_url . '/build/admin.min.js',
  'css' => $plugin->assets_url . '/build/admin.min.css',
  'title_callback' => function() use ($plugin) {
    ?>
      <img class="plugin-logo"
        src="<?php echo $plugin->assets_url; ?>/images/plugin-logo.png"
        alt="Plugin Logo"
        width="40"
      >
      <?php echo $plugin->title; ?>
    <?php
  },
  'tabs' => [
    'welcome' => [
      'title' => 'Welcome',
      'callback' => function() {
        require_once __DIR__ . '/welcome.php';
      }
    ]
  ],
]);
```

### Get plugin settings

```php
$settings = framework\get_plugin_settings($plugin);
```

## Plugin features

Plugins can register a set of "features" that are loaded when users enable them from a settings page.

Each feature has these properties:

- `name` - Name (alphanumeric lowercase) used to load/save setting
- `title` - Title for the checkbox
- `entry_file` - Path to the file to load the feature
- `default` - Optional: Set `true` to enable the feature by default

```php
framework\register_plugin_settings($plugin, [
  // ...Other settings
  'features' => [
    [
      'name' => 'example',
      'title' => 'First feature',
      'entry_file' => __DIR__ . '/example.php'
    ],
    [
      'name' => 'example_2',
      'title' => 'Second feature',
      'entry_file' => __DIR__ . '/example-2.php'
      'default' => true,
    ],
  ],
  'tabs' => [
    // ...Other tabs
    'features' => [
      'title' => 'Features',
      'callback' => function() use ($plugin) {
        framework\render_features_settings_page($plugin);
      }
    ],
  ],
]);
```

Note that it requires a settings tab to render the form, which is a set of checkboxes and a save button. This is not done automatically to allow flexibility of where to put the Features tab.
