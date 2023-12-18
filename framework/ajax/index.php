<?php
namespace tangible;
use tangible\ajax;
use tangible\framework;

class ajax {
  static $state;
}

ajax::$state = (object) [
  'version' => framework::$state->version,
  'path' => __DIR__,
  'url' => untrailingslashit(plugins_url( '/', __FILE__ )),
];

require_once __DIR__.'/enqueue.php';
require_once __DIR__.'/nonce.php';
require_once __DIR__.'/legacy.php';
require_once __DIR__.'/actions.php';
