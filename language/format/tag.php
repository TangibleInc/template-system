<?php

use tangible\hjson;

$html->list_format_types = [
  'index',
  'length',
  'offset',
  'join',
  'reverse'
];

$html->format_types_without_value = [
  'trim',
  'trim_left',
  'trim_right',
  'reverse'
];


$html->format_type_attributes_with_value = [
  'case',
  'date',

  // List/string functions
  'index', 'length', 'offset', 'count',
  'split', 'join',
  'words',

  'replace',
  // Regular expression
  'replace_pattern', 'match_pattern',

  'start_slash', 'end_slash',
  'prefix', 'suffix',


  /**
   * Trim is last because it can be standalone or combined with above
   * attributes like "split"
   */
  'trim',
  'trim_left',
  'trim_right',

];

$html->format_tag = function( $atts, $content ) use ( $html ) {

  /**
   * See ../format for all format functions
   *
   * case, code, date, html_attribute, html_entities, number, length, slug, url_query
   */
  $type = $atts['type'] ?? '';

  if ( empty( $type ) ) {

    // These attributes with value have same format type as its name

    foreach ( $html->format_type_attributes_with_value as $check_type ) {
      if ( ! isset( $atts[ $check_type ] )) continue;
      $type = $check_type;
      break;
    }
  }

  $first_key = !empty($atts['keys']) ? $atts['keys'][0] : '';

  if ($first_key==='list') {

    // Format list ..
    $options['list'] = true;

    array_shift($atts['keys']);
    $first_key = $atts['keys'][0] ?? '';
  }

  if (empty($type)) {

    $type = $first_key;
    array_shift($atts['keys']);

    /**
     * These format types have no value, like: <Format trim>
     */
    if (in_array($type, $html->format_types_without_value)) {
      $options[ $type ] = true;
    }
  }

  $content = $html->render( $content );

  if ($type==='join') {
    // For join, the default expected value is list
    $options['list'] = $options['list'] ?? true;
  }

  /**
   * Format list
   */
  if (isset($options['list'])) {

    if ($options['list']===true || $options['list']==='true') {

      // JSON

      try {
        $content = hjson\parse( $content );
      } catch (\Throwable $th) {
        $content = [];
      }
    } else {

      // Get list by name

      $content = $html->get_list($options['list']);
      if (empty($content)) $content = [];
    }

    /**
     * For format types that *do not* expect a list, apply
     * to every item in the list and return new list.
     */
    if (is_array($content) && !in_array($type, $html->list_format_types)) {

      // Apply format to each item in the list

      unset($atts['list']);
      if (!empty($atts['keys']) && $atts['keys'][0]==='list') {
        array_shift($atts['keys']);
      }

      $new_list = [];
      foreach ($content as $item) {
        $new_list []= trim( $html->format_tag( $atts, $item ) );
      }

      return $new_list;
    }
  }

  if (empty( $type )) return $content;

  return $html->format( $type, $content, $atts );
};

$html->add_open_tag( 'Format', $html->format_tag, [
  /**
   * These attributes are skipped from rendering dynamic tags inside
   * @see ../html/parse
   */
  'skip_render_keys' => [
    'replace_pattern', 'replace_pattern_2', 'replace_pattern_3', 
    'with', 'with_2', 'with_3'
  ],
]);
