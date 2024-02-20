<?php
namespace tangible\html;
use tangible\html;

/**
 * For HTML tags - Render attributes to string
 */
function render_attributes($atts, $options = []) {

  $i = 0;
  $content = '';

  $atts = apply_filters('tangible_template_render_attributes', $atts);

  if (isset($atts['tag-attributes'])) {

    $value = html\render_attribute_value('tag-attributes', $atts['tag-attributes']);
    /**
     * Parse as tag attributes to support key, key=value
     */
    $parsed = html\parse('<div ' . $value . '></div>');

    if (!empty($parsed) && !empty($parsed[0]['attributes'])) {
      foreach ($parsed[0]['attributes'] as $key => $value) {
        if ($key==='keys') {
          if (!isset($atts['keys'])) $atts['keys'] = [];
          $atts['keys'] = array_merge($value, $atts['keys']);
          continue;
        }
        $atts[ $key ] = $value;
      }
    }

    unset($atts['tag-attributes']);
  }

  if (isset($atts['keys'])) {
    // Attributes without values
    foreach ($atts['keys'] as $key) {
      if ($i > 0) $content .= ' ';
      $content .= $key;
      $i++;
    }
    unset($atts['keys']);
  }

  foreach ($atts as $key => $value) {

    if ($i > 0) $content .= ' ';

    if ($value === '') {
      // Strict equal empty to allow false or 0
      $content .= $key;
    } else {

      $value = html\render_attribute_value($key, $value, $options);

      /**
       * Encode <, >, &, ” and ‘ characters. Will not double-encode entities.
       * @see https://developer.wordpress.org/reference/functions/esc_attr/
       */
      $value = esc_attr($value);

      $content .= "$key=\"$value\"";
    }

    $i++;
  }

  return $content;
};

/**
 * For template tags - Render attributes to array
 */
function render_attributes_to_array($atts, $options = []) {

  if (isset($atts['tag-attributes'])) {

    $value = html\render_attribute_value('tag-attributes', $atts['tag-attributes']);
    /**
     * Parse as tag attributes to support key with/out value
     */
    $parsed = html\parse('<div ' . $value . '></div>');

    if (!empty($parsed) && !empty($parsed[0]['attributes'])) {
      foreach ($parsed[0]['attributes'] as $key => $value) {
        if ($key==='keys') {
          if (!isset($atts['keys'])) $atts['keys'] = [];
          $atts['keys'] = array_merge($value, $atts['keys']);
          continue;
        }
        $atts[ $key ] = $value;
      }
    }

    unset($atts['tag-attributes']);
  }

  $skip_keys = $options['skip_render_keys'] ?? [];

  foreach ($atts as $key => $value) {
    if ($key === 'keys' || in_array($key, $skip_keys)) continue;
    $atts[ $key ] = html\render_attribute_value($key, $value, $options);
  }

  // Always provide property "keys" so dynamic tags can check directly
  if (!isset($atts['keys'])) $atts['keys'] = [];

  return $atts;
};

function should_render_attribute($key, $value) {

  if (!is_string($value)
    // Skip event handlers like onblur and onfocus
    || str_starts_with($key, 'on')
  ) return false;

  /**
   * Skip rendering attributes with JSON strings.
   *
   * Notably, the style attribute is rendered to allow dynamic styles. The use
   * of curly braces {} there is fine.
   */

  $c = substr( $value, 0, 1 );

  if ($c === '{' || $c === '[') {
    $c2 = substr( $value, 1, 1 );
    $is_json =
      preg_match('/\s/', $c) // Match any whitespace character, including new line
      || $c2==='"' || $c2==='&'
      || ($c==='[' && ($c2==='{' || $c2==='[' || $c2===']'))
      || ($c==='{' && $c2==='}')
    ;
    return !$is_json;
  }

  return true;
};

function render_attribute_value($key, $value, $options = []) {

  if (
    (isset($options['render_attributes']) && ! $options['render_attributes'])
    || ! html\should_render_attribute($key, $value)
  ) return $value;

  $pair = ['{', '}'];
  $tag_pair = ['<', '>'];

  if (strpos($value, $pair[0])===false || strpos($value, $pair[1])===false) return $value;

  $value = html\render(
    str_replace(['<<', '>>'], $pair, // Double-brackets {{ }} to escape
      str_replace(array_merge($tag_pair, $pair), array_merge(['&lt;', '&gt;'], $tag_pair), $value)
    ),
    $options
  );

  return str_replace($tag_pair, $pair, $value); // Restore unrendered tags
};
