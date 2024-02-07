<?php
namespace tangible\template_system;
use tangible\template_system;

/**
 * Assign universal ID to newly created templates and blocks, so they have
 * a unique and immutable identifier across sites.
 *
 * This allows each template to be identified reliably even if it has a new
 * post ID assigned during export/import, or if its post slug is changed.
 *
 * UUID v4 is 36 characters, minus 4 dashes = 32 chars long
 *
 * @see https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)
 * @see https://developer.wordpress.org/reference/functions/wp_generate_uuid4/
 *
 * ---
 *
 * It was implemented to solve the following situation.
 *
 * Previously, dynamic blocks used their post ID or slug to identify themselves
 * in page builders. However, when such builder template and their blocks were
 * imported into a different site, the blocks disappeared because they all had
 * new post IDs. The same would happen when a block's slug was changed.
 *
 * With universal ID, blocks can continue to work with different post ID or slug.
 *
 * For backward compatibility, blocks fall back to use post ID (internally called
 * "content_id") if universal ID doesn't exist.
 *
 * @see /system/template/controls/data.php, get_block_data()
 *
 * @see /system/integrations/beaver/dynamic/utils.php
 * @see /system/integrations/beaver/dynamic/tangible-base/tangible-base.php
 *
 * @see /system/integrations/elementor/dynamic/widgets/base.php
 * @see /system/integrations/elementor/dynamic/widgets/utils.php
 *
 * @see /system/integrations/gutenberg/dynamic/utils.php
 *
 * ---
 *
 * Universal ID is used during template import process to check if the same
 * template exists on the site already.
 *
 * @see /system/template/fields.php
 * @see /system/template/import-export/import.php, export.php
 *
 * This is also relevant for Tangible Cloud, where sites can export/import templates.
 */

add_action('transition_post_status', function( $new_status, $old_status, $post ) use ( $plugin ) {

  if (
    $old_status === 'new' // @see https://codex.wordpress.org/Post_Status_Transitions
    && in_array( $post->post_type, $plugin->template_post_types )
    // Don't overwrite if post has universal ID already during import
    && empty( template_system\get_universal_id( $post->ID ) )
  ) {
    template_system\set_universal_id( $post->ID );
  }

}, 10, 3 );

function create_universal_id() {
  return str_replace( '-', '', wp_generate_uuid4() );
}

function set_universal_id($post_id, $universal_id = true ) {

  if ($universal_id === true) {
    $universal_id = template_system\create_universal_id();
  }

  update_post_meta($post_id, 'universal_id', $universal_id );
  return $universal_id;
}

function get_universal_id($post_id ) {
  return get_post_meta( $post_id, 'universal_id', true );
}

function ensure_universal_id( $post_id ) {
  $universal_id = template_system\get_universal_id($post_id);
  if (empty($universal_id)) {
    $universal_id = template_system\set_universal_id($post_id);
  }  
  return $universal_id;
}

// Deprecated
$plugin->create_universal_id = __NAMESPACE__ . '\\create_universal_id';
$plugin->set_universal_id    = __NAMESPACE__ . '\\set_universal_id';
$plugin->get_universal_id    = __NAMESPACE__ . '\\get_universal_id';
