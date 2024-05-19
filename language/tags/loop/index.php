<?php
/**
 * Loop tag
 */
require_once __DIR__.'/context.php';
require_once __DIR__.'/exists.php';

require_once __DIR__.'/loop-variable.php';
require_once __DIR__.'/query-variable.php';
require_once __DIR__.'/variables.php';

$html->loop_tag = function($atts, $nodes = []) use ($loop, $html) {

  $is_paginator_request = isset($atts['paginator']); // Inside AJAX request handler

  /**
   * <Loop logic=x> converts to: <Loop><If logic=x>...</If></Loop>
   */
  if (isset($atts['logic'])) {
    $nodes = [
      [
        'tag' => 'If',
        'attributes' => [
          'logic' => $atts['logic']
        ],
        'children' => $nodes
      ]
    ];
    unset($atts['logic']);
  }

  if (!$is_paginator_request && isset($atts['query'])) {

    // Query variable: Reuse loop instance

    $current_loop = $html->get_query_variable($atts['query']);
    unset($atts['query']);

    if (!empty($current_loop)) {
      $current_loop->reset();
    }

  } else {
    $current_loop = $html->create_loop_tag_context($atts);
  }

  if (isset($atts['instance'])) {
    return empty($current_loop) ? $loop('list', []) : $current_loop;
  }

  /**
   * Only return early if no loop context was created; otherwise, it's
   * important to call $current_loop->loop() below even if the loop has no
   * item, so that the previous loop total is correctly set to 0.
   */
  if (empty($current_loop)) return;

  /**
   * Handle variables used in the template - see ./paginate/variables.php
   */

  $has_pagination = $current_loop->has_next()
    && isset( $current_loop->args['paged'] )
    && $current_loop->args['paged'] > 0
  ;

  if ($has_pagination) {
    if (!$is_paginator_request) {

      // Initial render: Extract variables
      $atts['variable_types'] = $html->get_variable_types_from_template($nodes);

    } elseif (isset($atts['variable_types'])) {

      // Pass variables from paginator request to template
      $html->set_variable_types_from_template( $atts['variable_types'] );
    }
  }

  // Render content

  $result = '';
  $current_loop->loop(function() use ($html, &$result, &$nodes) {
    // Remove first newline(s) after opening <Loop>
    $result .= ltrim($html->render($nodes), "\n");
  });

  /**
   * Pagination markup - Skip when inside paginator request
   * @see /modules/pager
   */
  if ($has_pagination && !$is_paginator_request) {
    return $html->paginated_loop_tag( $current_loop, $atts, $nodes, $result );
  }

  return $result;
};

return $html->loop_tag;
