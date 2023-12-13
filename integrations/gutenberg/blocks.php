<?php
/**
 * Register dynamic block server-side render
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/creating-dynamic-blocks/
 */
add_action( 'init', function() use ( $plugin, $html ) {

  register_block_type(
    'tangible/template', // Block name must match in JS
    [
      'attributes'      => [
        'toggle_type'       => [
          'type'    => 'string',
          'default' => 'editor',
        ],
        'template'          => [
          'type'    => 'string',
          'default' => '',
        ],
        'template_selected' => [
          'type'    => 'number',
          'default' => 0,
        ],
        'current_post_id' => [
          'type'    => 'number',
          'default' => 0,
        ],
      ],
      'render_callback' => function( $attributes, $content ) use ( $plugin, $html ) {

        $plugin->before_gutenberg_block_render($attributes);

        if ( ! empty( $attributes['template_selected'] ) ) {

          $post    = get_post( $attributes['template_selected'] );
          $content = $plugin->render_template_post( $post );

        } else {

          ob_start();
          $content = $html->render( $attributes['template'] );
          $content = ob_get_clean() . $content;
        }

        $plugin->after_gutenberg_block_render();

        return $plugin->wrap_gutenberg_block_html($content);
      }
    ]
  );

});
