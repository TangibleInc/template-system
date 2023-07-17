<?php
/**
 * Uniform interface for formatting methods
 */
$html->format = function( $type, $content, $options = [] ) use ( $html ) {

  $format_name = "format_{$type}";

  if ( ! isset( $html->$format_name )) return $content;

  return $html->$format_name( $content, $options );
};

require_once __DIR__ . '/case.php';
require_once __DIR__ . '/code.php';
require_once __DIR__ . '/date.php';
require_once __DIR__ . '/embed.php';
require_once __DIR__ . '/html.php';
require_once __DIR__ . '/list.php';
require_once __DIR__ . '/number.php';
require_once __DIR__ . '/pattern.php';
require_once __DIR__ . '/text.php';

// Format tag
require_once __DIR__ . '/tag.php';
