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

// TODO: Remove module loader after Design module updated to be Sass/JS only
(include __DIR__ . '/../module-loader.php')(new class {

  public $name = 'tangible_design';
  public $version;

  function __construct() {
    $this->version = framework::$state->version;
  }

  function load() {

    design::$state->version = $this->version;
    design::$state->path = __DIR__;
    design::$state->url = untrailingslashit(plugins_url('/', __FILE__));
    
    require_once __DIR__ . '/admin.php';
    require_once __DIR__ . '/enqueue.php';
    
    do_action($this->name . '_ready');
  }
});
