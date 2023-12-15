<?php

/**
 * Format HTML attribute
 * @see https://developer.wordpress.org/reference/functions/esc_attr/
 */
$html->format_html_attribute = function( $content, $options = [] ) {
  return esc_attr( $content );
};

/**
 * Format HTML entities
 * @see https://www.php.net/manual/en/function.htmlentities.php
 */
$html->format_html_entities = function( $content, $options = [] ) {
  return htmlentities( $content );
};

/**
 * Remove HTML
 * @see https://developer.wordpress.org/reference/functions/wp_strip_all_tags/
 */
$html->format_remove_html = function( $content, $options = [] ) {
  return wp_strip_all_tags( $content );
};
