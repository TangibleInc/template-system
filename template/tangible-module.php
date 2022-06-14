<?php
/**
 * Tangible object and versioned module - 20200206
 *
 * These are "frozen" and must be back/forward compatible.
 * If any are modified, you must update all plugins/modules that use them!
 */

if ( ! trait_exists( 'TangibleObject' ) ) :

  /**
   * Object with dynamic methods bound to instance
   */
  trait TangibleObject {

    // Dynamic methods
    function __call( $method = '', $args = [] ) {
      if ( isset( $this->$method ) ) {
        return call_user_func_array( $this->$method, $args );
      }
      $caller   = current( debug_backtrace() );
      $obj_name = isset( $this->name ) ? $this->name : 'tangible_object';
      echo "Warning: Undefined method \"$method\" for {$obj_name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>";
    }

    // Bind instance to added methods
    function __set( $name, $value ) {
      $this->$name = is_object($value) && ($value instanceof Closure) ? $value->bindTo( $this, $this ) : $value;
    }
  }

endif;


if ( ! function_exists( 'tangible_object' ) ) :

  /**
   * Create object with dynamic methods and properties
   */
  function tangible_object( $props = [] ) {

    $o = new class {
      use TangibleObject;
      public $name = 'tangible_object';
    };

    foreach ( $props as $key => $value ) {
      $o->{$key} = $value;
    }

    return $o;
  };

endif;


if ( ! class_exists( 'TangibleModule' ) ) :

  /**
   * Module with versioned instances
   */
  class TangibleModule {

    // Support dynamically added methods
    use TangibleObject;

    // Shared among all modules
    static $module_states = [];

    /**
     * Generic instance properties
     */

    // Shared among instances of a module
    public $module_state = [];
    public $global_state  = [];

    public $current;
    public $latest;

    // Name of action hook when this version instance is loaded
    public $ready      = '';
    public $ready_done = false;

    // Name of action hook when latest version instance is loaded
    public $latest_ready      = '';
    public $latest_ready_done = false;

    /**
     * Instance properties - Modules should be override these
     */

    public $name    = 'tangible_module';
    public $version = '00000000'; // YYYYMMDD
    public $state   = [];

    function load_version() {}
    function load_latest_version() {}

    /**
     * Load this version if not loaded already
     *
     * If a module defines its own constructor, it must call parent::__construct();
     */
    function __construct() {

      $this->ready        = "{$this->name}__{$this->version}__ready";
      $this->latest_ready = "{$this->name}__latest__ready";
      $this->module_ready = "{$this->name}_ready";

      if ( ! isset( self::$module_states[ $this->name ] ) ) {
        self::$module_states[ $this->name ] = [
          'versions' => [],
          'latest'   => $this,
          'current'  => $this,
          'state'    => [],
        ];
      }

      $this->module_state = &self::$module_states[ $this->name ];
      $this->global_state = &$this->module_state['state'];

      $versions = &$this->module_state['versions'];
      $current  = $this->current = &$this->module_state['current'];
      $latest   = $this->latest = &$this->module_state['latest'];

      // This version is already loaded
      if ( isset( $versions[ $this->version ] ) ) {
        $current = $versions[ $this->version ];
        return;
      }

      $current = $versions[ $this->version ] = $this;

      // This version is currently the newest
      if ( ! isset( $latest ) || version_compare( $this->version, $latest->version ) > 0 ) {
        $this->latest = $this;
      }

      $this->load_version();

      // Reserve 0~5 for plugin framework
      add_action( 'plugins_loaded', [ $this, 'all_versions_loaded' ], 6 );
    }

    function all_versions_loaded() {

      if ( !$this->latest_ready_done && $this->is_latest_version() ) {

        // Load latest version (once only per module) and run hook

        $this->module_state['current'] = $this;

        foreach ( $this->module_state['versions'] as $module ) {
          $module->latest = $this;
        }

        $this->load_latest_version();

        $this->latest_ready_done = true;

        do_action( $this->latest_ready, $this );

        $module = $this;
        add_action('init', function() use ($module) {
          do_action($module->module_ready, $module);
        }, 0);
      }

      // Run this version hook after latest loaded

      $this->ready_done = true;
      do_action( $this->ready, $this );
    }

    // Utility methods

    function is_latest_version() {
      return $this->get_latest_version() === $this;
    }

    function get_latest_version() {
      return $this->module_state['latest'];
    }

    function on_ready( $fn ) {
      $latest = $this->get_latest_version();
      if ($this->latest_ready_done) return $fn( $latest );
      add_action($this->latest_ready, function( $latest ) use ( $fn ) {
        return $fn( $latest );
      });
    }
  }

endif;
