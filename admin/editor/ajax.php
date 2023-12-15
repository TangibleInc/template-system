<?php
use tangible\ajax;

// Save template via AJAX

ajax\add_action('tangible_template_editor_save', function( $data = [] ) use ( $plugin ) {

  $result = $plugin->save_template_post( $data );

  if (is_wp_error( $result )) return ajax\error([
    'message' => 'Save failed: ' . ( $result->get_error_message() ),
  ]);

  return [
    'message' => 'Saved',
  ];
});
