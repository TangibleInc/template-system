<?php

/**
 * Register integration and check dependencies
 */
if ( ! function_exists('has_blocks') ) return;

require_once __DIR__.'/enqueue.php';
require_once __DIR__.'/blocks.php';
require_once __DIR__.'/disable-links.php';
