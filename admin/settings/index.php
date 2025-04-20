<?php
namespace tangible\template_system;
use tangible\template_system;

template_system::$state->settings_key = 'tangible_template_system_settings';
template_system::$state->setting_fields = [

  [
    'name' => 'acf_template_field',
    'field_type' => 'checkbox',
    'label' => 'ACF Template field type (<a href="https://docs.loopsandlogic.com/integrations/acf#template">Documentation</a>)',
    'default_value' => false,
  ],

  [
    'name' => 'codemirror_6_elementor',
    'field_type' => 'checkbox',
    'label' => 'Elementor integration: Use new template editor based on CodeMirror 6',
    'default_value' => true,
  ],

  [
    'name' => 'object_cache_processed_template_post',
    'field_type' => 'checkbox',
    'label' => 'Object cache for parsed and pre-processed template posts',
    'default_value' => true,
  ],

  // Features in development (beta/experimental)
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
    'label' => 'Beaver Builder integration: Use new template editor based on CodeMirror 6 (Not working because Beaver\'s lightbox CSS breaks editor styles)',
    'beta' => true,
    'default_value' => false, // TODO: Switch default to true when new editor is ready
  ],

  [
    'name' => 'content',
    'field_type' => 'checkbox',
    'label' => 'Content structure templates: Post types, field groups, taxonomies',
    'default_value' => false,
    'beta' => true,
    'reload' => true, // Show new admin menu item
  ],

  [
    'name' => 'form',
    'field_type' => 'checkbox',
    'label' => 'Form templates and field types',
    'default_value' => false,
    'beta' => true,
    'reload' => true, // Show new admin menu item
  ],

/*

  [
    'name' => 'views',
    'field_type' => 'checkbox',
    'label' => 'Views: Integrated authoring environment for all template types - See <i>Tangible -> Views</i>',
    'default_value' => false,
    'beta' => true,
    'reload' => true,
  ],

  [
    'name' => 'html_streaming_processor',
    'field_type' => 'checkbox',
    'label' => 'New HTML streaming processor for better performance and memory usage',
    'default_value' => false,
    'beta' => true,
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
    'name' => 'theme_templates',
    'field_type' => 'checkbox',
    'label' => 'Theme templates and template JSON support',
    'beta' => true,
    'default_value' => false,
  ],

*/

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

// Alias
function get_setting( $field_name = null, $default_value = null ) {
  return get_settings($field_name, $default_value);
}

function set_settings( $settings ) {
  update_option( template_system::$state->settings_key, $settings );
  return $settings;
}

function set_setting( $key, $value ) {
  $settings = template_system\get_settings();
  if (!is_array($settings)) $settings = [];
  $settings[ $key ] = $value;
  return template_system\set_settings( $settings );
}

function settings_page() {
  require_once __DIR__.'/page.php';
};

require_once __DIR__.'/save.php';
