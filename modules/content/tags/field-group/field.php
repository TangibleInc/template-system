<?php
/**
 * Field config
 */

$html->current_field_config = [];

$html->content_field_tag = function($atts, $nodes) use ($html) {

  $name = isset($atts['name']) ? $atts['name'] : array_shift($atts['keys']);
  $type = isset($atts['type']) ? $atts['type'] : '';

  $is_message_type = $type==='tangible_message';

  if ($is_message_type) {
    // Only field type that's allowed to have no name
    $name = 'tangible_message_' . uniqid();
  }

  if (empty($name) || empty($type)) return;

  // In case nested
  $parent_field_config = $html->current_field_config;

  $html->current_field_config = [
    'name' => $name,
    'type' => $type,
  ];

  // Create config as map

  $html->render_tag('Map', [
    'name' => 'current_field',
    'parent' => false,
  ], $nodes);

  $config = array_merge($html->current_field_config, $html->get_map('current_field'));

  if ($is_message_type) {
    $config['message'] = $html->get_template_raw('message');
    $html->set_template('message', '');
  }

  if (!empty($parent_field_config)) {

    // Append to parent field's subfields, such as repeater and flexible content

    if (!isset($parent_field_config['fields'])) {
      $parent_field_config['fields'] = [];
    }

    $parent_field_config['fields'] []= $config;

  } else {

    // Append to field group

    $html->current_field_group_config['fields'] []= $config;
  }

  $html->current_field_config = $parent_field_config;
};
