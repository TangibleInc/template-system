<?php

if ( ! is_admin()) return;

$ajax = $framework->ajax();

/**
 * AJAX action prefix must be the same as in: /assets/src/template-import-export
 */
$prefix = 'tangible_loops_and_logic__template_import_export__';

$ajax->add_action("{$prefix}export", function( $data ) use ( $ajax, $plugin ) {

  if ( ! current_user_can( 'manage_options' )) return $ajax->error( 'Must be admin user' );
  if ( ! isset( $data['export_rules'] )) return $ajax->error( 'Property "export_rules" is required' );

  return $plugin->export_templates( $data );
});

$ajax->add_action("{$prefix}import", function( $data ) use ( $ajax, $plugin ) {

  if ( ! current_user_can( 'manage_options' )) return $ajax->error( 'Must be admin user' );
  if ( ! isset( $data['post_types'] )) return $ajax->error( 'Property "post_types" is required' );

  return $plugin->import_templates( $data );
});

require_once __DIR__ . '/item-options.php';
