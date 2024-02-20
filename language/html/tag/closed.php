<?php
namespace tangible\html;
use tangible\html;

/**
 * Closed tags have no content, and use "/>" to close itself.
 *
 * For fast checking during render, it's a map of tag name => true
 */
$html->closed_tags = array_reduce([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
], function( $tags, $tag ) {
  $tags[ $tag ] = true;
  return $tags;
}, []);

function is_closed_tag( $tag ) {
  $html = html::$state;
  return isset( $html->closed_tags[ $tag ] );
}

function add_closed_tag( $tag, $callback, $options = [] ) {

  $html = html::$state;

  html\add_open_tag( $tag, $callback, $options + [ 'closed' => true ] );

  if ( ! isset( $html->closed_tags[ $tag ] ) ) {
    $html->closed_tags[ $tag ] = true;
  }
}

function get_all_closed_tag_names() {

  $html = html::$state;

  $closed_tags = [];

  foreach ( $html->tags as $tag => $tag_config ) {
    if ( isset( $tag_config['closed'] ) && $tag_config['closed'] ) {
      $closed_tags [] = $tag;
    } elseif ( $tag_config['local_tags'] ) {
      foreach ( $tag_config['local_tags'] as $local_tag => $local_tag_config ) {
        if ( isset( $local_tag_config['closed'] ) && $local_tag_config['closed'] ) {
          $closed_tags [] = $local_tag;
        }
      }
    }
  }

  return $closed_tags;
};
