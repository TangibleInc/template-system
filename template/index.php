<?php
/**
 * Tangible Template module
 *
 * Implements dynamic template tags with extensible content type loops and logic conditions.
 *
 * It integrates features from the Loop, Logic, Interface modules; as well as
 * HTML and Date modules in the Tangible Framework.
 */

use tangible\date;
use tangible\ajax;

if ( ! function_exists( 'tangible_template' ) ) :
  function tangible_template( $arg = false ) {
    static $html;
    return is_object( $arg )
      ? ( $html = $arg )
      : ( $html && $arg !== false ? $html->render_with_catch_exit( $arg ) : $html );
  }
endif;

return tangible_template(new class extends stdClass {

  public $name    = 'tangible_template';
  public $version = '0';

  public $html;
  public $system;

  function __construct() {

    $this->system = tangible_template_system();
    $this->version = $this->system->version;

    $this->load();
  }

  // Dynamic methods
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) return call_user_func_array( $this->$method, $args );
    $caller = current( debug_backtrace() );
    trigger_error( "Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> on line <b>{$caller['line']}</b><br>", E_USER_WARNING );
  }

  function load() {

    /**
     * Template module base is called HTML module
     *
     * It used to be bundled in the plugin framework, but was moved into
     * the Template System to remove dependency, and for ease of development.
     *
     * HTML features are used by the Loop module, for example, to build
     * an image tag with attributes.
     */
    $this->html = $html = $this;

    require_once __DIR__ . '/html/index.php';

    /**
     * Plugin framework is deprecated and replaced by modules in /framework
     */
    // $framework = tangible();
    $system = $this->system;

    $loop      = $system->loop =  $html->loop = tangible_loop();
    $logic     = $system->logic = $html->logic = tangible_logic();
    $interface = $system->interface = $html->interface = tangible_interface();

    $system->html = $html;
    $system->date = $html->date = tangible\date();
    $system->ajax = tangible\ajax\legacy();

    /**
     * Template language
     */

    $html->path      = __DIR__;
    $html->file_path = __FILE__;
    $html->url       = plugins_url( '/', __FILE__ );
    $html->version = $this->version;

    require_once __DIR__ . '/utils/index.php';
    require_once __DIR__ . '/tags/index.php';
    require_once __DIR__ . '/format/index.php';
    require_once __DIR__ . '/logic/index.php';
    require_once __DIR__ . '/content/index.php';
    require_once __DIR__ . '/control/index.php';

    // Page life cycle
    require_once __DIR__ . '/enqueue/index.php';
    require_once __DIR__ . '/actions/index.php';
    require_once __DIR__ . '/ajax/index.php';

    // Modules
    require_once __DIR__ . '/module-loader/index.php';

    require_once __DIR__ . '/../modules/index.php';

    $plugin = $system;
    require_once __DIR__ . '/../integrations/index.php';

    // For themes: first action hook available after functions.php is loaded.
    add_action('after_setup_theme', function() use ( $html ) {

      // Use this action to load templates
      do_action( 'tangible_templates_ready', $html );
    });
  }
});
