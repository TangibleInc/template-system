<?php
/**
 * Provide variable type "asset" for templates to get asset data
 *
 * An asset is an attachment, usually a file such as image, PDF, etc.
 *
 * Examples:
 *
 * ```html
 * <Get asset=example /> (Attachment ID by default)
 * <Get asset=example field=url />
 * ```
 *
 * @see /includes/render
 * @see /vendor/tangible/template/tags/get-set-render
 */

$html->register_variable_type('asset', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {
    // Internal use only, not for Set tag
  },
  'get' => function( $name, $atts, &$memory ) use ( $html, $loop, $plugin ) {

    $assets = $plugin->current_template_assets_map;

    if (empty( $assets ) || empty( $assets[ $name ] )) return;

    $asset = $assets[ $name ];

    // tangible\see('asset', $name, $asset);

    $attachment_id = $asset['id'];

    $field = isset( $atts['field'] ) ? $atts['field'] : 'id';

    // Only the "name" is different from normal attachment field
    if ( $field === 'name' && isset( $asset[ $field ] ) ) {
      return $asset[ $field ];
    }

    // @see /vendor/tangible/loop/types/attachment/field.php
    $value = $loop->get_attachment_field(
      $attachment_id,
      $field,
      $atts
    );

    return $value;
  },
]);


/**
 * Utility methods to set current template's assets data
 *
 * Used in: /includes/template/render.php, render_template_post()
 */

$plugin->previous_template_assets_map = null;
$plugin->current_template_assets_map  = [
  // name => asset
];

/**
 * Prepare assets map for current template
 */
$plugin->prepare_template_assets_map = function( $post_id ) use ( $plugin ) {

  $assets = is_numeric($post_id)
    ? get_post_meta( $post_id, 'assets', true )
    : $post_id // Can pass assets directly
  ;

  if ( ! is_array( $assets ) ) {
    try {
      $assets = json_decode( $assets, true );
    } catch ( \Throwable $th ) {
      return;
    }
  }

  if (empty( $assets ) || ! is_array( $assets )) $assets = [];

  // Convert from list to map for quick access by name
  $assets_map = [];
  foreach ( $assets as $asset ) {

    $name = $plugin->ensure_valid_asset_name( $asset['name'] );

    // Additional fields
    $asset['url'] = isset( $asset['id'] ) ? wp_get_attachment_url( $asset['id'] ) : '';

    $assets_map[ $name ] = $asset;
  }

  // Save parent template's asset map - One level only
  $plugin->previous_template_assets_map = $plugin->current_template_assets_map;

  $plugin->current_template_assets_map = $assets_map;

  return $assets_map;
};

/**
 * Restore parent template's asset map
 */
$plugin->restore_template_assets_map = function() use ( $plugin ) {
  $plugin->current_template_assets_map  = $plugin->previous_template_assets_map;
  $plugin->previous_template_assets_map = null;
};

$plugin->ensure_valid_asset_name = function( $name ) {
  return preg_replace( '/[^a-zA-Z0-9_\-]+/i', '', $name );
};
