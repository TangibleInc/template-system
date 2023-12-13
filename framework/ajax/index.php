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
  'url' => plugins_url( '/', __FILE__ ),
];
