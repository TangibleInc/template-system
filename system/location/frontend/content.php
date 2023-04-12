<?php
/**
 * Render template on frontend
 *
 * When there's a matching template for current theme location, this overrides the theme.
 *
 * Loaded by "template_include" filter in ./include.php
 */

$plugin = tangible_template_system();

$template_id = $plugin->layout_template_for_current_location;

$_post = get_post( $template_id );

$fields  = $plugin->get_template_fields( $_post );
$content = $plugin->render_template_post( $_post );

$theme_header = $fields['theme_header'];
$theme_footer = $fields['theme_footer'];

// Block theme - From WP 5.9
if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
  require_once __DIR__ . '/block-theme-content.php';
  return;
}

get_header( $theme_header );

echo $content;

get_footer( $theme_footer );
