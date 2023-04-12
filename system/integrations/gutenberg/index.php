<?php

/**
 * Register integration and check dependencies
 */

require_once __DIR__ . '/enqueue.php';
require_once __DIR__ . '/blocks.php';
require_once __DIR__ . '/utils.php';

/**
 * Let template system know when rendering preview inside builder
 *
 * @see /system/integrations/index.php
 */
add_action('current_screen', function() use ( $plugin ) {
  $plugin->set_template_preview_state(
    $plugin->is_inside_gutenberg_editor()
  );
});
