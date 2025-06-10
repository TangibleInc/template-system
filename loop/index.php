<?php
use tangible\framework;

if ( ! function_exists( 'tangible_loop' ) ) :
  function tangible_loop( $type = false, $args = [], $context = [] ) {
    static $o;
    return is_object( $type )
    ? ( $o = $type )
    : ( $type !== false && $o
      ? $o->create_type( $type, $args, $context )
      : $o
    );
  }
endif;

return new class extends stdClass {

  public $name  = 'tangible_loop';
  public $url   = '';
  public $state = [];

  public $version;
  public $path;
  public $file_path;

  public $html;
  public $date;

  function __construct() {
    $this->system = tangible_template_system();
    $this->version = $this->system->version;

    $loop = $this;
    $loop->path      = __DIR__;
    $loop->file_path = __FILE__;
    $loop->url       = framework\module_url( __FILE__ );

    tangible_loop( $this );

    require_once __DIR__ . '/utils/index.php';
    require_once __DIR__ . '/context/index.php';

    require_once __DIR__ . '/type/index.php';
    require_once __DIR__ . '/types/index.php';
    require_once __DIR__ . '/field/index.php';

    require_once __DIR__ . '/types/calendar/index.php';
  }
  
  /**
   * Dynamic methods - Deprecated in favor of functions under namespace
   */
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) {
      return call_user_func_array( $this->$method, $args );
    }
    $caller = current( debug_backtrace() );
    trigger_error( "Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> on line <b>{$caller['line']}</b><br>", E_USER_WARNING );
  }

  function __invoke( $type, $args = [], $context = [] ) {
    return $this->create_type( $type, $args, $context );
  }
};
