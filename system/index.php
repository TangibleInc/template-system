<?php

new class extends stdClass {

  public $name = 'tangible_template_system';

  // Remember to update the version - Expected format: YYYYMMDD
  public $version = '20230508';
  public $url;
  public $path;
  public $file_path;

  public $has_plugin = [];
  public $is_plugin  = false;

  function __construct() {
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

    $this->has_plugin = [
      'loops'           => function_exists( 'tangible_loops_and_logic' ),
      'loops_pro'       => function_exists( 'tangible_loops_and_logic_pro' ),
      'blocks'          => function_exists( 'tangible_blocks' ),
      'blocks_editor'   => function_exists( 'tangible_blocks_editor' ),
      'blocks_pro'      => function_exists( 'tangible_blocks_pro' ),
      'template_system' => $this->is_plugin, // This module installed as plugin
    ];

    // Requires plugin framework
    if (
        ! defined( 'DOING_TANGIBLE_TESTS' )
        && ! $this->has_plugin['loops']
        && ! $this->has_plugin['blocks']
    ) {
        return;
    }

    $name   = $this->name;
    $plugin = $system = $this;

    remove_all_actions( $name ); // First one to load wins
    tangible_template_system( $this );

    /**
     * Currently consolidating all features to be internal to the template system,
     * removing dependecy on plugin framework and external modules.
     */

    require_once __DIR__ . '/../interface/index.php';
    require_once __DIR__ . '/../loop/index.php';
    require_once __DIR__ . '/../logic/index.php';
    require_once __DIR__ . '/../template/index.php';

    require_once __DIR__ . '/../tester/index.php';

    // Wait for latest version of plugin framework
    add_action('plugins_loaded', function() use ( $plugin ) {

      $framework = tangible();

      $loop      = $plugin->loop = tangible_loop();
      $logic     = $plugin->logic; // tangible_logic()
      $html      = $plugin->html = tangible_template();
      $interface = $plugin->interface = tangible_interface();
      $ajax      = $plugin->ajax = $framework->ajax();

      /**
       * Template post types and fields, editor, management
       */

      require_once __DIR__ . '/post-types/index.php';

      require_once __DIR__ . '/data.php';
      require_once __DIR__ . '/editor/index.php';
      require_once __DIR__ . '/fields.php';
      require_once __DIR__ . '/save.php';
      require_once __DIR__ . '/render/index.php';
      require_once __DIR__ . '/tag.php';

      require_once __DIR__ . '/template-assets/index.php';
      require_once __DIR__ . '/location/index.php';

      require_once __DIR__ . '/universal-id/index.php';
      require_once __DIR__ . '/import-export/index.php';

      require_once __DIR__ . '/../extensions/index.php';
      require_once __DIR__ . '/integrations/index.php';

      // TODO: Convert to use Cloud Client module
      // require_once __DIR__.'/cloud/index.php';

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

  function run_tests() {
    include __DIR__ . '/../tests/index.php';
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
