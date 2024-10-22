<?php
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
