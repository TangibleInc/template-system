<?php

use tangible\hjson;

// Map, Key

$html->register_variable_type('map', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {

    $memory[ $name ] = isset( $atts['raw'] ) ? $content : $html->render( $content );
  },
  'get' => function( $name, $atts, &$memory ) use ( $html ) {
    if (isset( $memory[ $name ] )) return $memory[ $name ];
  },
]);

$html->get_map = function( $name = '', $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'map', $name, $atts );
};

$html->set_map = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'map', $name, $content, $atts + [ 'raw' => true ] );
};

$html->current_map   = [];
$html->previous_maps = [];

$html->map_key_tag = function( $atts, $nodes ) use ( $html ) {

  $key = isset( $atts['name'] ) ? $atts['name'] : array_shift( $atts['keys'] );

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

  if ( empty( $key ) ) {

    // Shortcuts: <Key list=field_name>..</Key>

    if ( isset( $atts['list'] ) ) {
      $atts['type'] = 'list';
      $key          = $atts['list'];
    } elseif ( isset( $atts['map'] ) ) {
      $atts['type'] = 'map';
      $key          = $atts['map'];
    } else {
      // Empty name
      return;
    }
  }

  if ( isset( $atts['type'] ) ) {

    // Value type - Default is 'string'

    if ( $atts['type'] === 'number' ) {
      $content                   = $html->render( $nodes );
      $html->current_map[ $key ] = floatval( $content );
      return;
    }
    if ( $atts['type'] === 'boolean' ) {
      $content                   = $html->render( $nodes );
      $html->current_map[ $key ] = $content === true || strtolower( $content ) === 'true';
      return;
    }

    // Named list or map sets key to current map

    if ( $atts['type'] === 'list' ) {
    $html->render_tag('List', [
        'name' => $key,
      ], $nodes);
      return;
    }
    if ( $atts['type'] === 'map' ) {
    $html->render_tag('Map', [
        'name' => $key,
      ], $nodes);
      return;
    }
  }

  $html->current_map[ $key ] = $html->render( $nodes );
};

$html->map_tag = function( $atts, $nodes ) use ( $html ) {

  if ( ! isset( $atts['keys'] )) $atts['keys'] = [];
  $name                                        = isset( $atts['name'] ) ? $atts['name'] : array_shift( $atts['keys'] );

  // Create map

  $ignore_parent = isset( $atts['parent'] ) && ! $atts['parent'];

  $is_inside_list = ! $ignore_parent && ! empty( $html->previous_lists );
  $is_inside_map  = ! $ignore_parent && ! empty( $html->previous_maps );

  $html->previous_maps [] = $html->current_map;
  $html->current_map      = isset( $atts['merge'] ) && ! empty( $previous = $html->get_map( $name ) )
    ? $previous
    : [];

  if ( ! empty( $name ) ) {
    $html->set_map( $name, $html->current_map );
  }

  if ( isset( $atts['load'] ) ) {

    // From external file

    $json = $html->load_content_tag([
      'file' => $atts['load'],
    ] + $atts);

    if ( is_array( $json ) ) {
      $html->current_map = $json;
    }
  } elseif ( isset( $atts['json'] ) || in_array( 'json', $atts['keys'] ) ) {

    $content = trim( $html->render( $nodes ) );

    if ( ! empty( $content ) ) {
      $json = hjson\parse( $content );
      if ( is_array( $json ) ) {
        $html->current_map = $json;
      }
    }
  } else {
    // Defined by Key and Value tags
    $html->render( $nodes );
  }

  if ( ! empty( $name ) ) {

    $map = $html->current_map;

    // Restore previous
    $html->current_map = array_pop( $html->previous_maps );

    // If inside parent map, set as key
    if ( $is_inside_map ) {

      $html->current_map[ $name ] = $map;

    } else {

      // Map variable type
      $html->set_map( $name, $map );
    }

    return;
  }

  // Anonymous map

  $map               = $html->current_map;
  $html->current_map = array_pop( $html->previous_maps );

  // If inside parent list, append
  if ( $is_inside_list ) {
    $html->current_list [] = $map;
    return;
  }

  // Support passing to other tags
  return json_encode( (object) $map );
};

$html->add_open_tag('Map', $html->map_tag, [
  'local_tags' => [
    'Key' => $html->map_key_tag,
  ],
]);
