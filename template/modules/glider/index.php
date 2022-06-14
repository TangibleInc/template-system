<?php
/**
 * Glider - Fullscreen gallery slider
 *
 * @see vendor/tangible/interface
 */

$html->add_open_tag('Glider', function($atts, $nodes) use ($html, $interface) {

  $interface->enqueue('glider');

  // <Glider enqueue />
  if (in_array('enqueue', $atts['keys'])) return;

  return $html->render_tag('div', array_merge($atts, [
    'class' => 'tangible-glider' . (isset($atts['class']) ? ' '.$atts['class'] : ''),
  ]), $nodes);
});

$html->add_open_tag('Glide', function($atts, $nodes) use ($html, $interface) {

  // TODO: Image linked to thumbnail

  return $html->render_tag('a', $atts, $nodes);
});
