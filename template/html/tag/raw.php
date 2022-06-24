<?php

/**
 * Raw tags have *unparsed* content.
 */

$html->raw_tags = [];

$html->is_raw_tag = function($tag) use ($html) {
  return isset($html->raw_tags[ $tag ]);
};

$html->add_raw_tag = function($tag, $callback, $options =[]) use ($html) {

  $html->add_open_tag($tag, $callback, [ 'raw' => true ] + $options);

  if ( ! isset($html->raw_tags[ $tag ]) ) {
    $html->raw_tags[ $tag ] = true;
  }
};
