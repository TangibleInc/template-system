<?php
/**
 * Consolidate admin screens
 */
use tangible\template_system;

require_once __DIR__ . '/plugin.php';

require_once __DIR__ . '/capability.php';
require_once __DIR__ . '/route.php';
require_once __DIR__ . '/settings/index.php';
require_once __DIR__ . '/menu.php';

$loop  = template_system::$loop;
$logic = template_system::$logic;
$html  = template_system::$html;

require_once __DIR__ . '/post-types/index.php';
require_once __DIR__ . '/editor/index.php';
require_once __DIR__ . '/template-post/index.php';
require_once __DIR__ . '/template-assets/index.php';
require_once __DIR__ . '/location/index.php';
require_once __DIR__ . '/universal-id/index.php';
require_once __DIR__ . '/import-export/index.php';
