<?php
/**
 * Interface module
 */

if ( ! function_exists( 'tangible_interface' ) ) :
function tangible_interface( $module = false ) {
  static $o;
  return is_object( $module ) ? ( $o = $module ) : $o;
}
endif;

return tangible_interface(new class {

  public $name    = 'tangible_interface';

  function __construct() {
    $this->version = tangible_template_system()->version;
    $this->load();
  }

  // Dynamic methods
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) return call_user_func_array( $this->$method, $args );
    $caller = current( debug_backtrace() );
    trigger_error("Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>", E_USER_WARNING);
  }

  function load() {

    $this->path      = __DIR__;
    $this->file_path = __FILE__;

    $this->url        = plugins_url( '/', realpath( __FILE__ ) );
    $this->assets_url = $this->url . 'assets/';

    $interface = $this;

    require_once __DIR__ . '/includes/index.php';
  }
});
