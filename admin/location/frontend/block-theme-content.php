<?php
/**
 * Support block themes
 *
 * @see /wp-includes/block-template.php, get_the_block_template_html()
 * @see /wp-includes/template-canvas.php - Default header/footer for block themes
 */

// Default block template - HTML must be generated before wp_head()
// $content = get_the_block_template_html();

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta http-equiv="Content-Type" content="<?php bloginfo( 'html_type' ); ?>; charset=<?php bloginfo( 'charset' ); ?>" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php

$default_viewport = 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover';
$default_title    = wp_get_document_title();

// Allow user override

$html = tangible_template();
$html->schedule_meta( 'viewport', $default_viewport );
$html->schedule_meta( 'title', $default_title, false );

wp_head();

?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="wp-site-blocks">
<?php

block_template_part( ! empty( $theme_header ) ? $theme_header : 'header' );

echo $content;

block_template_part( ! empty( $theme_footer ) ? $theme_footer : 'footer' );

?>
</div>
<?php wp_footer(); ?>
</body>
</html>
