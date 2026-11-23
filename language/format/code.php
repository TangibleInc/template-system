<?php

/**
 * Escape text for inline <code> or block <pre>
 *
 * Flags are explicitly set to the PHP 8.1 default value to have consistent
 * output in older versions
 *
 * @see https://www.php.net/manual/function.htmlspecialchars.php#refsect1-function.htmlspecialchars-changelog
 */
$html->format_code = function( $content, $options = [] ) {
  return htmlspecialchars( $content, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML401 );
};
