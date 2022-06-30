<?php

/**
 * Theme integrations
 *
 * @see /includes/template/location/theme/index.php
 */

add_action('after_setup_theme', function() use ( $plugin ) {

  // Astra theme
  if (defined( 'ASTRA_THEME_VERSION' )) require_once __DIR__ . '/astra-theme.php';

  // Kadence theme
  elseif (defined( 'KADENCE_VERSION' )) require_once __DIR__ . '/kadence-theme.php';

  // Beaver Builder theme - Not designed for theme position replacement
  // elseif (defined('FL_THEME_VERSION')) require_once __DIR__.'/beaver-builder-theme.php';

  // Beaver Themer plugin
  elseif (defined( 'FL_THEME_BUILDER_VERSION' )) require_once __DIR__ . '/beaver-themer.php';

  // Elementor Pro plugin
  elseif (defined( 'ELEMENTOR_PRO_VERSION' )) require_once __DIR__ . '/elementor-pro.php';

  do_action( 'tangible_template_theme_integrations_ready' );

});
