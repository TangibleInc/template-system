<?php

use Tangible as tangible;

if (!class_exists('Tangible')) {
  class Tangible {
    static $state;
  };
  tangible::$state = (object) [
    'version' => '0'
  ];
}

new class {

  public $name = 'tangible';
  public $version = '20231212'; // Automatically updated with npm run version

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

    tangible::$state->version = $this->version;

    // require_once __DIR__ . '/admin/index.php';
    require_once __DIR__ . '/api/index.php';
    // require_once __DIR__ . '/auth/index.php';
    // require_once __DIR__ . '/date/index.php';
    require_once __DIR__ . '/format/index.php';
    // require_once __DIR__ . '/hjson/index.php';
    // require_once __DIR__ . '/html/index.php';
    require_once __DIR__ . '/log/index.php';
    // require_once __DIR__ . '/plugin/index.php';
    // require_once __DIR__ . '/rest/index.php';

    do_action($this->name . '_ready');
  }
};
