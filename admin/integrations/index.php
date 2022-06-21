<?php

/**
 * Template integrations
 *
 * Each one should load conditionally when dependencies are met
 */

/**
 * Page builders
 */

require_once __DIR__ . '/gutenberg/index.php';
require_once __DIR__ . '/beaver/index.php';
require_once __DIR__ . '/elementor/index.php';

/**
 * Third-party plugin integration API
 */

require_once __DIR__ . '/third-party/index.php';
require_once __DIR__ . '/wp-fusion/index.php';

do_action('tangible_template_integrations_ready');

require_once __DIR__ . '/themes/index.php';
