<?php
/**
 * Template fields
 */

use tangible\format;
use tangible\template_system;
use tangible\template_system\editor;

add_action('admin_init', function() use ($plugin) {

  $info = template_system\get_admin_route_info();

  $is_template_edit_screen =
    in_array( $info['type'], $plugin->template_post_types )
    && $info['edit'] // Single post edit screen
  ;

  if ( ! $is_template_edit_screen ) return;

  // Enqueue

  template_system\enqueue_template_editor(6);

  // Render

  add_action('edit_form_after_title', function($post) use ($plugin, $info) {

    $post_type = $post->post_type;

    $fields = $plugin->get_template_fields( $post );


    // Pass data to editor frontend

    $meta = [
      'isNewPost' => $info['new'] ? true : false,
      'postStatus' => $post->post_status
    ];

    ?><div id="tangible-template-editor-meta" data-json="<?php
      echo esc_attr(json_encode($meta));
    ?>"></div><?php


    /**
     * If post type has Style and Script fields
     */
    $has_style_and_script = in_array($post_type, [
      'tangible_template',
      'tangible_layout',
      'tangible_block'
    ]);

    /**
     * If post type has Preview tab
     */
    $has_preview = $has_style_and_script;

    /**
     * If post type has location rules builder
     * @see ../location and ../post-types/index.php
     */
    $has_location = in_array( $post_type, $plugin->template_post_types_with_location );

    /**
     * If post type has assets field
     * @see ../assets
     */
    $has_assets = $post_type !== 'tangible_content'
      // For blocks, it's only visible and editable when Block Editor plugin is active
      && apply_filters('tangible_template_editor_tab_editable',
        $post_type !== 'tangible_block', 'assets', $post, $fields
      )
    ;

    // Tabs

    $tabs = [];

    if ( $has_style_and_script ) {
      $tabs = ['Template', 'Style', 'Script'];
    } elseif ($post_type==='tangible_style') {
      $tabs = ['Style'];
    } elseif ($post_type==='tangible_script') {
      $tabs = ['Script'];
    } elseif ($post_type==='tangible_content') {
      $tabs = ['Template'];
    }

    /**
     * Tangible Blocks adds Controls tab
     * @see tangible-blocks/includes/block/post-types/edit.php
     */
    $tabs = apply_filters( 'tangible_template_editor_tabs', $tabs, $post );

    if ( $has_location ) $tabs []= 'Location';
    if ( $has_assets ) $tabs []= 'Assets';
    if ( $has_preview ) $tabs []= 'Preview';

    if (count($tabs) > 1) {
      ?>
      <div class="tangible-template-tab-selectors">
        <?php
          foreach ($tabs as $index => $title) {
            ?>
            <div class="tangible-template-tab-selector<?php echo $index===0 ? ' active' : ''; ?>"
              data-tab-name="<?php echo esc_attr(
                format\kebab_case( $title )
              ); ?>"
            >
              <?php echo $title; ?>
            </div>
            <?php
          }
        ?>
      </div>
      <?php
    }

    /**
     * Preview pane
     * @see /admin/editor/template-editor
     */
    if ( $has_preview ) {
      ?><div class="tangible-template-preview-pane" style="display:none"></div><?php
    }

    /**
     * Atomic CSS
     * @see ./
     */
    if (template_system\get_settings('atomic_css')) {
      ?><input type="hidden" name="atomic_css" value="<?php
        echo esc_attr($fields['atomic_css'] ?? '{}');
      ?>"><?php
    }

    ?>
    <div class="tangible-template-tabs">
    <?php

      if (in_array('Template', $tabs)) {

        $is_editable = apply_filters('tangible_template_editor_tab_editable', $post_type !== 'tangible_block', 'template', $post, $fields );

        if ( $is_editable ) {
          ?>
          <div class="tangible-template-tab tangible-template-editor-container"
            data-tab-name="template"
          >
            <textarea
              name="post_content"
              style="display: none"
              data-tangible-template-editor-type="<?php

                // Main editor type based on post type

                echo $post_type==='tangible_style' ? 'sass' : (
                  $post_type==='tangible_script' ? 'javascript'
                    : 'html' // tangible_template or tangible_content
                );
              ?>"
            ><?php echo esc_textarea( $fields['content'] ); ?></textarea>
          </div>
          <?php
        } else {
          ?>
          <div class="tangible-template-tab" data-tab-name="template">
            <pre><code class="tangible-template-editor-locked"><?php
              echo esc_html( $fields['content'] );
            ?></code></pre>
          </div>
          <?php
        }
      }

      if (in_array('Style', $tabs)) {

        $is_editable = apply_filters('tangible_template_editor_tab_editable', $post_type !== 'tangible_block', 'style', $post, $fields );

        if ( $is_editable ) {
          ?>
          <div class="tangible-template-tab tangible-template-editor-container"
          data-tab-name="style"
          >
            <textarea
              name="style"
              style="display: none"
              data-tangible-template-editor-type="sass"
            ><?php echo esc_textarea( $fields['style'] ); ?></textarea>
          </div>
          <?php
        } else {
          ?>
          <div class="tangible-template-tab" data-tab-name="style">
            <pre><code class="tangible-template-editor-locked"><?php
              echo esc_html( $fields['style'] );
            ?></code></pre>
          </div>
          <?php
        }
      }

      if (in_array('Script', $tabs)) {

        $is_editable = apply_filters('tangible_template_editor_tab_editable', $post_type !== 'tangible_block', 'script', $post, $fields );

        if ( $is_editable ) {
          ?>
          <div class="tangible-template-tab tangible-template-editor-container"
            data-tab-name="script"
          >
            <textarea
              name="script"
              style="display: none"
              data-tangible-template-editor-type="javascript"
            ><?php echo esc_textarea( $fields['script'] ); ?></textarea>
          </div>
          <?php
        } else {
          ?>
          <div class="tangible-template-tab" data-tab-name="script">
            <pre><code class="tangible-template-editor-locked"><?php
              echo esc_html( $fields['script'] );
            ?></code></pre>
          </div>
          <?php
        }
      }

      /**
       * Tangible Blocks renders Controls field
       * @see tangible-blocks/includes/block/post-types/edit.php
       */
      do_action( 'tangible_template_editor_after_tabs', $post, $fields );
  
      if ( $has_location ) {
        /** @see /admin/location/admin/fields.php */
        $plugin->render_location_edit_fields( $fields, $post_type );
      }

      if ($has_assets) {
        /** @see /admin/template-assets/field.php */
        $plugin->render_assets_edit_field( $fields, $post_type );
      }

      if ( $has_preview ) {
        ?><div class="tangible-template-tab" style="display:none"></div><?php
      }

      ?>
    </div>
    <?php // End tabs

}); // add_action edit_form_after_title

/**
 * Publish actions in the sidebar of single post edit screen
 */
  add_action( 'post_submitbox_misc_actions', function($post) use ($plugin) {

    /**
     * Slug, post ID, universal ID
     *
     * @see ../post-types/extend.php for field style
     * @see ../save.php
     */

?>
<div class="custom-publish-actions">
  <div style="display: flex; flex-wrap: wrap; align-items: center; line-height: 1.5rem;">
    <div style="padding-right: .5rem">
      <label for="name" style="vertical-align: middle; cursor: default;">Name</label>:
      <input id="template-slug-input" type="text" name="name" value="<?php echo $post->post_name; ?>" autocomplete="off" />
    </div>
    <div>
      <label for="id" style="vertical-align: inherit; cursor: default;">ID</label>:
      <?php
        $post_id = $post->ID;
        echo $post_id;

        $universal_id = template_system\ensure_universal_id($post_id);
        ?>
          <input type="hidden" name="universal_id" value="<?php
            echo esc_attr($universal_id);
          ?>" />
        <?php
/*
        if (!empty($universal_id)) {
          ?> - Universal ID:
            <a title="<?php echo $universal_id; ?>"
              style="cursor: pointer"
            ><?php echo substr($universal_id, 0, 6); ?></a>
          <?php
        }
*/
      ?>
    </div>
  </div>
</div>
<?php

  }, 9, 1); // post_submitbox_misc_actions

}); // admin_init
