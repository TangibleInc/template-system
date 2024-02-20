<?php
namespace tangible\html;
use tangible\html;

require_once __DIR__ . '/node.php';

html::$state->parser = require_once __DIR__ . '/parser/index.php';

function parse( $content, $options = [] ) {

  if (empty( $content ) && $content !== '0') return [];

  $tree        = [];
  $parser      = html::$state->parser;

  try {
    $tree = $parser( $content );
  } catch ( \Exception $error ) {
    trigger_error( $error->getMessage(), E_USER_WARNING );
    return [];
  }

  if (empty( $tree )) return [];

  return html\parse_nodes( $tree, $options );
}

/**
 * Remove limit for maximum nesting level
 *
 * @see https://stackoverflow.com/questions/4293775/increasing-nesting-function-calls-limit
 */
ini_set( 'xdebug.max_nesting_level', -1 );
