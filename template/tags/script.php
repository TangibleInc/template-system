<?php

$html->script_types = [
  // type => function( $atts, $content )
];

$html->register_script_type = function( $type, $callback ) use ( $html ) {
  $html->script_types[ $type ] = $callback;
};

/**
 * For script files - filter src attribute similarly to "link" tag, but root and current routes
 * are based on views folder. It enqueues in wp_footer.
 */
$html->script_tag = function( $atts, $content ) use ( $html ) {

  if (isset($atts['render'])) {
    unset($atts['render']);
  }

  if (isset($atts['type']) && $atts['type']!=='text/javascript') {
    return $html->render_raw_tag('script', $atts, $content);
  }

  if ( isset( $atts['src'] ) ) {

    $views_root_path = $html->get_current_context( 'views_root_path' );

    $current_route = str_replace( $views_root_path, '', $html->get_current_context( 'path' ) );
    $base_url      = str_replace( ABSPATH, trailingslashit( site_url() ), $views_root_path );

    $atts['src'] = $html->absolute_or_relative_url(
      $html->render_attribute_value( 'src', $atts['src'] ),
      $current_route,
      $base_url
    );

    $html->enqueue_script_file( $atts['src'] );
    return;
  }

  if ( isset( $atts['type'] ) && isset( $html->script_types[ $atts['type'] ] ) ) {
    $content = $html->script_types[ $atts['type'] ]( $content );
  }

  if (empty( trim( $content ) )) return;

  // Consolidate inline scripts
  $html->enqueue_inline_script( $content );
};

return $html->script_tag;
