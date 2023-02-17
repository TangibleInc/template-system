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
        if ($plugin->is_inside_gutenberg_editor()
          && isset($attr['current_post_id'])
        ) {
          // Post ID passed from ./enqueue.php
          $post = get_post( $attr['current_post_id'] );
          $loop->push_current_post_context($post);
        } else {
          $loop->push_current_post_context();
        }

        if ( ! empty( $attr['template_selected'] ) ) {

          $post    = get_post( $attr['template_selected'] );
          $content = $plugin->render_template_post( $post );

        } else {

          ob_start();
          $content = $html->render( $attr['template'] );
          $content = ob_get_clean() . $content;
        }

        $loop->pop_current_post_context();
        $plugin->stop_disable_links_inside_gutenberg_editor();

        return $plugin->wrap_gutenberg_block_html($content);
      },
    ]
  );

});


/**
 * Workaround to protect block HTML from Gutenberg
 * 
 * Gutenberg applies content filters such as `wptexturize` and `do_shortcode`
 * to the entire page after all blocks have been rendered, which can corrupt
 * valid HTML and JSON. The dummy shortcode [twrap] prevents `do_shortcode`
 * from processing its inner content.
 * 
 * @see https://github.com/WordPress/gutenberg/issues/37754#issuecomment-1433931297
 * @see https://bitbucket.org/tangibleinc/template-system/issues/2/pagination-breaks-when-a-shortcode-is-in#comment-64843262
 */
$plugin->wrap_gutenberg_block_html = function($content) {
  return '[twrap]'.$content.'[/twrap]';
};

add_shortcode('twrap', function($atts, $content) {
  return $content;
});

add_filter('no_texturize_shortcodes', function($shortcodes) {
  $shortcodes[] = 'twrap';
  return $shortcodes;
});
