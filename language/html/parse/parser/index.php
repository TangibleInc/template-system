<?php
namespace Tangible\Html;

/**
 * Parser is based on a fork of [Ganon](http://code.google.com/p/ganon/)
 * by Niels A.D., [Artistic License](http://dev.perl.org/licenses/artistic.html).
 *
 * Its advantages are: fast parsing, queryable nodes, and extensible syntax,
 * such a case-sensitive tag names, and determinate order of attributes without value.
 */

return function( $str ) use ( $html ) {
  static $parser;

  if ( ! $parser ) {

    require_once __DIR__ . '/tokenizer.php';
    require_once __DIR__ . '/node.php';
    require_once __DIR__ . '/parser.php';

    $parser = new HTML_Parser_HTML5;

    foreach ( $html->raw_tags as $tag => $_ ) {
      $parser->tag_map[ $tag ] = 'parse_raw';
    }
  }

  return $parser->parse( $str );
};
