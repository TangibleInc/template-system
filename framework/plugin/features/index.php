<?php
/**
 * A way to define plugin features, and load them based on settings
 */
namespace tangible\framework;
use tangible\framework;

require_once __DIR__ . '/settings.php';

function register_plugin_features($plugin, $features) {
  $plugin->features = $features;
  framework\load_plugin_features( $plugin );
}

function load_plugin_features($plugin) {

  $features = $plugin->features ?? [];
  if (empty($features)) return;

  $settings = framework\get_plugin_settings($plugin);
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
