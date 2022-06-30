<?php
/**
 * Render template post via shortcode or dynamic tag
 */

$plugin->template_tag_and_shortcode = function($atts, $nodes = []) use ($plugin, $html) {

  if (isset($atts['theme'])) {
    return $plugin->load_theme_template_part($atts);
  }

  $post = null;
  $post_type = 'tangible_template';

  if (isset($atts['type'])) {
    /**
     * Support type=layout, style, script, block
     */
    $post_type = "tangible_{$atts['type']}";
    unset($atts['type']);
  }

  if (isset($atts['id'])) {

    $post = get_post( (int) $atts['id'] );
    unset($atts['id']);

  } elseif (isset($atts['name'])) {

    // By name ("post slug")

    $posts = get_posts([
      'name' => $atts['name'],
      'post_type' => $post_type,
      'post_status' => 'publish',
      'posts_per_page' => 1,
    ]);

    if (!empty($posts)) $post = $posts[0];

    unset($atts['name']);

  } elseif (isset($atts['title'])) {

    /**
     * By title - Slower: Prefer to use "name" or "id"
     */

    $title = $atts['title'];
    $post = get_page_by_title(
      $title,
      OBJECT,
      $post_type
    );

    unset($atts['title']);
  }

  if (empty($post)) return;

  unset($atts['keys']);

  // Pass attributes as local variables
  return $plugin->render_template_post( $post, false, $atts );
};


/**
 * Load theme template part
 */
$plugin->load_theme_template_part = function($atts) use ($plugin, $html) {

  $type = $atts['theme']; // sidebar, search, part

  $name = isset($atts['name']) ? $atts['name'] : null;
  $part = isset($atts['part']) ? $atts['part'] : null;

  ob_start();

  switch ($type) {

    // https://developer.wordpress.org/reference/functions/get_sidebar/
    case 'sidebar': get_sidebar( $name );
    break;

    // https://developer.wordpress.org/reference/functions/get_search_form/
    case 'search': get_search_form();
    break;

    // https://developer.wordpress.org/reference/functions/get_template_part/
    case 'part': get_template_part( $name, $part );
    break;
  }

  return ob_get_clean();
};


/**
 * <Template> tag
 */
$html->add_closed_tag('Template', $plugin->template_tag_and_shortcode);

/**
 * [template] shortcode
 */
add_shortcode('template', $plugin->template_tag_and_shortcode);

/**
 * Alias under tangible_template()
 */
$html->load_post = function( $atts = [] ) use ($plugin) {
  return $plugin->template_tag_and_shortcode(
    ($atts instanceof WP_Post) ? [ 'id' => $atts->ID ] : $atts
  );
};