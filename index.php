<?php

new class {

  public $name = 'tangible_template_system';

  // Remember to update the version - Expected format: YYYYMMDD
  public $version     = '20220616';
  public $url;

  function __construct() {

    $name = $this->name;
    $priority = 99999999 - absint( $this->version );

    add_action( $name, [$this, 'load'], $priority );

    add_action('plugins_loaded', function() use ($name) {
      if (!did_action($name)) do_action($name);
    }, 0);

    $this->url = plugins_url( '/', realpath( __FILE__ ) );
  }

  // Dynamic methods
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) {
      return call_user_func_array( $this->$method, $args );
    }
    $caller   = current( debug_backtrace() );
    $obj_name = isset( $this->name ) ? $this->name : 'tangible_object';
    echo "Warning: Undefined method \"$method\" for {$obj_name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>";
  }

  function load() {

    $name = $this->name;
    $plugin = $system = $this;

    remove_all_filters($name); // First one to load wins
    tangible_template_system( $this );

    // Core features

    require_once __DIR__ . '/interface/index.php';
    require_once __DIR__ . '/loop/index.php';
    require_once __DIR__ . '/logic/index.php';
    require_once __DIR__ . '/template/index.php';

    // add_action('tangible_plugin_framework', function() use ($plugin) {
    tangible()->on_ready(function() use ($plugin) {

      $framework = tangible();

      $loop       = tangible_loop();
      $logic      = tangible_logic();
      $interface  = tangible_interface();
      $html       = tangible_template();

      // Template management

      require_once __DIR__.'/admin/index.php';
      require_once __DIR__.'/features/index.php';

      require_once __DIR__.'/integrations/index.php';

      // TODO: Convert to use Cloud Client module
      // require_once __DIR__.'/cloud/index.php';

      do_action("{$plugin->name}_ready", $this);
    });
  }

  // Mock $plugin methods during transition
  function update_settings() {}
  function get_settings() { return []; }
  function is_multisite() { return false; }
};

if ( ! function_exists('tangible_template_system') ):

function tangible_template_system( $arg = false ) {
  static $instance;
  return is_object($arg) ? ($instance = $arg) : $instance;
}

endif;
