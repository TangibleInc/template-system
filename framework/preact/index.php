<?php
namespace tangible;
use tangible\preact;
use tangible\framework;

class preact {
  static $state;
}

preact::$state = (object) [
  'version' => framework::$state->version,
  'path' => __DIR__,
  'url' => untrailingslashit(plugins_url( '/', __FILE__ )),
];

require_once __DIR__.'/enqueue.php';
