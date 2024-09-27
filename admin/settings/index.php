<?php
namespace tangible\template_system;
use tangible\template_system;

template_system::$state->settings_key = 'tangible_template_system_settings';
template_system::$state->setting_fields = [

  [
    'name' => 'acf_template_field',
    'field_type' => 'checkbox',
    'label' => 'Enable ACF Template field - Custom field with template editor. See <a href="https://docs.loopsandlogic.com/integrations/acf#template">documentation on ACF Template field type</a>.',
    'default_value' => false,
  ],

  // Features in development
  [
    'name' => 'atomic_css',
    'field_type' => 'checkbox',
    'label' => 'Atomic CSS: Generate CSS utility classes on demand',
    'beta' => true,
    'default_value' => false,
  ],

  [
    'name' => 'codemirror_6',
    'field_type' => 'checkbox',
    'label' => 'CodeMirror 6: Enable the new editor for Elementor and Beaver Builder, where it\'s not ready yet.',
    'beta' => true,

    // TODO: Switch default to true when new editor is ready
    'default_value' => false,
  ],

  [
    'name' => 'content',
    'field_type' => 'checkbox',
    'label' => 'Content structure templates: Post types, field groups, taxonomies - See <i>Tangible -> Content</i>',
    'default_value' => false,
    'beta' => true,
    'reload' => true,
  ],

  [
    'name' => 'form',
    'field_type' => 'checkbox',
    'label' => 'Form templates and field types',
    'beta' => true,
    'default_value' => false,
  ],

  [
    'name' => 'sass_in_browser',
    'field_type' => 'checkbox',
    'label' => 'Use offical Sass compiler (dart-sass) in the browser. This compiles template style field into CSS when the post is saved. Previously they were rendered on template load using SCSS-PHP on the server.',
    'default_value' => false,
    'beta' => true,
    'reload' => true,
  ],

  [
    'name' => 'standard_attributes',
    'field_type' => 'checkbox',
    'label' => 'Standard attributes: Convert minus "-" in attribute name to underscore "_" when passed to dynamic tags. Some tags also support standard attribute *values*, for example, query parameters or field names where underscore is expected.',
    'beta' => true,
    'default_value' => false,
  ],

  [
    'name' => 'theme_templates',
    'field_type' => 'checkbox',
    'label' => 'Theme templates and template JSON support',
    'beta' => true,
    'default_value' => false,
  ],

  [
    'name' => 'builder',
    'field_type' => 'checkbox',
    'label' => 'Builder: Integrated authoring environment for all template types - See <i>Tangible -> Builder</i>',
    'default_value' => false,
    'beta' => true,
    'reload' => true,
  ],
];

function get_setting_fields() {
  return template_system::$state->setting_fields;
}

function get_settings( $field_name = null, $default_value = null ) {

  $settings = get_option( template_system::$state->settings_key );
  if (empty($settings)) $settings = [];

  // Provide defaults
  foreach (template_system::$state->setting_fields as $field) {
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

  update_option( template_system::$state->settings_key, $settings );

  return $settings;
}

function settings_page() {
  require_once __DIR__.'/page.php';
};

require_once __DIR__.'/save.php';
