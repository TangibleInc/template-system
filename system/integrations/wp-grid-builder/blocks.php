<?php

/**
 * @see https://docs.wpgridbuilder.com/resources/filter-blocks/
 */
add_filter('wp_grid_builder/blocks', function( $blocks ) use ( $loop, $plugin ) {

  $blocks['tangible_template'] = [
    'name'            => __( 'Template', 'tangible_template_system' ),
    'type'            => 'tangible',
    'settings'        => [
      'content' => [
        'source'            => 'tangible',
        'tangible'          => 'tangible_template',
        'tangible_template' => 0,
      ],
    ],
    'render_callback' => function( $block = [], $action = [] ) use ( $loop, $plugin ) {

      /**
       * WP Grid builder does not change the global $post or $wp_query
       *
       * @see /wp-grid-builder/frontend/blocks/post.php
       */
      $wpgb_post     = wpgb_get_post();
      $template_post = get_post( $block['tangible_template'] ?? 0 );

      $loop->push_current_post_context( $wpgb_post );

      wpgb_block_start( $block, $action );
        echo $plugin->render_template_post( $template_post );
      wpgb_block_end( $block, $action );

      $loop->pop_current_post_context();
    },
  ];

  return $blocks;
});
