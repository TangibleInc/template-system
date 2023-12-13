<?php

use tangible\template_system;

/**
 * Module loader: When there are mulitple plugins with the same module, this
 * loads the newest version.
 * 
 * Currently moving all child modules out of /system into independent modules at
 * project root, while removing dependencies on Plugin Framework, jQuery, etc.
 * @see ../core
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

    add_action('plugins_loaded', function() use ( $name ) {
      if ( ! did_action( $name )) do_action( $name );
    }, 0);

    $this->path      = __DIR__;
    $this->file_path = __FILE__;
    $this->url       = plugins_url( '/', realpath( __FILE__ ) );
  }

  // Dynamic methods
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) return call_user_func_array( $this->$method, $args );
    $caller = current( debug_backtrace() );
    trigger_error( "Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>", E_USER_WARNING );
  }

  function load() {

    remove_all_actions( $this->name ); // First one to load wins

    tangible_template_system( $this );

    $plugin = $this;

    /**
     * Template System - New module organization
     */
    require_once __DIR__.'/../core.php';

    // Backward compatibility
    $plugin->has_plugin = template_system\get_active_plugins();

    // Wait for latest version of plugin framework
    add_action('plugins_loaded', function() use ( $plugin ) {

      /**
       * Template post types and fields, editor, management
       */

      $loop      = $plugin->loop = tangible_loop();
      $logic     = $plugin->logic = tangible_logic();
      $html      = $plugin->html = tangible_template();
      $interface = $plugin->interface = tangible_interface();
      $ajax      = $plugin->ajax = $framework->ajax();

      $system = &$plugin;

      
      /**
       * Template post types
       */
      require_once __DIR__ . '/post-types/index.php';

      // Replace plugin framework modules until framework is removed
      $framework->register_sortable_post_type =
        $plugin->register_sortable_post_type;
      $framework->register_post_type_with_duplicate_action =
        $plugin->register_post_type_with_duplicate_action;

      require_once __DIR__ . '/editor/index.php';
      require_once __DIR__ . '/template-post/index.php';

      require_once __DIR__ . '/template-assets/index.php';
      require_once __DIR__ . '/location/index.php';
      require_once __DIR__ . '/universal-id/index.php';
      require_once __DIR__ . '/import-export/index.php';

      require_once __DIR__ . '/../extensions/index.php';
      require_once __DIR__ . '/../integrations/index.php';

      $ready_hook = "{$plugin->name}_ready";

      do_action( $ready_hook, $plugin );
      remove_all_actions( $ready_hook );

    }, 8); // Before plugins register

    add_action('plugins_loaded', function() use ( $plugin ) {

      // For any callbacks that registered later
      do_action( "{$plugin->name}_ready", $plugin );

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
