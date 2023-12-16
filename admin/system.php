<?php
use tangible\template_system;
use tangible\date;

/**
 * Module loader: When there are mulitple plugins with the same module, this
 * loads the newest version.
 */
new class extends \stdClass {

  public $name = 'tangible_template_system';

  public $version;

  public $url;
  public $path;
  public $file_path;

  public $has_plugin = [];

  function __construct() {

    $this->version = include __DIR__.'/../version.php';

    $name     = $this->name;
    $priority = 99999999 - absint( $this->version );

    remove_all_actions( $name, $priority ); // Ensure single instance of version
    add_action( $name, [ $this, 'load' ], $priority );

    /**
     * Entire template system and all its modules are loaded at action
     * `plugins_loaded` hook, priority 0.
     */
    add_action('plugins_loaded', function() use ( $name ) {
      if ( ! did_action( $name )) do_action( $name );
    }, 0);

    $this->path      = __DIR__;
    $this->file_path = __FILE__;
    $this->url       = plugins_url( '/', realpath( __FILE__ ) );
  }

  // Dynamic methods
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) {
      return call_user_func_array( $this->$method, $args );
    }
    $caller = current( debug_backtrace() );
    trigger_error( "Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> on line <b>{$caller['line']}</b><br>", E_USER_WARNING );
  }

  function load() {

    remove_all_actions( $this->name ); // First one to load wins

    tangible_template_system( $this );

    $system = $plugin = $this;

    /**
     * Template System - New module organization
     */
    require_once __DIR__.'/../core.php';

    $loop  = template_system::$loop;
    $logic = template_system::$logic;
    $html  = template_system::$html;

    // Backward compatibility
    $system->has_plugin = template_system\get_active_plugins();

    require_once __DIR__ . '/post-types/index.php';
    require_once __DIR__ . '/editor/index.php';
    require_once __DIR__ . '/template-post/index.php';
    require_once __DIR__ . '/template-assets/index.php';
    require_once __DIR__ . '/location/index.php';
    require_once __DIR__ . '/universal-id/index.php';
    require_once __DIR__ . '/import-export/index.php';

    $ready_hook = "{$system->name}_ready";

    do_action( $ready_hook, $system );
    remove_all_actions( $ready_hook );

    add_action('plugins_loaded', function() use ( $system ) {

      // For any callbacks that registered later
      do_action( "{$system->name}_ready", $system );

    }, 12); // After plugins register
  }

  function ready( $callback ) {
    if ( did_action( "{$this->name}_ready" ) ) {
      return $callback( $this );
    }
    add_action( "{$this->name}_ready", $callback );
  }

  /**
   * Mock $plugin methods during transition from plugin to module
   */
  function is_multisite() {
    return false;
  }
  function get_settings() {
    return [];
  }
  function update_settings() {}
};

if ( ! function_exists( 'tangible_template_system' ) ) :

  function tangible_template_system( $arg = false ) {
    static $o;
    return $arg === false ? $o : ( $o = $arg );
  }

endif;
