<?php
use tangible\ajax;
use tangible\template_system;

if ( ! is_admin()) return;

/**
 * AJAX action prefix must be the same as in: /assets/src/template-import-export
 */
$prefix = 'tangible_template_import_export__';

ajax\add_action("{$prefix}export", function( $data ) {

  if ( ! current_user_can( 'manage_options' )) return ajax\error( 'Must be admin user' );
  if ( ! isset( $data['export_rules'] )) return ajax\error( 'Property "export_rules" is required' );

  try {
    return template_system\export_templates( $data );
  } catch (\Throwable $th) {
    return ajax\error($th->getMessage());
  }
});

ajax\add_action("{$prefix}import", function( $data ) {

  if ( ! current_user_can( 'manage_options' )) return ajax\error( 'Must be admin user' );
  if ( ! isset( $data['post_types'] )) return ajax\error( 'Property "post_types" is required' );

  /**
   * Allow JSON and SVG file types during import
   * 
   * May be necessary on some site setups to import templates and assets.
   * 
   * On multisite setup, it may also be necessary to add to the list of
   * allowed file types for sub-sites, under Network Admin -> Settings.
   * 
   * Note that PHP determines the MIME type of a JSON file to be "text/plain"
   * instead of the correct one, "application/json".
   * 
   * @see /admin/settings
   * @see https://stackoverflow.com/questions/63455255/allow-json-upload-file-in-wordpress
   */

  add_filter('upload_mimes', function($mimes) {
    $mimes['json'] = 'text/plain';
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
  });

  return template_system\import_templates( $data );
});

require_once __DIR__ . '/item-options.php';
