<?php
/**
 * Integration with Kadence theme
 *
 * @see https://wordpress.org/themes/kadence/
 *
 * The following definition is based on action hook names in:
 * kadence/inc/components/elementor_pro/component.php - register_elementor_locations()
 */

$plugin->register_theme_positions([
  [
'name'  => 'kadence_header',
'label' => 'Header',
  ],
  [
  'name'  => 'kadence_footer',
  'label' => 'Footer',
  ],
]);
