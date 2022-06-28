<?php
/**
 * Features are independent and optional modules with their own
 * library, tags, script or style.
 *
 * Ideally, they should load a minimum shell only at first, and
 * when called, load internal libraries as needed.
 */

require_once __DIR__ . '/hyperdb/index.php';
require_once __DIR__ . '/mobile-detect/index.php';
