<?php
/**
 * HyperDB integration
 *
 * @see https://wordpress.org/plugins/hyperdb/
 * @see https://github.com/Automattic/HyperDB
 */

$html->add_open_tag('HyperDB', function( $atts, $nodes ) use ( $html ) {

  // Render normally if HyperDB is not active
  if ( ! class_exists( 'hyperdb' )) return $html->render( $nodes );

  if ( isset( $atts['dataset'] ) ) {

    // Force read from specified database node

    if ( ! class_exists( 'HyperDB_Force_Dataset' ) ) {
      require_once __DIR__ . '/hyperdb-force-dataset.php';
    }

    HyperDB_Force_Dataset::force( $atts['dataset'] );

    $content = $html->render( $nodes );

    HyperDB_Force_Dataset::reset();

    return $content;
  }

  // Add other HyperDB features here

  return $html->render( $nodes );
});
