<?php

if ( ! class_exists( 'FLBuilderModel' )
  || ! function_exists( 'tangible_template_system' )
) return;

?><div><?php

  /**
   * When inside Beaver Builder preview
   *
   * - FLBuilderModel::is_builder_active()
   * - FLBuilderModel::get_post_id() - Template or theme layout ID
   * - FLBuilderAJAX::doing_ajax()
   *
   * @see bb-plugin/classes/class-fl-builder.php, FLBuilder::init_ui()
   */

  $template_system = tangible_template_system();
  $loop            = $template_system->loop;
  $html            = $template_system->html;

  global $post;

  $previous_post = $post;

  /**
   * Ensure default loop context is set to current post
   *
   * @see /loop/context/index.php
   */
  $loop->push_current_post_context();

  if ( $settings->toggle_type == 'editor' ) {

    echo $html->render_with_catch_exit( $settings->html );

  } elseif ( ! empty( $settings->saved_template ) ) {

    $template_post = get_post( $settings->saved_template );

    echo $template_system->render_template_post( $template_post );
  }

  $loop->pop_current_post_context();

  // Restore current post in context
  $post = $previous_post;

?>
</div>
