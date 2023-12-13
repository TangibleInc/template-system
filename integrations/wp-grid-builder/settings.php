<?php

/**
 * @see wp-grid-builder/includes/settings/class-registry.php - normalize()
 */
add_filter('wp_grid_builder/settings/block_fields', function( $settings ) use ( $plugin ) {
  return array_merge(
    $settings,
    [
      /**
       * It's necessary to have a setting with the same name than the source, and it's
       * value must be a block name
       *
       * If it's not the case the block won't be rendered using our custom render_callback
       *
       * @see wp-grid-builder/frontend/blocks/base.php - wpgb_custom_block()
       */
      [
        'id'                => 'tangible',
        'tab'               => 'content',
        'type'              => 'select',
        'label'             => __( 'Tangible', 'tangible_template_system' ),
        'options'           => [
          'tangible_template' => __( 'Tangible Template', 'tangible_template_system' ),
        ],
        'conditional_logic' => [
          [
            'field'   => 'source',
            'compare' => '===',
            'value'   => 'tangible',
          ],
        ],
      ],
      [
        'id'                => 'tangible_template',
        'tab'               => 'content',
        'type'              => 'select',
        'label'             => __( 'Tangible Template', 'tangible_template_system' ),
        'options'           =>
          [ 0 => __( 'None', 'tangible_template_system' ) ] +
          $plugin->get_all_template_options(),
        'conditional_logic' => [
          [
            'field'   => 'source',
            'compare' => '===',
            'value'   => 'tangible',
          ],
          [
            'field'   => 'tangible',
            'compare' => '===',
            'value'   => 'tangible_template',
          ],
        ],
      ],
    ]
  );
});
