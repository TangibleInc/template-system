<?php
namespace tangible;
use tangible\framework as framework;

if (!class_exists('tangible\\framework')) {
  class framework {
    static $state;
  };
  framework::$state = (object) [];
}

(include __DIR__ . '/module-loader.php')(new class {

  public $name = 'tangible_framework';
  public $version = '20241119';

  function load() {

    framework::$state->version = $this->version;
    framework::$state->path = __DIR__;
    framework::$state->url = untrailingslashit(plugins_url('/', __FILE__));

    // Load this first so others can use tangible\see()
    require_once __DIR__ . '/log/index.php';

    require_once __DIR__ . '/admin/index.php';
    require_once __DIR__ . '/ajax/index.php';
    require_once __DIR__ . '/api/index.php';
    require_once __DIR__ . '/date/index.php';
    require_once __DIR__ . '/format/index.php';
    require_once __DIR__ . '/hjson/index.php';
    require_once __DIR__ . '/interface/index.php';
    require_once __DIR__ . '/markdown/index.php';
    require_once __DIR__ . '/object/index.php';
    require_once __DIR__ . '/plugin/index.php';
    require_once __DIR__ . '/preact/index.php';
    require_once __DIR__ . '/select/index.php';

    do_action($this->name . '_ready');
  }
});
