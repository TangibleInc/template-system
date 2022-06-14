<?php
/**
 * Async tag renders its inner template via AJAX after page load
 */

$html->register_async_render = function() use ($html) {
  wp_register_script(
    'tangible-async-render',
    $html->url . 'assets/build/async-render.min.js',
    ['jquery', 'tangible-ajax'],
    $html->version
  );
};

$html->enqueue_async_render = function() use ($html) {

  tangible()->ajax()->enqueue();

  $html->register_async_render();

  wp_enqueue_script('tangible-async-render');
};

$html->async_tag = function($atts, $nodes) use ($html) {

  $html->enqueue_async_render();

  $template = $html->render_raw($nodes);
  $post_id = get_the_ID();
  if ($post_id===false) $post_id = 0; // Important for JSON en/decode and verify hash
  $context = [
    // @see /tags/loop/variables.php
    'variable_types' => $html->get_variable_types_from_template($nodes),
    'current_post_id' => $post_id
  ];

  return $html->render_raw_tag('div', [
    'class' => 'tangible-async-render',
    'data-template-data' => json_encode([
      'template' => $template,
      'hash'     => $html->create_tag_attributes_hash($template),
      'context'  => $context,
      'context_hash' => $html->create_tag_attributes_hash( $context ),
    ]),
  ], []);
};

return $html->async_tag;
