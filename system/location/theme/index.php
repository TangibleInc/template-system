<?php
/**
 * Theme positions
 *
 * Support applying layout templates to theme positions like header, footer, and parts
 *
 * The concept is similar to how Beaver Themer does it: https://docs.wpbeaverbuilder.com/beaver-themer/developer/add-header-footer-and-parts-support-to-your-theme-themer/
 *
 * Theme positions are registered in /includes/integrations/themes for the currently
 * active and compatible theme
 *
 * In ../frontend/include.php, there is the logic to match location rules
 * of layout templates, and to apply them to theme positions' action hooks.
 *
 * In ../admin/theme-position, the theme position field is rendered for layout
 * templates, under the "Location" tab.
 */

/**
 * Theme positions without grouping
 */
$plugin->theme_positions = [
  [ 'name' => 'tangible_layout_document_head', 'label' => 'Document Head' ],
  [ 'name' => 'tangible_layout_document_foot', 'label' => 'Document Foot' ],
// [ 'name' => 'header', 'label' => 'Header' ]
];

$plugin->get_theme_positions = function() use ($plugin) {
  return $plugin->theme_positions;
};

$plugin->register_theme_positions = function($positions) use ($plugin) {
  foreach ($positions as $position) {
    $plugin->theme_positions []= $position;
  }
};

/**
 * Theme position groups
 */
$plugin->theme_position_groups = [
  // Example
  /*
  'header' => [
    'label' => 'Header',
    'hooks' => [
      [ 'name' => 'header', 'label' => 'Header' ],
      [ 'name' => 'header_before', 'label' => 'Before Header' ],
      [ 'name' => 'header_after', 'label' => 'After Header' ]
    ],
  ],
  'footer' => [
    'label' => 'Footer',
    'hooks' => [
      [ 'name' => 'footer', 'label' => 'Footer' ],
      [ 'name' => 'footer_before', 'label' => 'Before Footer' ],
      [ 'name' => 'footer_after', 'label' => 'After Footer' ]
    ],
  ],
  */
];

$plugin->get_theme_position_groups = function() use ($plugin) {
  return $plugin->theme_position_groups;
};

$plugin->register_theme_position_groups = function($groups_definition) use ($plugin) {
  foreach ($groups_definition as $name => $config) {
    $plugin->register_theme_position_group($name, $config);
  }
};

$plugin->register_theme_position_group = function($name, $config) use ($plugin) {

  if (!isset($plugin->theme_position_groups[ $name ])) {
    $plugin->theme_position_groups[ $name ] = $config;
    return;
  }

  // Merge hooks if the group already exists
  $plugin->theme_position_groups[ $name ]['hooks'] = array_merge(
    $plugin->theme_position_groups[ $name ]['hooks'],
    $config['hooks']
  );
};

/**
 * Theme position hooks
 */
$plugin->get_all_theme_position_hooks = function() use ($plugin) {

  $hooks = $plugin->theme_positions;

  foreach ($plugin->theme_position_groups as $name => $config) {
    foreach($config['hooks'] as $hook) {
      $hooks []= $hook;
    }
  }

  return $hooks;
};
