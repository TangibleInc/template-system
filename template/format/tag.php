<?php

$html->format_tag = function( $atts, $content ) use ( $html ) {

  /**
   * See ../format for all format functions
   *
   * case, code, date, html_attribute, html_entities, number, length, slug, url_query
   */
  $type = $atts['type'] ?? '';

  if ( empty( $type ) ) {

    // These attributes with value have same format type as its name

    foreach ( [
      'case',
      'date',

      // List/string functions
      'index', 'length', 'offset',
      'split', 'join',

      'replace',
      // Regular expression
      'replace_pattern', 'match',

      // Start/end slash
      'start_slash', 'end_slash',

      'prefix', 'suffix',

      /**
       * Trim is last because it can be standalone or combined with above
       * attributes like "split"
       */
      'trim',
      'trim_left',
      'trim_right',

    ] as $check_type ) {
      if ( ! isset( $atts[ $check_type ] )) continue;
      $type = $check_type;
      break;
    }
  }

  $first_key = !empty($atts['keys']) ? $atts['keys'][0] : '';

  if (empty($type)) {

    $type = $first_key;
    array_shift($atts['keys']);

    if (in_array($type, ['trim', 'trim_left', 'trim_right'])) {
      $options[ $type ] = true;
    }

  } elseif ($first_key==='list') {
    // Format list ..
    $options['list'] = true;
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
        $content = $html->hjson()->parse( $content );
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
    if (is_array($content) && !in_array($type, [
      'index', 'length', 'offset', 'join',
    ])) {

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
  'skip_render_keys' => ['with', 'with_2', 'with_3'],
]);
