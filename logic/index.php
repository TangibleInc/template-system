<?php
/**
 * Generic conditional logic UI
 */

if ( ! function_exists( 'tangible_logic' ) ) :
function tangible_logic( $module = false ) {
  static $o;
  return is_object( $module ) ? ( $o = $module ) : $o;
}
endif;

return tangible_logic(new class {

  public $name    = 'tangible_logic';
  public $state   = [];

  function __construct() {
    $this->version = tangible_template_system()->version;
    $this->load();
  }

  // Dynamic methods
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) {
      return call_user_func_array( $this->$method, $args );
    }
    $caller = current( debug_backtrace() );
    trigger_error("Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>", E_WARNING);
  }

  function load() {

    $this->path      = __DIR__;
    $this->file_path = __FILE__;
    $this->url       = plugins_url( '/', __FILE__ );

    // Backward compatibility
    $this->state['url']     = $this->url;
    $this->state['version'] = $this->version;

    $logic = $this;

    require __DIR__ . '/enqueue.php';
    require __DIR__ . '/evaluate/index.php';
    require __DIR__ . '/rules/index.php';

    require __DIR__ . '/v1/index.php';
  }
});
