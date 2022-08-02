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

        if ( ! empty( $attr['template_selected'] ) ) {

          $post    = get_post( $attr['template_selected'] );
          $content = $plugin->render_template_post( $post );

        } else {

          /**
           * Set current post as default loop context
           * @see /loop/context/index.php
           * @see /loop/types/post/field.php
           */
          $should_set_default_context = $plugin->is_inside_gutenberg_editor() && isset($attr['current_post_id']);
          if ($should_set_default_context) {

            $post = get_post( $attr['current_post_id'] );
            $loop->push_context(
              $loop($post->post_type, [
                'id' => $post->ID
              ])
            );

            // Prevent infinite loop by not displaying post content inside content
            $loop->currently_inside_post_content_ids []= $post->ID;
          }

          ob_start();
          $content = $html->render( $attr['template'] );
          $content = ob_get_clean() . $content;

          if ($should_set_default_context) {
            array_pop($loop->currently_inside_post_content_ids);
          }
        }

        $plugin->stop_disable_links_inside_gutenberg_editor();

        return $content;
      },
    ]
  );

});
