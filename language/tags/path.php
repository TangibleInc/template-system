<?php
/**
 * Site folder paths, like <Path child-theme>
 *
 * @see https://codex.wordpress.org/Determining_Plugin_and_Content_Directories
 */

$html->register_variable_type('path', [
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
    if (isset( $memory[ $name ] )) return $memory[ $name ];

    $path = '';

    // For backward compatibility - Standardized to use underscore for field names
    $name = str_replace( '-', '_', $name );

    switch ( $name ) {
      case 'site':
      case 'home':
        $path = $html->get_home_path();
          break;
      case 'admin':
        $path = $html->get_home_path() . 'wp-admin';
          break;
      case 'theme':
        $path = get_template_directory();
          break;
      case 'child_theme': // Use underscore for field names
          $path = get_stylesheet_directory();
          break;
      case 'content':
        $path = str_replace( site_url(), $html->get_home_path(), content_url() );
          break;
      case 'plugins':
        $path = WP_PLUGIN_DIR;
          break;
      case 'themes':
        $path = get_theme_root();
          break;
      case 'uploads':
        $data = wp_upload_dir( null, false, false );
        $path = $data['path'];
          break;

      // With Tangible Views theme

      case 'file':
          // Current template folder path
        $path = $html->get_current_context( 'path' ) . '/' . $html->get_current_context( 'file' );
          break;
      case '':
      case 'folder':
          // Current template folder path
        $path = $html->get_current_context( 'path' );
          break;

      default:
          return '';
    }

    // Paths do not have trailing slash

    return $memory[ $name ] = untrailingslashit( $path );
  },
]);

$html->get_path = function( $name, $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'path', $name, $atts );
};

$html->set_path = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'path', $name, $content, $atts );
};

/**
 * Based on wp-admin/includes/file.php, get_home_path(), which is only available in admin.
 */
$html->get_home_path = function() {
  $home      = set_url_scheme( get_option( 'home' ), 'http' );
    $siteurl = set_url_scheme( get_option( 'siteurl' ), 'http' );
  if ( ! empty( $home ) && 0 !== strcasecmp( $home, $siteurl ) ) {
      $wp_path_rel_to_home = str_ireplace( $home, '', $siteurl ); /* $siteurl - $home */
      $pos                 = strripos( str_replace( '\\', '/', $_SERVER['SCRIPT_FILENAME'] ), trailingslashit( $wp_path_rel_to_home ) );
      $home_path           = substr( $_SERVER['SCRIPT_FILENAME'], 0, $pos );
      $home_path           = trailingslashit( $home_path );
  } else {
      $home_path = ABSPATH;
  }

    return str_replace( '\\', '/', $home_path );
};

$html->path_tag = function( $atts ) use ( $html ) {
  $key = array_shift( $atts['keys'] );
  return $html->get_variable_type( 'path', $key, $atts );
};

return $html->path_tag;
