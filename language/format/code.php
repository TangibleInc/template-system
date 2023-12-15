<?php

/**
 * Escape text for inline <code> or block <pre>
 */
$html->format_code = function( $content, $options = [] ) {
  return htmlspecialchars( $content );
};
