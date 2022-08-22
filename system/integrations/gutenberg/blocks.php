<?php
/**
 * Register dynamic block server-side render
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/creating-dynamic-blocks/
 */
add_action( 'init', function() use ( $plugin, $html, $loop ) {

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
      'render_callback' => function( $attr, $content ) use ( $plugin, $html, $loop ) {

        /**
         * Disable links inside Gutenberg editor preview
         * @see ./disable-links.php
         */
        $plugin->start_disable_links_inside_gutenberg_editor();

        /**
         * Ensure default loop context is set to current post
         * @see /loop/context/index.php
         */
        $loop->push_current_post_context();

        if ( ! empty( $attr['template_selected'] ) ) {

          $post    = get_post( $attr['template_selected'] );
          $content = $plugin->render_template_post( $post );

        } else {

          /**
           * Ensure default loop context is set to current post
           * @see /loop/context/index.php
           */
          if ($plugin->is_inside_gutenberg_editor()
            && isset($attr['current_post_id'])
            && !empty($post = get_post( $attr['current_post_id'] ))
          ) {
            $loop->pop_current_post_context();
            $loop->push_current_post_context($post);
          }

          ob_start();
          $content = $html->render( $attr['template'] );
          $content = ob_get_clean() . $content;
        }

        $loop->pop_current_post_context();
        $plugin->stop_disable_links_inside_gutenberg_editor();

        return $content;
      },
    ]
  );

});
