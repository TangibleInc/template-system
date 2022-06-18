
<div>

  <?php
    if ( $settings->toggle_type == 'editor'  ) {

      echo tangible_template( $settings->html );

    } else if ( !empty($settings->saved_template) ){

      $post = get_post($settings->saved_template);

      echo \tangible_loops_and_logic()->render_template_post($post);
    }
  ?>

</div>
