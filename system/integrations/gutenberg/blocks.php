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
      ],
      'render_callback' => function( $attr, $content ) use ( $plugin, $html ) {

        /**
         * Disable links inside Gutenberg editor preview
         *
         * @see ./disable-links.php
         */
        $plugin->start_disable_links_inside_gutenberg_editor();

        if ( ! empty( $attr['template_selected'] ) ) {

          $post    = get_post( $attr['template_selected'] );
          $content = $plugin->render_template_post( $post );

        } else {
          ob_start();
          $content = $html->render( $attr['template'] );
          $content = ob_get_clean() . $content;
        }

        $plugin->stop_disable_links_inside_gutenberg_editor();

        return $content;
      },
    ]
  );

});
