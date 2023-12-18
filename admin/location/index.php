<?php

/**
 * Template location
 *
 * This is a feature to override theme templates based on location rules.
 *
 * See frontend/include.php for rule matching logic
 *
 * @see https://developer.wordpress.org/themes/basics/template-hierarchy/
 * @see wp-includes/template-loader.php
 */

require_once __DIR__ . '/admin/index.php';
require_once __DIR__ . '/ajax/index.php';
require_once __DIR__ . '/enqueue.php';
require_once __DIR__ . '/frontend/index.php';
require_once __DIR__ . '/rules/evaluate.php';
require_once __DIR__ . '/theme/index.php';
