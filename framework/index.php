<?php
namespace tangible;
use tangible\framework as framework;

if (!class_exists('tangible\\framework')) {
  class framework {
    static $state;
  };
  framework::$state = (object) [];
}

/**
 * Module loader: Ensure newest version is loaded when multiple plugins bundle
 * this module. Version number is automatically updated with `npm run version`.
 */
new class {

  public $name = 'tangible_framework';
  public $version = '20240312';

  function __construct() {

    $name     = $this->name;
    $priority = 99999999 - absint( $this->version );

    remove_all_filters( $name, $priority );
    add_action( $name, [ $this, 'load' ], $priority );

    $ensure_action = function() use ( $name ) {
      if ( ! did_action( $name ) ) do_action( $name );
    };

    if (doing_action('plugins_loaded') || did_action('plugins_loaded')) {
      $ensure_action();
    } else {
      add_action('plugins_loaded', $ensure_action, 0);
      add_action('after_setup_theme', $ensure_action, 0);
    }
  }

  function load() {
    remove_all_filters( $this->name ); // First one to load wins

    framework::$state->version = $this->version;
    framework::$state->path = __DIR__;
    framework::$state->url = untrailingslashit(plugins_url('/', __FILE__));;

    // Load this first so others can use tangible\see()
    require_once __DIR__ . '/log/index.php';

    require_once __DIR__ . '/admin/index.php';
    require_once __DIR__ . '/ajax/index.php';
    require_once __DIR__ . '/api/index.php';
    require_once __DIR__ . '/auth/index.php';
    require_once __DIR__ . '/date/index.php';
    require_once __DIR__ . '/format/index.php';
    require_once __DIR__ . '/hjson/index.php';
    require_once __DIR__ . '/html/index.php';
    require_once __DIR__ . '/interface/index.php';
    require_once __DIR__ . '/object/index.php';
    require_once __DIR__ . '/plugin/index.php';
    require_once __DIR__ . '/preact/index.php';
    require_once __DIR__ . '/select/index.php';

    do_action($this->name . '_ready');
  }
};
