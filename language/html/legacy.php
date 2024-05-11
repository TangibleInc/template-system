<?php
namespace tangible\html;

/**
 * Backward compatibility
 */

foreach ([
  // Parse
  'parse',
  'parse_nodes',
  'parse_tag',

  // Render
  'render',
  'render_nodes',
  'render_raw',
  'render_tag',
  'render_raw_tag',
  'render_attributes',
  'render_attributes_to_array',
  'should_render_attribute',
  'render_attribute_value',

  // Tag
  'is_raw_tag',
  'add_raw_tag',
  'add_open_tag',
  'is_closed_tag',
  'add_closed_tag',
  'get_all_closed_tag_names',
  'get_all_tag_names',

] as $key) {
  $html->$key = __NAMESPACE__ . '\\' . $key;
}
