<?php
/**
 * Loop module
 *
 * Generic, extensible loops: post, user, taxonomy, items.
 *
 * Depends on Date and HTML modules in the plugin framework.
 */
if ( ! function_exists( 'tangible_loop' ) ) :
  function tangible_loop( $type = false, $args = [] ) {
    static $o;
    return is_object( $type )
    ? ( $o = $type )
    : ( $type !== false && $o
      ? $o->create_type( $type, $args )
      : $o
    );
  }
endif;

return tangible_loop(new class {

  public $name    = 'tangible_loop';
  public $url     = '';
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
    echo "Warning: Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>";
  }

  function __invoke( $type, $args = [] ) {
    return $this->create_type( $type, $args );
  }

  function load() {

    $loop = $this;

    $loop->path      = __DIR__;
    $loop->file_path = __FILE__;
    $loop->url       = plugins_url( '/', __FILE__ );

    require_once __DIR__ . '/utils/index.php';
    require_once __DIR__ . '/context/index.php';

    add_action('plugins_loaded', function() use ( $loop ) {

      /**
       * Some loop types' fields depend on HTML module to render, for example,
       * image tags; and Date module for date formatting and conversions.
       */
      $loop->html = tangible_template();
      $loop->date = tangible_date();

      require_once __DIR__ . '/type/index.php';
      require_once __DIR__ . '/types/index.php';
      require_once __DIR__ . '/field/index.php';

      require_once __DIR__ . '/types/calendar/index.php';

      /**
       * Provide hook for plugins to register new loop types.
       * Template module depends on this for its features.
       */

      do_action( 'tangible_loop_prepare', $loop );
    }, 8); // After plugin framework
  }
});
