<?php

$html->format_tag = function($atts, $content) use ($html) {

  /**
   * See ../format for all format functions
   *
   * case, code, date, html_attribute, html_entities, number, length, slug, url_query
   */

  $type = isset($atts['type']) ? $atts['type'] : array_shift($atts['keys']);

  if (empty($type)) {
    // These attributes with value have same format type as its name
    foreach ([
      'case',
      'date',
      'length',
      'replace'
    ] as $check_type) {
      if (!isset($atts[ $check_type ])) continue;
      $type = $check_type;
      break;
    }
  }

  $content = $html->render($content);

  if (empty($type)) return $content;

  return $html->format($type, $content, $atts);
};

return $html->format_tag;
