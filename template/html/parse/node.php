<?php

$html->parse_nodes = function($nodes, $options = []) use ($html) {

  $parse_tag = $html->parse_tag;

  $parsed_nodes = [];

  foreach ($nodes as $node) {

    $parsed =
      // Text node
      ($node->isText() ? [ 'text' => $node->text ]
        // Comment
        : ($node->isComment() ? [ 'comment' => $node->text ]
          // Tag
          : ($node->isRegularTag() ? $parse_tag($node, $options)
            // Special tags or unknown
            : [ 'raw' => @$node->toString() ]
          )
        )
      )
    ;

    $parsed_nodes []= $parsed;
  }

  return $parsed_nodes;
};

$html->parse_tag = function($node, $options = []) use ($html) {

  $parse_nodes = $html->parse_nodes;
  $is_raw_tag = $html->is_raw_tag;

  $tag = $node->tag;

  $parsed_node = [
    'tag' => $tag,
    'attributes' => [
      'keys' => [],
    ],
    'children' => []
  ];

  // Attributes

  foreach ($node->attributes as $name => $value) {

    /**
     * Attributes without value are stored as keys, in the order they appear.
     * The attribute "keys" is explicitly skipped in render_attributes().
     */
    if ($name==='keys') {
      foreach ($value as $val) {
        $parsed_node['attributes']['keys'] []= $val;
      }
      continue;
    }

    /**
     * Support passing empty string as attribute value: attr=''
     * Previously, empty string was considered the same as attribute without value.
     */
    /*if ($value === '') {
      $parsed_node['attributes']['keys'][] = $name;
      continue;
    }*/

    $parsed_node['attributes'][ $name ] = $value;
  }

  // Children

  if (!empty($node->children)) {
    $parsed_node['children'] = $parse_nodes(
      $node->children,
      [
        'preprocess' => ! $is_raw_tag( $parsed_node['tag'] )
      ] + $options
    );
  }

  return $parsed_node;
};
