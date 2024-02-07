<?php
use tangible\format;

/**
 * <url> gets current URL, site home, uploads folder, ..
 *
 * @see https://codex.wordpress.org/Determining_Plugin_and_Content_Directories
 */

$html->register_variable_type('url', [
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

    global $wp;
    $url = '';

    // For backward compatibility - Standardized to use underscore for field names
    $name = str_replace( '-', '_', $name ? : '' );

    switch ( $name ) {
      case '':
      case 'current':
        $url = is_multisite() ? get_home_url( $wp->request ) : home_url( $wp->request );

        if ( isset( $atts['query'] ) && $atts['query'] === 'true' ) {
          $query = $html->get_url_query( 'query', $atts );
          if ( ! empty( $query ) ) {
            $url = trailingslashit( $url ) . '?' . $query;
          }
        } else {
          $url = untrailingslashit( $url );
        }

        // Don't cache since value can change
          return $url;

      case 'site':
        $url = is_multisite() ? get_site_url() : site_url();
          break;
      case 'home':
        $url = is_multisite() ? get_home_url() : home_url();
          break;
      case 'admin':
        $url = is_multisite() ? get_admin_url() : admin_url();
          break;
      case 'ajax':
        $url = is_multisite() ? get_admin_url( 'admin-ajax.php' ) : admin_url( 'admin-ajax.php' );
          break;

      case 'network_admin':
        $url = network_admin_url();
          break;
      case 'network_site':
        $url = network_site_url();
          break;
      case 'network_home':
        $url = network_home_url();
          break;

      case 'content':
        $url = content_url();
          break;
      case 'plugins':
        $url = plugins_url();
          break;
      case 'theme':
        $url = get_theme_file_uri();
          break;
      case 'child_theme':
        $url = get_stylesheet_directory_uri();
          break;
      case 'uploads':
        $data = wp_upload_dir( null, false, false );
        $url  = $data['url'];
          break;

      case 'login':
        $url = wp_login_url(
          isset( $atts['redirect'] ) ? $atts['redirect'] :
            ( is_multisite() ? get_site_url() : site_url() )
        );
          break;
      case 'logout':
        $url = wp_logout_url(
          isset( $atts['redirect'] ) ? $atts['redirect'] :
            ( is_multisite() ? get_site_url() : site_url() )
        );
          break;
      case 'register':
        $url = add_query_arg('action', 'register', wp_login_url(
          isset( $atts['redirect'] ) ? $atts['redirect'] : ''
        ));
          break;
      default:
          return '';
    }

    // URLs do not have trailing slash

    return $memory[ $name ] = untrailingslashit( $url );
  },
]);

$html->get_url = function( $name = '', $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'url', $name, $atts );
};

$html->set_url = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'url', $name, $content, $atts + [ 'raw' => true ] );
};

// Query - The part after "?" in the URL
$html->get_url_query = function( $name = '', $atts = [] ) use ( $html ) {

  $memory = &$html->variable_type_memory['url'];

  if ( isset( $memory['query'] ) ) {
    $query = $memory['query'];
  } else {
    $url             = parse_url( $_SERVER['REQUEST_URI'] );
    $query           = isset( $url['query'] ) ? $url['query'] : '';
    $memory['query'] = $query;
  }

  if ( empty( $query ) ) return '';

  if ( isset( $memory['queries'] ) ) {
    $queries = $memory['queries'];
  } else {
    // Create array from query string
    parse_str( htmlspecialchars_decode( $query ), $queries );
    $memory['queries'] = $queries;
  }

  // Include/exclude keys

  if ( isset( $atts['include'] ) ) {
    $keys     = format\multiple_values($atts['include']);
    $included = [];
    foreach ( $keys as $key ) {
      if (isset( $queries[ $key ] )) $included[ $key ] = $queries[ $key ];
    }
    $queries = $included;
  }

  if ( isset( $atts['exclude'] ) ) {
    $keys = format\multiple_values($atts['exclude']);
    foreach ( $keys as $key ) {
      if (isset( $queries[ $key ] )) unset( $queries[ $key ] );
    }
  }

  if ( empty( $name ) || $name === 'query' ) {
    // All query parameters as one string
    return sanitize_text_field( http_build_query( $queries ) );
  }

  return isset( $queries[ $name ] )
    ? sanitize_text_field( $queries[ $name ] )
    : '';
};

$html->url_tag = function( $atts, $content ) use ( $html ) {

  // URL query parameter
  if ( isset( $atts['query'] )
    // <Url query=true /> returns the current URL with query string
    && $atts['query'] !== 'true'
  ) {
    $key = $atts['query'];
    unset( $atts['query'] );
    return $html->get_url_query( $key );
  }

  $key = array_shift( $atts['keys'] );

  // <Url query /> returns the whole query string with multiple keys
  if ( $key === 'query' ) {
    return $html->get_url_query( $key );
  }

  return $html->get_variable_type( 'url', $key, $atts );
};

return $html->url_tag;
