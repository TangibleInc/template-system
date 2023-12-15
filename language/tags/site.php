<?php
/**
 * Get site option
 *
 * https://codex.wordpress.org/Option_Reference
 */

$html->register_variable_type('site', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {

    // For now, <Set> tag cannot update site settings by default

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

    if (isset( $memory[ $name ] )) return $memory[ $name ];

    // Aliases

    switch ( $name ) {
      case 'name':
      case 'title':
          $name = 'blogname';
          break;
      case 'description':
        $name = 'blogdescription';
          break;
      case 'url':
        $name = 'siteurl';
          break;
      // date_format, home, admin_email, ..
    }

    $value = get_option( $name );

    return $memory[ $name ] = $value;
  },
]);

$html->site_tag = function( $atts, $content ) use ( $html ) {
  $key = array_shift( $atts['keys'] );
  return $html->get_variable_type( 'site', $key, $atts );
};

return $html->site_tag;
