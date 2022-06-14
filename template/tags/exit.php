<?php
/**
 * Exit tag allows conditional exit from a template, like a return statement
 *
 * @see vendor/tangible/plugin-framework/modules/html/render/index.php
 * @see ./load.php where it wraps template with Catch tag
 */

$html->is_inside_catch_tag = false;

$html->catch_tag = function($atts, $nodes) use ($html) {

  $previous_value = $html->is_inside_catch_tag; // Support nested Catch tags
  $html->is_inside_catch_tag = true; // Allow Exit tag

  $content = $html->render($nodes);

  $html->is_inside_catch_tag = $previous_value; // Restore
  $html->exit_from_current_template = false; // Clear exit flag

  return $content;
};

/**
 * Exit tag sets a flag for $html->render and render_nodes to ignore the rest
 * of template. Must be inside Catch tag to ensure that the flag gets cleared.
 */
$html->exit_tag = function($atts) use ($html) {
  if ($html->is_inside_catch_tag) {
    $html->exit_from_current_template = true;
  }
};

$html->add_open_tag('Catch', $html->catch_tag);
$html->add_closed_tag('Exit', $html->exit_tag);

/**
 * Helper function to wrap $html->render to catch Exit tag
 *
 * @see tangible-blocks/includes/template/render.php, render_template_post()
 */
$html->render_with_catch_exit = function($content) use ($html) {
  return $html->catch_tag([], $content);
};
