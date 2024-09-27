<?php
/**
 * Load enabled plugin features based on settings
 */
namespace tangible\framework;
use tangible\framework;

function render_features_settings_page($plugin) {

  $settings_key = framework\get_plugin_settings_key($plugin);
  $settings = framework\get_plugin_settings($plugin);

  $features = $plugin->features ?? [];
  $features_title = 'Features';

  ?>
  <div class="tangible-plugin-features-settings tangible-plugin-<?php echo $plugin->name; ?>-features-settings">
    <h2><?php echo $features_title; ?></h2>
    <div class="tangible-plugin-features-cards">
    <?php
      foreach ($features as $feature) {

        $name = $feature['name'];
        $title = $feature['title'];

        $feature_key = framework\get_plugin_feature_key($plugin, $feature);
        $is_enabled = framework\is_plugin_feature_enabled($plugin, $feature, $settings);

        ?>
        <div class="setting-row feature-<?php echo $name; ?>">
          <?php
            framework\render_setting_field_checkbox([
              'type' => 'switch',
              'name' => "{$settings_key}[$feature_key]",
              'value' => $is_enabled ? 'true' : '',
              'label' => $title,
              'description' => $feature['description'] ?? '',
            ]);
          ?>
        </div>
        <?php
      }
      ?>
    </div>
    <?php
      submit_button();
    ?>
  </div>
  <?php

};

function load_plugin_features($plugin) {

  $settings = framework\get_plugin_settings($plugin);
  $features = $plugin->features ?? [];
  $features_path = $plugin->dir_path . '/features';

  foreach ($features as $feature) {
    if (!framework\is_plugin_feature_enabled($plugin, $feature, $settings)) continue;

    // Include feature with local scope: $plugin, $feature

    $feature_entry_file = isset($feature['entry_file'])
      ? $feature['entry_file'] // "{$feature['name']}/{$feature['entry_file']}"
      : $features_path . "/{$feature['name']}/index.php"
    ;

    include  $feature_entry_file;
  }
};

function get_plugin_feature_key($plugin, $feature) {
  return "{$plugin->setting_prefix}_{$feature['name']}";
};

function is_plugin_feature_enabled($plugin, $feature, $settings) {

  $feature_key = framework\get_plugin_feature_key($plugin, $feature);
  $default_value = isset($feature['default']) ? $feature['default'] : false; // Disabled by default

  return !isset($settings[$feature_key])
    ? $default_value
    : $settings[$feature_key]==='true';
};

function get_plugin_feature_settings_key_index($plugin, $feature) {
  $feature_key = framework\get_plugin_feature_key($plugin, $feature);
  return "{$feature_key}_settings";
};

function get_plugin_feature_settings_key($plugin, $feature) {
  $settings_key = framework\get_settings_key($plugin);
  $index = framework\get_plugin_feature_settings_key_index($plugin, $feature);
  return "{$settings_key}[{$index}]";
};

function get_plugin_feature_settings($plugin, $feature) {
  $settings = framework\get_settings($plugin);
  $index = framework\get_plugin_feature_settings_key_index($plugin, $feature);
  return isset($settings[$index]) ? $settings[$index] : [];
};
