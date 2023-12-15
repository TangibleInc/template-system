<?php

/**
 * Get relative URL from Tangible Views template
 */
$html->get_views_relative_url = function( $asset ) use ( $html ) {

  /**
   * Get current path from context
   */
  $current_path = $html->get_current_context( 'path' );

  // Templates' root path
  $root_path = $html->get_current_context( 'views_root_path' );

  $is_external_url = substr( $asset, 0, 2 ) === '//'
    || strpos( $asset, '://' ) !== false;

  if ( $is_external_url
    || strpos( $asset, ABSPATH ) === 0 // Absolute path within site
    || preg_match( '#^[a-zA-Z]:\\\\#', $asset ) // Absolute path on Windows
  ) {

    // Unchanged

  } elseif ( $asset[0] === '/' ) {

    // From views root path
    $asset = untrailingslashit( $root_path ) . $asset;

  } elseif ( ! empty( $current_path ) ) {

    // Relative path
    $asset = trailingslashit( $current_path ) . $asset;
  }

  return str_replace( ABSPATH, trailingslashit( site_url() ), $asset );
};
