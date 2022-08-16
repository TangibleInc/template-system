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

$_post  = get_post( $template_id );

$fields = $plugin->get_template_fields( $_post );
$content = $plugin->render_template_post( $_post );

get_header( $fields['theme_header'] );

echo $content;

get_footer( $fields['theme_footer'] );
