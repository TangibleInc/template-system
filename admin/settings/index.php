<?php

namespace Tangible\TemplateSystem;

use Tangible\TemplateSystem as system;

system::$state->settings_key = 'tangible_template_system_settings';
system::$state->setting_fields = [

  [
    'name' => 'acf_template_field',
    'field_type' => 'checkbox',
    'label' => 'Enable ACF Template field - Custom field with template editor',
    'default_value' => false,
  ],

  // Features in development

  [
    'name' => 'codemirror_6',
    'field_type' => 'checkbox',
    'label' => 'New template editor based on CodeMirror 6',
    'default_value' => true,
    'beta' => true
  ],

  [
    'name' => 'ide',
    'field_type' => 'checkbox',
    'label' => 'IDE prototype - Integrated Development Environment (See <i>Tangible -> Views</i>)',
    'default_value' => false,
    'beta' => true,
  ],
];

function get_setting_fields() {
  return system::$state->setting_fields;
}

function get_settings( $field_name = null, $default_value = null ) {

  $settings = get_option( system::$state->settings_key );
  if (empty($settings)) $settings = [];

  // Provide defaults
  foreach (system::$state->setting_fields as $field) {
    if (!isset( $settings[ $field['name'] ] )) {
      $settings[ $field['name'] ] = $field[ 'default_value' ] ?? null;
    }
  }

  if (!is_null($field_name)) {
    return $settings[ $field_name ] ?? null;
  }

  return $settings;
}

function set_settings( $settings ) {

  update_option( system::$state->settings_key, $settings );

  return $settings;
}

function settings_page() {
  require_once __DIR__.'/page.php';
};

require_once __DIR__.'/save.php';
