<?php

/**
 * <If loop exists> - Check if loop has any items
 *
 * Inside, <Loop> will loop through items, and <Else> will run when
 * there are no items.
 *
 * This can be used to wrap the loop if anything exists.
 */
$html->loop_exists_contexts = [];

$html->get_loop_exists_context = function() use ($html) {

  $contexts = &$html->loop_exists_contexts;
  $count = count( $contexts );
  if ($count===0 || !isset($contexts[ $count - 1 ])) return false;

  return $contexts[ $count - 1 ];
};

$html->with_loop_exists_context = function($context, $fn) use ($html, $loop) {

  $contexts = &$html->loop_exists_contexts;
  $contexts []= $context;

  $result = $fn( $context );

  // Restore
  array_pop( $contexts );

  // tgbl()->see('exists after', $loop->current_context);

  return $result;
};

$html->if_loop_exists = function($atts, $nodes) use ($html, $loop) {

  $branches = $html->get_true_false_branches($nodes);

  $not = isset($atts['keys']) && isset($atts['keys'][0]) && $atts['keys'][0]==='not';

  if ($not) {

    // Not exists

    array_shift($atts['keys']); // Remove "not"

    // Flip true/false
    $true_branch = $branches['true'];
    $branches['true'] = $branches['false'];
    $branches['false'] = $true_branch;
  }

  $current_loop = $html->create_loop_tag_context($atts);

  // Empty loop
  if ( !$current_loop || !$current_loop->has_next() ) {
    return $html->render($branches['false']);
  }

  return $html->with_loop_exists_context($current_loop, function() use ($html, $branches) {
    return $html->render($branches['true']);
  });
};
