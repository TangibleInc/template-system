<?php

/**
 * Template fields
 */

add_action('admin_init', function() use ($framework, $plugin, $ajax) {

  $info = $framework->get_admin_route_info(); // See Framework module, utils/admin.php

  $is_template_edit_screen =
    in_array( $info['type'], $plugin->template_post_types )
    && $info['edit'] // Single post edit screen
  ;

  if ( ! $is_template_edit_screen ) return;

  // Enqueue

  $plugin->enqueue_template_editor();

  // Render

  add_action('edit_form_after_title', function($post) use ($framework, $plugin, $info) {

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
    }

    if ( $has_assets ) $tabs []= 'Assets';
    if ( $has_location ) $tabs []= 'Location';

    $tabs = apply_filters( 'tangible_template_editor_tabs', $tabs, $post );

    if (count($tabs) > 1) {
      ?>
      <div class="tangible-template-tab-selectors">
        <?php
          foreach ($tabs as $index => $title) {
            ?>
            <div class="tangible-template-tab-selector<?php echo $index===0 ? ' active' : ''; ?>"
              data-tab-name="<?php echo esc_attr(
                $framework->kebab_case( $title )
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

    ?>
    <div class="tangible-template-tabs">
    <?php

      if (in_array('Template', $tabs)) {

        $is_editable = apply_filters('tangible_template_editor_tab_editable', $post_type !== 'tangible_block', 'template', $post, $fields );

        if ( $is_editable ) {
          ?>
          <div class="tangible-template-tab tangible-template-editor-container">
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
          <div class="tangible-template-tab">
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
          <div class="tangible-template-tab tangible-template-editor-container">
            <textarea
              name="style"
              style="display: none"
              data-tangible-template-editor-type="sass"
            ><?php echo esc_textarea( $fields['style'] ); ?></textarea>
          </div>
          <?php
        } else {
          ?>
          <div class="tangible-template-tab">
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
          <div class="tangible-template-tab tangible-template-editor-container">
            <textarea
              name="script"
              style="display: none"
              data-tangible-template-editor-type="javascript"
            ><?php echo esc_textarea( $fields['script'] ); ?></textarea>
          </div>
          <?php
        } else {
          ?>
          <div class="tangible-template-tab">
            <pre><code class="tangible-template-editor-locked"><?php
              echo esc_html( $fields['script'] );
            ?></code></pre>
          </div>
          <?php
        }
      }

      if ($has_assets) {

        // @see includes/template/assets/field.php

        $plugin->render_assets_edit_field( $fields, $post_type );

      }

      if ( $has_location ) {

        // @see includes/template/location/admin/fields.php

        $plugin->render_location_edit_fields( $fields, $post_type );

      }

      do_action( 'tangible_template_editor_after_tabs', $post, $fields );

      ?>

    </div>
    <?php

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
      <input id="template-slug-input" type="text" name="name" value="<?php echo $post->post_name; ?>" />
    </div>
    <div>
      <label for="id" style="vertical-align: inherit; cursor: default;">ID</label>:
      <?php
        $post_id = $post->ID;

        echo $post_id;

        $universal_id = $plugin->get_universal_id($post_id);

        if (!empty($universal_id)) {
          ?> - Universal ID:
            <a title="<?php echo $universal_id; ?>"
              style="cursor: pointer"
            ><?php echo substr($universal_id, 0, 6); ?></a>

            <input type="hidden" name="universal_id" value="<?php
              echo $universal_id;
            ?>" />
          <?php
        }
      ?>
    </div>
  </div>
</div>
<?php

  }, 9, 1);

});