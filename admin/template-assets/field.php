<?php
/**
 * Assets field in template post edit screen
 *
 * Called from ../../editor/fields.php
 */

namespace tangible\template_system;
use tangible\template_system;

$plugin->render_assets_edit_field = function( $fields, $post_type ) use ( $plugin ) {

  /**
   * Media library
   * @see https://developer.wordpress.org/reference/functions/wp_enqueue_media/
   */
  wp_enqueue_media();

  template_system\enqueue_assets_editor();

  ?>
  <div class="tangible-template-tab tangible-template-tab--assets">

    <p>Add media attachments, such as an image or SVG file, which you'd like to be exported together with this template. See <a href="https://docs./getting-started/loops-and-logic/template-assets">the documentation for Template Assets</a>.</p>

    <div id="tangible_template_assets_editor" data-assets="<?php
      echo esc_attr( json_encode( $fields['assets'] ) );
    ?>"></div>

  </div>
  <?php
};
