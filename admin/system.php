<?php
/**
 * The System module is being replaced by new code organization in ../core.php.
 */
use tangible\template_system;
use tangible\date;

if (!function_exists('tangible_template_system')) {
  function tangible_template_system( $arg = false ) {
    static $o;
    return $arg === false ? $o : ( $o = $arg );
  }
}

(include __DIR__.'/../module-loader.php')(new class extends \stdClass {

  public $name = 'tangible_template_system';
  public $version = '20241119';

  public $url;
  public $path;
  public $file_path;

  public $has_plugin = [];

  function load() {
    $this->path      = __DIR__;
    $this->file_path = __FILE__;
    // Keep trailing slash for backward compatibility
    $this->url       = plugins_url('/', __FILE__);

    tangible_template_system( $this );
    $system = $plugin = $this;

    require_once __DIR__.'/../core.php';

    // Backward compatibility
    $system->has_plugin = template_system\get_active_plugins();

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

  // Mock $plugin methods during transition from plugin to module
  function is_multisite() { return false; }
  function get_settings() { return []; }
  function update_settings() {}

  // Dynamic methods for backward compatibility
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) {
      return call_user_func_array( $this->$method, $args );
    }
    $caller = current( debug_backtrace() );
    trigger_error( "Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> on line <b>{$caller['line']}</b><br>", E_USER_WARNING );
  }
});
