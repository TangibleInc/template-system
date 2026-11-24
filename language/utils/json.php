<?php

/**
 * Encode the following characters, to prevent rendering of HTML or inline JS:
 * - < > as \u003C \u003E
 * - & as \u0026
 * - ' as \u0027
 * - " as \u0022
 *
 * Some flags might be redundant, as we already apply esc_attr
 *
 * The encoding won't be visible to users as it's reversed when the
 * value is parsed, unless a template displays non-scalar value directly
 *
 * @see wp_json_encode() wp-includes/functions.php
 */
$html->json_encode_escape_tags = function( $value ) {
  return wp_json_encode( $value, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT );
};
