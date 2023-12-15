<?php
/**
 * List functions
 * 
 * index, slice, length, offset, count
 * split, join, reverse
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
    /**
     * Temporary variable necessary for array_shift(), otherwise it throws a
     * notice "Only variables should be passed by reference"
     */
    $slice = array_slice($content, $index, 1);
    return array_shift( $slice );
  }
};

/**
 * Slice a part of string or list
 */
$html->format_slice = function( $content, $options = [] ) use ($html){

  $offset = $options['offset'] ?? 0;
  $length = $options['length'] ?? $options['characters'] ?? null;

  if (is_string($content)) {

    $result = mb_substr( $content, $offset, $length );

    if (isset($options['words'])) {
      return wp_trim_words( $result, (int) $options['words'], '' );
    }

    return $result;
  }
  if (is_array( $content )) {
    return array_slice( $content, $offset, $length );
  }
};

/**
 * Offset and length
 */
$html->format_offset = $html->format_length = $html->format_words = $html->format_slice;

/**
 * Split string into list
 */
$html->format_split = function( $content, $options = [] ) use ($html) {

  $split = $options['split'] ?? '';

  // <Format split>
  if ($split===true || $split==='true') $split = '';

  if (is_string($content)) {

    $items = explode( $split, $content );

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
  
    if ($apply_trim) {
      foreach ($items as $key => $value) {
        $items[ $key ] = $html->format_trim( $value, $options );
      }  
    }
    
    return $items;
  }

  return [];
};

/**
 * Join into string
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
 * Count
 */
$html->format_count = function( $content, $options = [] ) {

  $type = $options['count'] ?? 'length';

  switch ($type) {
    case 'length':
      // Characters or items in a list
      return is_array($content)
        ? count($content)
        : (is_string($content)
          ? strlen($content)
          : 0
        )
      ;
      break;
    case 'words':
      return count(preg_split('~[^\p{L}\p{N}\']+~u', $content));
      break;
  }
};

/**
 * Reverse
 */
$html->format_reverse = function( $content, $options = [] ) {
  if (is_array( $content )) {
    return array_reverse($content);
  }
  if (is_string( $content )) {
    return strrev($content);
  }
};
