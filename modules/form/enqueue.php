<?php

$html->forms = [];

$html->form_script_enqueued = false;

$html->enqueue_form = function( $form ) use ( $framework, $html ) {

  $html->forms [] = $form;

  if ($html->form_script_enqueued) return;

  $framework->ajax()->enqueue();

  $url = plugins_url( '/', __FILE__ ) . '/build';
  $version = $html->version;

  wp_enqueue_script('tangible-form',
    "{$url}/form.min.js",
    [ 'jquery', 'tangible-ajax' ], $version, true
  );
};

/**
 * Pass all forms to frontend script
 */
$html->enqueue_forms_data = function() use ( $html ) {

  if (empty( $html->forms )) return;

  ?><script>
window.Tangible = window.Tangible || {}
window.Tangible.forms = <?php echo json_encode( $html->forms ); ?>
</script><?php
};

add_action( 'wp_footer', $html->enqueue_forms_data, 0 );
add_action( 'admin_footer', $html->enqueue_forms_data, 0 );
