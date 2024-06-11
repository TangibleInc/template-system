<?php
namespace tangible\html;
use tangible\html;

/**
 * Raw tags have *unparsed* content.
 */

$html->raw_tags = [];

function is_raw_tag( $tag ) {
  return isset( html::$state->raw_tags[ $tag ] );
};

function add_raw_tag( $tag, $callback, $options = [] ) {

  $html = &html::$state;
  html\add_open_tag( $tag, $callback, [ 'raw' => true ] + $options );

  if ( ! isset( $html->raw_tags[ $tag ] ) ) {
    $html->raw_tags[ $tag ] = true;
  }
};

function get_all_raw_tag_names() {
  return array_keys( html::$state->raw_tags );
}
