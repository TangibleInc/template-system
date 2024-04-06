<?php
namespace tangible\form;
use tangible\ajax;
use tangible\form;
use tangible\template_system;

function register() {

  $url = template_system::$state->url . '/modules/form/build';
  $version = template_system::$state->version;
  
  wp_register_script(
    'tangible-form',
    "{$url}/form.min.js",
    [ 'jquery', 'tangible-ajax' ],
    $version,
    true
  );
}

function enqueue() {
  ajax\enqueue();
  wp_enqueue_script('tangible-form');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );

$html->forms = [];

$html->form_script_enqueued = false;

$html->enqueue_form = function( $form ) use ( $html ) {

  $html->forms [] = $form;

  if ($html->form_script_enqueued) return;
  $html->form_script_enqueued = true;

  form\enqueue();
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
