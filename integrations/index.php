<?php
/**
 * Integrations
 *
 * Each one should load conditionally when dependencies are met
 */

// ACF integration is loaded earlier by /template for backward compatibility
require_once __DIR__ . '/advanced-custom-fields/index.php';

// Tangible Fields
require_once __DIR__ . '/tangible-fields/index.php';

/**
 * Page builders
 */

require_once __DIR__ . '/gutenberg/index.php';
require_once __DIR__ . '/beaver/index.php';
require_once __DIR__ . '/elementor/index.php';
require_once __DIR__ . '/wp-grid-builder/index.php';

/**
 * Template preview state
 *
 * All builders must call the following when inside the builder, so we can
 * apply preview-specific workarounds such as disabling the Redirect tag.
 *
 * @see ./beaver/index.php
 * @see ./elementor/index.php
 * @see ./gutenberg/index.php
 */
$plugin->set_template_preview_state = function( $yes ) use ( $plugin, $html ) {

  // Once set to true, it applies to entire page
  if ($plugin->is_template_preview || ! $yes) return;
  $plugin->is_template_preview = true;

  // Prepare for preview

  $html->disable_redirect_tag = true;

};

$plugin->is_template_preview = false;

/**
 * Third-party plugin integration API
 */

require_once __DIR__ . '/third-party/index.php';
require_once __DIR__ . '/wp-fusion/index.php';

do_action( 'tangible_template_integrations_ready' );

require_once __DIR__ . '/themes/index.php';
