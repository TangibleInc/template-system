<?php

(include __DIR__ . '/module-loader.php')(new class {

  public $name = 'tangible_logic';
  public $version = '20240611';

  function load() {
    require_once __DIR__ . '/index.php';
  }
});
