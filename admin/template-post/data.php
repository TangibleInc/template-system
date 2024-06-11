<?php
/**
 * Templates data
 */
namespace tangible\template_system;
use tangible\template_system;

function get_all_templates($post_type = 'tangible_template') {

  $plugin = template_system::$system;

  if ( isset( $plugin->all_templates_cache[ $post_type ] ) ) {
    return $plugin->all_templates_cache[ $post_type ];
  }

  $posts = get_posts([
    'post_type'   => $post_type,
    'orderby'     => 'menu_order',
    'numberposts' => -1,
  ]);

  $posts_data = array_map( $plugin->get_template_fields, $posts );

  $plugin->all_templates_cache[ $post_type ] = $posts_data;

  return $posts_data;
}

$plugin->all_templates_cache = [
  // post type => array of templates' data
];

$plugin->get_all_templates = __NAMESPACE__ . '\\get_all_templates';


/**
 * Template options for page builders
 */

$plugin->all_template_options_cache = [
  // post type => array of template options
];

$plugin->get_all_template_options = function( $post_type = 'tangible_template' ) use ( $plugin ) {

  if ( isset( $plugin->all_template_options_cache[ $post_type ] ) ) {
    return $plugin->all_template_options_cache[ $post_type ];
  }

  $posts = get_posts([
    'post_type'   => $post_type,
    'orderby'     => 'menu_order',
    'numberposts' => -1,
  ]);

  $options = [];

  if ( empty( $posts ) ) {

    // When no templates, option ID = 0 and show message

    $options[0] = 'No templates available';

  } else {
    foreach ( $posts as $post ) {
      $options[ $post->ID ] = $post->post_title;
    }
  }

  $plugin->all_template_options_cache[ $post_type ] = $options;

  return $options;
};
