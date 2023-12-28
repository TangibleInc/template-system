<?php
use tangible\ajax;
use tangible\template_system;

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

ajax\add_action('tangible_template_editor_render', function( $data = [] ) use ( $plugin ) {

  if (!template_system\can_user_edit_template()) return ajax\error([
    'message' => 'Not allowed'
  ]);

  /**
   * @see /admin/template-post/render
   */
  $result = $plugin->render_template_post($data);

  return [
    'result' => $result,
  ];
});
