<?php
/**
 * Extensions are independent and optional modules with their own
 * library, tags, script and/or style.
 */

// From /system to /extensions
$plugin->extensions_url = str_replace('/system/', '/extensions/', $plugin->url);

require_once __DIR__ . '/hyperdb/index.php';
require_once __DIR__ . '/mermaid/index.php';
require_once __DIR__ . '/mobile-detect/index.php';
require_once __DIR__ . '/site-structure/index.php';
