<?php

namespace Tangible\HTML;

require_once __DIR__ . '/node.php';

$html->parser = require_once __DIR__ . '/parser/index.php';

$html->parse = function( $content, $options = [] ) use ( $html ) {

  if (empty( $content ) && $content !== '0') return [];

  $tree        = [];
  $parser      = $html->parser;
  $parse_nodes = $html->parse_nodes;

  try {
    $tree = $parser( $content );
  } catch ( \Exception $error ) {
    trigger_error( $error->getMessage(), E_USER_WARNING );
    return [];
  }

  if (empty( $tree )) return [];

  return $parse_nodes( $tree, $options );
};

/**
 * Remove limit for maximum nesting level
 *
 * @see https://stackoverflow.com/questions/4293775/increasing-nesting-function-calls-limit
 */
ini_set( 'xdebug.max_nesting_level', -1 );
