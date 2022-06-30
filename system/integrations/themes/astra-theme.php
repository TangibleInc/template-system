<?php
/**
 * Integration with Astra theme
 *
 * @see https://wordpress.org/themes/astra/
 * @see astra/inc/core/theme-hooks.php
 *
 * The following definition is based on action hook names in:
 * astra/inc/compatibility/class-astra-beaver-themer.php - register_part_hooks()
 */

$plugin->register_theme_position_groups([
  'header'  => [
    'label' => 'Header',
    'hooks' => [
      [
'name'  => 'astra_header',
'label' => __( 'Header', 'astra' ),
      ],
      [
      'name'  => 'astra_header_before',
      'label' => __( 'Before Header', 'astra' ),
      ],
      [
      'name'  => 'astra_header_after',
      'label' => __( 'After Header', 'astra' ),
      ],
    ],
  ],
  'content' => [
    'label' => 'Content',
    'hooks' => [
      // [ 'name' => 'loop_start', 'label' => __('Loop Start', 'astra') ],
      // [ 'name' => 'loop_end', 'label' => __('Loop End', 'astra') ],
      [
  'name'  => 'astra_primary_content_top',
  'label' => __( 'Before Content', 'astra' ),
      ],
      [
      'name'  => 'astra_primary_content_bottom',
      'label' => __( 'After Content', 'astra' ),
      ],
    ],
  ],
  'footer'  => [
    'label' => 'Footer',
    'hooks' => [
      [
  'name'  => 'astra_footer',
  'label' => __( 'Footer', 'astra' ),
      ],
      [
      'name'  => 'astra_footer_before',
      'label' => __( 'Before Footer', 'astra' ),
      ],
      [
      'name'  => 'astra_footer_after',
      'label' => __( 'After Footer', 'astra' ),
      ],
    ],
  ],
  'sidebar' => [
    'label' => 'Sidebar',
    'hooks' => [
      [
  'name'  => 'astra_sidebars_before',
  'label' => __( 'Before Sidebar', 'astra' ),
      ],
      [
      'name'  => 'astra_sidebars_after',
      'label' => __( 'After Sidebar', 'astra' ),
      ],
    ],
  ],
]);
