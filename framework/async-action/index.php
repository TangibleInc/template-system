<?php
namespace tangible;

function register_async_action($config) {

  static $register;

  if (!$register) {
    $register = require_once __DIR__.'/register.php';
  }

  return $register( $config );
};
