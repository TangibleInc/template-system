<?php
/**
 * HTML module
 *
 * Implements an HTML processor to provide dynamic template tags.
 */

namespace tangible;

class html {
  static $state;
}

html::$state = $html;

require_once __DIR__ . '/tag/index.php';
require_once __DIR__ . '/parse/index.php';
require_once __DIR__ . '/render/index.php';

require_once __DIR__ . '/tags/index.php';
require_once __DIR__ . '/utils/index.php';

require_once __DIR__ . '/legacy.php';
