<?php
namespace tangible;
use tangible\admin;
use tangible\framework;

class admin {
  static $state;
}

admin::$state = (object) [
  'version' => framework::$state->version,
  'url'     => framework::$state->url . '/admin',
  'path'    => framework::$state->path . '/admin',
];

require_once __DIR__ . '/notice/index.php';
