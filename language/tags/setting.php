<?php
/**
 * Variable type for site settings
 */

$html->external_setting_variable_types = [
  // name => true
];

$html->register_variable_type('setting', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {

    $content = isset( $atts['raw'] ) ? $content : $html->render( $content );

    // Trim string by default, unless trim=false
    if ( is_string( $content ) &&
      ( ! isset( $atts['trim'] ) || ( $atts['trim'] !== 'false' && $atts['trim'] !== false ) )
    ) {
      $content = trim( $content );
    }

    $memory[ $name ] = $content;
  },
  'get' => function( $name, $atts, &$memory ) use ( $html ) {

    if ( isset( $memory[ $name ] ) ) {
      $setting = $memory[ $name ];
    } else {
      $setting = $memory[ $name ] = get_option( $name );
    }

    /**
     * Support external setting shortcut, such as "learndash" for "learndash_setting"
     */
    foreach ( $atts as $key => $value ) {

      if ( ! isset( $html->external_setting_variable_types[ $key ] )) continue;

      unset( $atts[ $key ] );
      return $html->get_variable_type( "{$key}_setting", $value, $atts );
    }

    if ( isset( $atts['field'] ) ) {

      $field_name = $atts['field'];

      if ( is_array( $setting ) ) {

        if ( is_numeric( $field_name ) ) {
          // Support array index
          $field_name = (int) $field_name;
        }

        return isset( $setting[ $field_name ] ) ? $setting[ $field_name ] : null;
      }

      if ( is_object( $setting ) ) {
        return isset( $setting->$field_name ) ? $setting->$field_name : null;
      }

      return;
    }

    return $setting;
  },
]);

$html->get_setting = function( $name = '', $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'setting', $name, $atts );
};

$html->set_setting = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'setting', $name, $content, $atts + [ 'raw' => true ] );
};

/**
 * Provide dynamic shortcuts for third-party plugin settings
 *
 * Example: if variable type `learndash_setting` is registered, let the user access it as:
 *
 * <Setting learndash=permalinks />
 *
 * Using `after_setup_theme` action instead of `plugins_loaded`, to allow themes to register
 * variable types. (Mostly for testing purpose)
 */
add_action('after_setup_theme', function() use ( $html ) {

  foreach ( $html->variable_types as $type => $config ) {

    if (substr( $type, -8 ) !== '_setting') continue;

    $prefix = substr( $type, 0, -8 );
    $html->external_setting_variable_types[ $prefix ] = true;
  }

}, 999); // After external variable types registered

$html->setting_tag = function( $atts, $content ) use ( $html ) {
  $key = array_shift( $atts['keys'] );
  return $html->get_variable_type( 'setting', $key, $atts );
};

return $html->setting_tag;
