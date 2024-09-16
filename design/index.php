<?php
namespace tangible;
use tangible\design as design;
use tangible\framework;

if (!class_exists('tangible\\design')) {
  class design {
    static $state;
  };
  design::$state = (object) [];
}

(include __DIR__ . '/module-loader.php')(new class {

  public $name = 'tangible_design';
  public $version = '20240403';

  function load() {

    design::$state->version = $this->version;
    design::$state->path = __DIR__;
    design::$state->url = untrailingslashit(plugins_url('/', __FILE__));

    require_once __DIR__ . '/includes/index.php';

    do_action($this->name . '_ready');
  }
});
