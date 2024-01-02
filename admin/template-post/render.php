<?php
/**
 * Render template and its fields
 * 
 * @see /admin/template-post/style
 * @see /admin/template-post/script
 * @see /admin/template-assets/variable
 */
use tangible\template_system;

$plugin->render_template_post = function(
  $post, // WP_Post or the post data array
  $control_values = false, // From /includes/integrations/gutenberg, elementor, beaver
  $local_scope = [] // From Template tag and shortcode /includes/template/tag.php
 ) use ( $plugin, $html ) {

  $is_post = true;

  // Direct post data
  if (is_array($post) && isset($post['content'])) {

    $is_post = false;
    $content = $post['content'] ?? '';

  } else {
    if (is_numeric( $post )) $post = get_post( $post );
    if ( ! is_a( $post, 'WP_Post' )) return;
    $content = $post->post_content;
  }

  // Capture any style, script, or unexpected output
  ob_start();

  /**
   * Local variable scope
   *
   * @see /language/tags/get-set/local.php
   */
  $html->push_local_variable_scope( $local_scope );

  /**
   * Assets map
   */
  $assets_map = $plugin->prepare_template_assets_map(
    $is_post ? $post->ID : ($post['assets'] ?? [])
  );

  /**
   * Atomic CSS
   * @see /editor/atomic-css
   */

  $atomic_css = null;

  if ($is_post) {
    $atomic_css = get_post_meta( $post->ID, 'atomic_css', true );
  } else {
    $atomic_css = $post['atomic_css'] ?? null;
  }
  if (!empty($atomic_css)) {
    try {
      $atomic_css = json_decode($atomic_css);
      $css = template_system\render_atomic_css_selectors($atomic_css);
      $html->enqueue_inline_style( $css );
    } catch (\Throwable $th) {
      // Skip
    }
  }

  /**
   * Content supports Exit tag - Previously used $html->render()
   *
   * @see vendor/tangible/template/tags/exit.php
   */
  $content = $html->render_with_catch_exit( $content );

  /**
   * Style and script
   * Moved to *after* content render, so templates can pass Sass/JS variables.
   *
   * @see /language/tags/get-set/js.php, sass.php
   */

  $sass_variables = $html->get_sass_variables();
  $js_variables   = $html->get_js_variables();

  /**
   * Pass assets map as Sass and JS variables
   */
  foreach ( $assets_map as $key => $value ) {

    /**
     * Asset name is ensured to be valid format: alphanumeric, dash, and underscore.
     *
     * @see /language/fields.php, get_template_fields()
     */
    $name = "asset_{$key}";

    // Cast ID to string so it's easier to use from Sass
    if (isset( $value['id'] )) $value['id'] = (string) $value['id'];

    $js_variable_name                  = str_replace( '-', '_', $name );
    $js_variables[ $js_variable_name ] = json_encode( $value );

    // Convert to Sass map
    $sass_variables[ $name ] = $html->convert_array_to_sass_map_or_list( $value );
  }

  $plugin->enqueue_template_style($post, $sass_variables );

  // Ensure any template script comes after content

  $before_content = ob_get_clean();

  ob_start();
  $plugin->enqueue_template_script($post, $control_values, $js_variables );
  $after_content = ob_get_clean();

  // End assets map
  $plugin->restore_template_assets_map();

  // End local variable scope
  $html->pop_local_variable_scope();

  return $before_content . $content . $after_content;
};
