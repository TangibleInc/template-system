<?php
/**
 * Extensions are independent and optional modules with their own
 * library, tags, script, and/or style.
 *
 * Ideally they should load only a minimum shell at first, and
 * load internal libraries as needed, when called.
 */

// From /system to /extensions
$plugin->extensions_url = $plugin->url . '../extensions/';

require_once __DIR__ . '/hyperdb/index.php';
require_once __DIR__ . '/mermaid/index.php';
require_once __DIR__ . '/mobile-detect/index.php';
require_once __DIR__ . '/site-structure/index.php';
