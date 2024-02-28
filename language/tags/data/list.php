<?php
use tangible\format;
use tangible\hjson;

// List, Item

$html->register_variable_type('list', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {
    if ( ! is_string( $name )) return;
    $memory[ $name ] = isset( $atts['raw'] ) ? $content : $html->render( $content );
  },
  'get' => function( $name, $atts, &$memory ) use ( $html ) {
    if (isset( $memory[ $name ] )) return $memory[ $name ];
    return [];
  },
]);

$html->get_list = function( $name = '', $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'list', $name, $atts );
};

$html->set_list = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'list', $name, $content, $atts + [ 'raw' => true ] );
};

$html->current_list   = [];
$html->previous_lists = [];

$html->list_item_tag = function( $atts, $nodes ) use ( $html ) {

  // If value given, it should already be string and will not be rendered
  if (isset( $atts['value'] )) {
    $nodes = $atts['value'];
  } elseif (is_array($nodes)) {

    // If there's a single anonymous Map or List inside, set it directly as item

    $direct_node = false;

    foreach ($nodes as $node) {
      if (isset($node['tag']) && ($node['tag']==='List' || $node['tag']==='Map')) {
        if ($direct_node===false) {
          $direct_node = $node;
        } else {
          $direct_node = false;
          break;
        }
      }
    }

    if ($direct_node!==false) {
      $atts['type'] = strtolower($direct_node['tag']);
      $nodes = $direct_node['children'];
    }
  }

  if ( isset( $atts['type'] ) ) {

    if ( $atts['type'] === 'number' ) {
      $html->current_list [] = floatval( $html->render( $nodes ) );
      return;
    }
    if ( $atts['type'] === 'boolean' ) {
      $content = trim($html->render( $nodes ));
      $html->current_list [] = $content === true || strtolower( $content ) === 'true';
      return;
    }

    // Anonymous list or map appends to current list

    if ( $atts['type'] === 'list' ) {
      $html->render_tag( 'List', [], $nodes );
      return;
    }
    if ( $atts['type'] === 'map' ) {
      $html->render_tag( 'Map', [], $nodes );
      return;
    }
  }

  $html->current_list [] = $html->render( $nodes );
};

$html->list_tag = function( $atts, $nodes ) use ( $html, $loop ) {

  if ( isset( $atts['name'] ) ) {
    $name = $atts['name'];
  } else {
    $name = array_shift( $atts['keys'] );
  }

  // Create list

  $is_inside_list = ! empty( $html->previous_lists );
  $is_inside_map  = ! empty( $html->previous_maps );

  $html->previous_lists [] = $html->current_list;
  $html->current_list      = [];

  if ( isset( $atts['load'] ) ) {

    // From external file

    $json = $html->load_content_tag([
      'file'  => $atts['load'],
      'array' => true,
    ] + $atts);

    if ( is_array( $json ) ) {
      $html->current_list = $json;
    }
  } elseif ( isset( $atts['json'] ) || in_array( 'json', $atts['keys'] ) ) {

    $content = trim( $html->render( $nodes ) );

    if ( ! empty( $content ) ) {
      $json = hjson\parse( $content );
      if ( is_array( $json ) ) {
        $html->current_list = $json;
      }
    }

  } elseif ( isset( $atts['items'] ) ) {

    $html->current_list = format\multiple_values($atts['items']);

  } else {

    // Defined by Item tags
    $result = $html->render( $nodes );

    // Or it can return a JSON string
    if (!empty($result) && ($result = trim($result)) && $result[0]==='[') {
      $json = hjson\parse( $result );
      if ( is_array( $json ) ) {
        $html->current_list = $json;
      }
    }
  }

  if ( ! empty( $name ) ) {

    if ( isset( $atts['keys'] ) && in_array( 'push', $atts['keys'] ) ) {
      // Push to existing array, if any
      $prev_list          = $html->get_list( $name );
      $html->current_list = array_merge(
        $prev_list,
        $html->current_list
      );
    }

    // If inside parent map, set as key
    if ( $is_inside_map ) {

      $html->current_map[ $name ] = $html->current_list;

    } else {
      // List variable type
      $html->set_list( $name, $html->current_list );
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
  if ( $is_inside_list ) {
    $html->current_list [] = $list;
    return;
  }

  /**
   * Create list loop to apply offset, count, sort, filter, pagination
   */
  $list_loop = $loop->create_type('list', $list, $atts);
  $list = $list_loop->items;

  // Support passing to other tags
  return json_encode( (array) $list );
};

$html->add_open_tag('List', $html->list_tag, [
  'local_tags' => [
    'Item' => $html->list_item_tag,
  ],
]);
