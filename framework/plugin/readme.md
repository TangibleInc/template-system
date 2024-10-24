# Plugin

Common utilities for plugins

## Full example

```php
use tangible\framework;
use tangible\updater;

require_once __DIR__ . '/vendor/tangible/framework/index.php';
require_once __DIR__ . '/vendor/tangible/updater/index.php';

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
    'assets_url' => plugins_url( '/assets', __FILE__ ),
  ]);

  // Optionally
  framework\register_plugin_features($plugin, $features);
  framework\register_plugin_settings($plugin, $settings);
  framework\register_plugin_dependencies($plugin, $dependencies);

  updater\register_plugin([
    'name' => $plugin->name,
    'file' => __FILE__,
  ]);

  if (!framework\has_all_plugin_dependencies($plugin)) {
    return;
  }

  // ..Load the rest of plugin
  require_once __DIR__ . './includes/index.php';

});
```

## Register plugin

```php
$plugin = framework\register_plugin($config);
```

Required properties:

- `name` - Lowercase alphanumeric with dash
- `title` - Title cased name for settings page heading
- `setting_prefix` - Lowercase alphanumeric with underscore, used to save plugin settings
- `version` - Version number with syntax: `*.*.*`
- `file_path` - Path to the entry file: `__FILE__`
- `base_path` - Plugin folder and entry: `plugin_basename( __FILE__ )`
- `dir_path` - Path to plugin folder: `plugin_dir_path( __FILE__ )`
- `url` - URL to the plugin folder: `plugins_url( '/', __FILE__ )`

Any other property is assigned to the resulting `$plugin` object, along with all the above.


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
framework\register_plugin_features($plugin, [
  [
    'name' => 'example',
    'title' => 'First feature',
    'entry_file' => __DIR__ . '/example.php'
  ],
  [
    'name' => 'example_2',
    'title' => 'Second feature',
    'entry_file' => __DIR__ . '/example-2.php',
    'default' => true,
  ],
]);

framework\register_plugin_settings($plugin, [
  // ...Other settings
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


## Plugin dependencies

Register plugin dependencies.

```php
framework\register_plugin_dependencies($plugin, [
  [
    'title' => 'Example Plugin',
    'url' => 'https://tangibleplugins.com/example-plugin',
    'active' => function_exists('tangible_example_plugin')
  ]
]);
```

The argument `$dependencies` is an array of dependencies, an object with the properties:

- `title` - Plugin title
- `url` - Optional: URL to the plugin website
- `active` - Boolean (true/false)
- `callback` - Optional: Instead of `active`, run callback that returns true/false
