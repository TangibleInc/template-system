<?php

/**
 * Format HTML attribute
 */
$html->format_html_attribute = function( $content, $options = [] ) {
  // @see https://developer.wordpress.org/reference/functions/esc_attr/
  return esc_attr($content);
};

/**
 * Format HTML entities
 */
$html->format_html_entities = function( $content, $options = [] ) {
  return htmlentities($content);
};
