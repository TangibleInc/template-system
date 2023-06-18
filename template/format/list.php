<?php
/**
 * List functions
 */

/**
 * Item by index
 */
$html->format_index = function( $content, $options = [] ) use ($html) {

  if (!isset($options['index'])) return;

  $index = (int) $options['index'];

  if (is_string($content)) {
    return mb_substr( $content, $index, 1 );
  }
  if (is_array( $content )) {
    return array_shift( array_slice($content, $index, 1) );
  }
};

/**
 * Slice a part of string or list
 */
$html->format_slice = function( $content, $options = [] ) {

  $offset = $options['offset'] ?? 0;
  $length = $options['length'] ?? $options['characters'] ?? null;

  if (is_string($content)) {
    return mb_substr( $content, $offset, $length );
  }
  if (is_array( $content )) {
    return array_slice( $content, $offset, $length );
  }
};

/**
 * Offset and length
 */
$html->format_offset = $html->format_length = $html->format_slice;

/**
 * Split string into list
 */
$html->format_split = function( $content, $options = [] ) use ($html) {

  $split = $options['split'] ?? '';

  // <Format split>
  if ($split===true || $split==='true') $split = '';

  if (is_string($content)) {

    $items = explode( $split, $content );

    if ($html->should_apply_trim_format($options)) {
      foreach ($items as $key => $value) {
        $items[ $key ] = $html->format_trim( $value, $options );
      }  
    }
    
    return $items;
  }

};

$html->should_apply_trim_format = function($options) {

  $apply_trim = false;

  foreach ([
    'trim', 'trim_left', 'trim_right'
  ] as $key) {
    if (!empty($options['keys']) && in_array($key, $options['keys'])) {
      $options[$key] = true;
    }
    if (isset($options[$key])) {
      $apply_trim = true;
      break;
    }
  }

  return $apply_trim;
};

/**
 * Join into into string
 */
$html->format_join = function( $content, $options = [] ) {

  $join = $options['join'] ?? '';

  // <Format join>
  if ($join===true || $join==='true') $join = '';

  if (is_array( $content )) {
    return implode($join, $content);
  }
};

/**
 * Match regular expression in string to list of values
 */
$html->format_match = function( $content, $options = [] ) {

  $match = $options['match'] ?? '';

  if (is_string( $content )) {
    preg_match_all($match, $content, $matches);
    if ($matches) {
      $matches = array_shift($matches) ?? [];
      return $matches;
    }
  }
  return [];
};
