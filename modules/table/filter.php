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

  $html->table_collect_filters( $nodes );

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

/**
 * If a table tag contains a filter, the name of the filterable attributes
 * and the allowed values need to be passed to the JS
 *
 * @see createTableRequest() modules/table/dynamic-table/index.ts
 *
 * We store both values in $html->current_table['filter_loop_options'] and
 * $html->current_table['filter_loop_keys'], which are then readable client side
 * from data-tangible-table-config
 *
 * @see $html->table_tag() in modules/table/index.php
 */
$html->table_collect_filters = function( $nodes ) use ( $html ) {

  foreach ( $nodes as $node ) {

    $tag = $node['tag'] ?? '';
    if ( $tag === '' ) continue;

    if ( $tag !== 'select' && $tag !== 'input' ) {
      $html->table_collect_filters( $node['children'] ?? [] );
      continue;
    }

    $attributes = $node['attributes'] ?? [];
    $action = $attributes['action'] ?? (
      $tag === 'select' && isset( $attributes['column'] ) ? 'column' : 'loop'
    );

    if ( $action !== 'loop' || ! isset( $attributes['name'] ) ) continue;

    $name = $attributes['name'];
    $html->current_table['filter_loop_keys'][] = $name;

    // A text input has no fixed set, so its value stays unrestricted
    if ( $tag !== 'select' ) continue;

    $options = [];
    foreach ( $node['children'] ?? [] as $child ) {
      if ( ( $child['tag'] ?? '' ) === 'option' && isset( $child['attributes']['value'] ) ) {
        $options[] = $child['attributes']['value'];
      }
    }

    $html->current_table['filter_loop_options'][ $name ] = $options;
  }
};
