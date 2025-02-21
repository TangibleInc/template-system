<?php
/**
 * Language module
 * 
 * Implements dynamic template tags with extensible content type loops and
 * logic conditions. Previously called Template module.
 *
 * It integrates feature modules such as Loop, Logic, HTML, Date, and others
 * from /framework and /modules.
 */

use tangible\ajax;
use tangible\date;
use tangible\framework;
use tangible\html;
use tangible\select;
use tangible\template_system;

if ( ! function_exists( 'tangible_template' ) ) :
  function tangible_template( $arg = false ) {
    static $html;
    return !$html
      ? ( $html = $arg )
      : ( $arg !== false ? html\render_with_catch_exit( $arg ) : $html );
  }
endif;

return tangible_template(new class extends stdClass {

  public $name = 'tangible_template';
  public $version;

  public $html;
  public $system;

  function __construct() {

    $this->system = tangible_template_system();
    $this->version = $this->system->version;

    /**
     * HTML module is the basis of Language module.
     * 
     * It used to be a separate module in the plugin framework. Its features
     * are used by the Loop module, for example, to build an image tag with
     * attributes.
     */
    $this->html = $html = $this;

    require_once __DIR__ . '/html/index.php';

    $html->path      = __DIR__;
    $html->file_path = __FILE__;
    $html->url       = framework\module_url( __FILE__ );
    $html->version = $this->version;

    /**
     * Deprecating use of global functions or locally scoped variables like
     * below. Use namespaced functions under `tangible`.
     */
    $system    = $this->system;
    $loop      = $system->loop  = $html->loop  = template_system::$loop;
    $logic     = $system->logic = $html->logic = template_system::$logic;
    $system->html = $html;

    // @see /framework
    $system->date = $html->date = tangible\date();
    $system->ajax = tangible\ajax\legacy();
    $system->interface = tangible\interfaces\legacy();

    /**
     * Template language
     */

    require_once __DIR__ . '/utils/index.php';
    require_once __DIR__ . '/tags/index.php';
    require_once __DIR__ . '/format/index.php';
    require_once __DIR__ . '/logic/index.php';
    require_once __DIR__ . '/control/index.php';
    require_once __DIR__ . '/definition.php';

    // Page life cycle
    require_once __DIR__ . '/enqueue/index.php';
    require_once __DIR__ . '/actions/index.php';
    require_once __DIR__ . '/ajax/index.php';

    // For themes: first action hook available after functions.php is loaded.
    add_action('after_setup_theme', function() use ( $html ) {

      // Use this action to load templates
      do_action( 'tangible_templates_ready', $html );
    });
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
});
