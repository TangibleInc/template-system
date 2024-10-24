<?php
/**
 * Object cache for pre-processed template posts
 * 
 * > Use the Transients API if you need to guarantee that your data will be cached. If persistent caching is configured, then the transients functions will use the wp_cache_* functions described in this document. However if persistent caching has not been enabled, then the data will instead be cached to the options table.
 * 
 * @see https://developer.wordpress.org/apis/transients
 * @see https://developer.wordpress.org/reference/classes/wp_object_cache/
 * @see https://developer.wordpress.org/advanced-administration/performance/cache/
 */
namespace tangible\template_system;

use tangible\html;
use tangible\template_system;

function is_processed_template_post_cache_enabled() {
  // See /admin/settings
  return template_system\get_setting('object_cache_processed_template_post');
}

function get_template_post_cache_key($post) {
  $type = $post->post_type;
  $id = $post->ID;
  return 'tangible_template_post_' . $type . '_' . $id;
}

function get_processed_template_post_with_cache( $post ) {

  $cache_key = template_system\get_template_post_cache_key($post);

  // \tangible\see( $post);

  if (($processed = get_transient($cache_key))!==false) {
    return $processed;
  }

  return template_system\process_and_cache_template_post($post, $cache_key);
}

/**
 * Process and cache post content
 */
function process_and_cache_template_post( $post, $cache_key = null ) {

  if (empty($cache_key)) {
    $cache_key = template_system\get_template_post_cache_key($post);  
  }

  $metadata = [
    'time' => gmdate('Y-m-d H:i:s'),
    'type' => $post->post_type,
    'id' => $post->ID
  ];
  $prefix = '<!-- Parsed and cached: ' . json_encode($metadata) . " -->\n";
  $content = html\parse( $prefix . ($post->post_content) );
  $processed = [
    'parsed_content' => $content,
    // ..Possibly other pre-processed template data
  ] + $metadata;

  set_transient($cache_key, $processed);

  return $processed;
}

/**
 * Flush cache
 */
function delete_processed_template_post_cache( $post ) {
  return delete_transient(
    template_system\get_template_post_cache_key($post)
  );
}
