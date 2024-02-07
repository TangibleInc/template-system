<?php
use tangible\format;

$html->table_filter_tag = function($atts, $nodes) use ($html) {

  if (isset($atts['name'])) {
    // Associate tables of this name
    $atts['data-tangible-table-filter-target'] = $atts['name'];
    unset($atts['name']);
  }

  $class_name = 'tangible-table-filter-form';

  if (isset($atts['class'])) {
    $class_name .= ' '.$atts['class'];
    unset($loop_atts['class']);
  }

  $atts['class'] = $class_name;
  $atts['autocomplate'] = 'off';

  add_filter('tangible_template_render_attributes', $html->table_filter_tag_attributes_filter, 10, 1);

  $content = $html->render_raw_tag('form', $atts, $nodes);

  remove_filter('tangible_template_render_attributes', $html->table_filter_tag_attributes_filter, 10);

  if (isset($html->current_table['filter'])) {
    $html->current_table['filter'] = $content;
    return;
  }

  return $content;
};

$html->table_filter_tag_attributes_filter = function($atts) use ($html) {

  if (isset($atts['action'])) {

    $atts['data-tangible-table-filter-action'] = $atts['action'];
    unset($atts['action']);

    if (isset($atts['columns'])) {
      $atts['data-tangible-table-filter-columns'] = json_encode(
        format\multiple_values($atts['columns'])
      );
      unset($atts['columns']);
    }

  } else if ($html->tag_context['tag']==='select' && isset($atts['column'])) {
    $atts['name'] = $atts['column'];
    $atts['data-tangible-table-filter-action'] = 'column';
    unset($atts['column']);
  }

  return $atts;
};
