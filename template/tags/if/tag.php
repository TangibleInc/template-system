<?php

/**
 * The <if> tag provides an interface to the Logic module, whose rules are extended
 * by other modules or plugins.
 *
 * Example: <if field="this" is_not value="that">
 */
$html->if_tag = function( $atts, $nodes = [] ) use ( $loop, $logic, $html ) {

  /**
   * If loop exists (has any item)
   *
   * Example: <If loop exists type=post>
   */
  if ( isset( $atts['keys'] ) && isset( $atts['keys'][0] ) ) {

    // If not loop exists
    $not = $atts['keys'][0] === 'not';

    if ($not) array_shift( $atts['keys'] );

    if ( isset( $atts['keys'][0] ) && $atts['keys'][0] === 'loop' ) {

      array_shift( $atts['keys'] ); // Remove "loop"

      // "exists" is optional
      if ( isset( $atts['keys'][0] ) && $atts['keys'][0] === 'exists' ) {
        array_shift( $atts['keys'] ); // Remove "exists"
      }

      if ($not) array_unshift( $atts['keys'], 'not' ); // Put back "not"

      return $html->if_loop_exists( $atts, $nodes );
    }

    // Condition other than loop exists

    if ($not) array_unshift( $atts['keys'], 'not' ); // Put back "not"
  }

  // Evaluate condition

  $condition = $html->evaluate_if_tag_attributes( $atts );

  // Render true or false branch

  $branches = $html->get_true_false_branches( $nodes );

  return $html->render( $condition ? $branches['true'] : $branches['false'] );
};

/**
 * Split nodes into true/false branches
 */
$html->get_true_false_branches = function( $nodes, $else_tag = 'Else' ) use ( $html ) {

  $split = $html->split_nodes_at_tag( $nodes, $else_tag );

  $else_node    = $split['node'] ? : [];
  $true_branch  = $split['before'];
  $false_branch = $split['after'];

  if ( empty( $else_node['attributes'] ) ) {
    $else_node['attributes'] = [ 'keys' => [] ];
  }

  /**
   * Support "else if" - Wrap following nodes in if condition.
   * If further "else" tags exist, they will be handled by the new if statement.
   */

  $else_if = ! empty( $else_node );

  if ( $else_if
    && isset( $else_node['attributes']['keys'][0] )
    && $else_node['attributes']['keys'][0] === 'if' ) {

    // <Else if .. />
    array_shift( $else_node['attributes']['keys'] ); // Remove "if" attribute

  } elseif ( $else_if
    && (
      // <Else key />
      count( $else_node['attributes']['keys'] ) > 0

      // <Else key="value" />
      || ( count( array_keys( $else_node['attributes'] ) ) > 1 )
    )
  ) {
    // OK
  } else {
    // <Else />
    $else_if = false;
  }

  if ( $else_if ) {

    $else_node['tag']      = 'If';
    $else_node['children'] = $false_branch;

    $false_branch = [ $else_node ]; // A branch is an array of nodes
  }

  // tgbl()->see('if', 'true', $true_branch, 'false', $false_branch);

  return [
    'true'  => $true_branch,
    'false' => $false_branch,
  ];
};
