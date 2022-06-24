<?php

$html->split_nodes_at_tag = function( $nodes, $tag ) {

  $before_nodes = [];
  $after_nodes  = [];

  $found_node = false;
  foreach ( $nodes as $node ) {

    if ( ! $found_node && isset( $node['tag'] ) && $node['tag'] === $tag ) {

      $found_node = $node;

      // Move tag children to after
      if ( ! empty( $found_node['children'] ) ) {
        foreach ( $found_node['children'] as $child_node ) {
          $after_nodes [] = $child_node;
        }
        $found_node['children'] = [];
      }
      continue;
    }

    if ( ! $found_node) $before_nodes [] = $node;
    else $after_nodes []                 = $node;
  }

  return [
    'node'   => $found_node,
    'before' => $before_nodes,
    'after'  => $after_nodes,
  ];
};
