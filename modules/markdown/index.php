<?php
use tangible\markdown;

require_once __DIR__ . '/tag.php';

$html->markdown = function( $content = '', $options = [] ) use ( $html ) {

  static $markdown;

  if ( ! $markdown ) {
    $markdown = $html->create_markdown_instance();
    $markdown->setClosedTags(
      $html->get_all_closed_tag_names()
    );
  }

  return $markdown->text( $content );
};

$html->create_markdown_instance = function( $options = [] ) use ( $html ) {
  return markdown\create_compiler();
};
