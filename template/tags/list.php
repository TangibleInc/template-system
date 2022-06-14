<?php

// List, Item

$html->register_variable_type('list', [
  'set' => function($name, $atts, $content, &$memory) use ($html) {
    if (!is_string($name)) return;
    $memory[ $name ] = isset($atts['raw']) ? $content : $html->render( $content );
  },
  'get' => function($name, $atts, &$memory) use ($html) {
    if (isset($memory[ $name ])) return $memory[ $name ];
    return [];
  },
]);

$html->get_list = function($name = '', $atts = []) use ($html) {
  return $html->get_variable_type('list', $name, $atts);
};

$html->set_list = function($name, $content, $atts = []) use ($html) {
  return $html->set_variable_type('list', $name, $content, $atts + [ 'raw' => true ]);
};

$html->current_list = [];
$html->previous_lists = [];

$html->list_item_tag = function($atts, $nodes) use ($html) {

  // If value given, it should already be string and will not be rendered
  if (isset($atts['value'])) $nodes = $atts['value'];

  if (isset($atts['type'])) {

    // Anonymous list or map appends to current list

    if ($atts['type']==='list') {
      $html->render_tag('List', [], $nodes);
      return;
    } elseif ($atts['type']==='map') {
      $html->render_tag('Map', [], $nodes);
      return;
    }
  }

  $html->current_list []= $html->render( $nodes );
};

$html->list_tag = function($atts, $nodes) use ($html) {

  if (isset($atts['name'])) {
    $name = $atts['name'];
  } else {
    $name = array_shift( $atts['keys'] );
  }

  // Create list

  $is_inside_list = !empty($html->previous_lists);
  $is_inside_map  = !empty($html->previous_maps);

  $html->previous_lists []= $html->current_list;
  $html->current_list = [];

  if (isset($atts['load'])) {

    // From external file

    $json = $html->load_content_tag([
      'file' => $atts['load'],
      'array' => true,
    ]+$atts);

    if (is_array($json)) {
      $html->current_list = $json;
    }

  } elseif (isset($atts['json']) || in_array('json', $atts['keys'])) {

    $content = trim($html->render( $nodes ));

    if (!empty($content)) {
      $json = $html->hjson($content);
      if (is_array($json)) {
        $html->current_list = $json;
      }
    }

  } else {
    // Defined by Item tags
    $html->render( $nodes );
  }

  if ( ! empty($name) ) {

    if (isset($atts['keys']) && in_array('push', $atts['keys'])) {
      // Push to existing array, if any
      $prev_list = $html->get_list($name);
      $html->current_list = array_merge(
        $prev_list,
        $html->current_list
      );
    }

    // If inside parent map, set as key
    if ($is_inside_map) {

      $html->current_map[ $name ] = $html->current_list;

    } else {
      // List variable type
      $html->set_list($name, $html->current_list);
    }

    // Restore previous
    $html->current_list = array_pop( $html->previous_lists );
    return;
  }

  // Anonymous list

  $list = $html->current_list;

  // Restore previous
  $html->current_list = array_pop( $html->previous_lists );

  // If inside parent list, append
  if ($is_inside_list) {
    $html->current_list []= $list;
    return;
  }

  // Support passing to other tags
  return json_encode((array) $list);
};

$html->add_open_tag('List', $html->list_tag, [
  'local_tags' => [
    'Item' => $html->list_item_tag
  ],
]);
