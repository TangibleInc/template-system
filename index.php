<?php

require __DIR__ . '/tangible-module.php';

if ( ! function_exists('tangible_template_system') ):

function tangible_template_system( $arg = false ) {
  static $system;
  return ($arg===false && $system)
    ? $system
    : ($system = $arg)
  ;
}

endif;

new class {

  use TangibleObject;

  /**
   * Remember to update the version - Expected format: YYYYMMDD
   */
  public $version     = '20220615';
  public $action_name = 'tangible_template_system';

  function __construct() {

    /**
     * Ensure the latest version of this module gets loaded,
     * in case multiple plugins include it.
     */

    // Higheset version gets top priority
    $priority = 99999999 - absint( $this->version );
    $action_name = $this->action_name;

    add_action( $action_name, [$this, 'load'], $priority );

    // Run it early
    add_action('plugins_loaded', function() use ($action_name) {
      if (!did_action($action_name)) do_action($action_name);
    }, 0);
  }

  function load() {

    // First one to load wins
    remove_all_filters($this->action_name);

    $system = $this;

    require_once __DIR__ . '/interface/index.php';
    require_once __DIR__ . '/loop/index.php';
    require_once __DIR__ . '/logic/index.php';
    require_once __DIR__ . '/template/index.php';

    tangible_template_system( $this );

    do_action('tangible_template_system_ready', $this);
  }
};
