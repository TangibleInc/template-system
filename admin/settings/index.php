<?php

namespace Tangible\TemplateSystem;

use Tangible\TemplateSystem as system;

system::$state->settings_key = 'tangible_template_system_settings';
system::$state->setting_fields = [

  [
    'name' => 'allow_json_upload',
    'field_type' => 'checkbox',
    'label' => 'Allow uploading JSON files - May be necessary on some site setups to import templates',
    'default_value' => false,
  ],
  [
    'name' => 'allow_svg_upload',
    'field_type' => 'checkbox',
    'label' => 'Allow uploading SVG files - May be necessary on some site setups to import template assets',
    'default_value' => false,
  ],

  // Features in development

  // [
  //   'name' => 'ide',
  //   'field_type' => 'checkbox',
  //   'label' => 'IDE - Integrated Development Environment (Tangible -> Template System)',
  //   'default_value' => false,
  //   'beta' => true,
  // ],

  // Deprecated features

  [
    'name' => 'codemirror_5',
    'field_type' => 'checkbox',
    'label' => 'Editor based on CodeMirror 5',
    'default_value' => false,
    'deprecated' => true
  ],
  [
    'name' => 'acf_template_field',
    'field_type' => 'checkbox',
    'label' => 'ACF Template field',
    'default_value' => false,
    'deprecated' => true
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
