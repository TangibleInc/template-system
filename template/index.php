<?php
/**
 * Tangible Template module
 *
 * Implements dynamic template tags with extensible content type loops and logic conditions.
 *
 * It integrates features from the Loop, Logic, Interface modules; as well as HTML and Date
 * modules in the plugin framework.
 */

if ( ! function_exists( 'tangible_template' ) ) :
  function tangible_template( $arg = false ) {
    static $html;
    return is_object( $arg )
      ? ( $html = $arg )
      : ( $html && $arg !== false ? $html->render( $arg ) : $html );
  }
endif;

return tangible_template(new class {

  public $name    = 'tangible_template';
  public $version = '0';

  function __construct() {

    $this->version = tangible_template_system()->version;

    // Depends on Loop module
    add_action( 'tangible_loop_prepare', [ $this, 'load' ], 0 );
  }

  // Dynamic methods
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) return call_user_func_array( $this->$method, $args );
    $caller = current( debug_backtrace() );
    trigger_error("Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>", E_USER_WARNING);
  }

  function load() {

    /**
     * Template module base is called HTML module
     *
     * It used to be bundled in the plugin framework, but was moved into
     * the Template System to remove dependency, and for ease of development.
     *
     * Some features are being used by the Loop module, for example, to build
     * an image tag with attributes.
     */
    $this->html = $html = $this;

    require_once __DIR__ . '/html/index.php';

    /**
     * Plugin framework
     *
     * Using:
     * - Case conversion utilities for format
     * - AJAX module
     * - HJSON module
     * - Date module
     *
     * @see vendor/tangible/plugin-framework
     * - utils/convert
     * - modules/ajax, hjson, date
     */
    $html->framework = $framework = tangible();

    // Loop module - Content type loops and fields
    $html->loop = $loop = tangible_loop();

    // Logic module - Conditional rules registry, evaluator, UI
    $html->logic = $logic = tangible_logic();

    // Interface module - Library of UI components
    $html->interface = $interface = tangible_interface();

    // Date module
    $html->date = tangible_date();

    // Human JSON module
    $html->hjson = $framework->hjson;

    /**
     * Template language
     */

    $html->path      = __DIR__;
    $html->file_path = __FILE__;
    $html->url       = plugins_url( '/', __FILE__ );

    $html->version = $this->version;

    // Utility functions
    require_once __DIR__ . '/utils/index.php';

    // Dynamic tags
    require_once __DIR__ . '/tags/index.php';

    // Format utilities
    require_once __DIR__ . '/format/index.php';

    // Conditional logic rules
    require_once __DIR__ . '/logic/index.php';

    // Content structure
    require_once __DIR__ . '/content/index.php';

    // Page life cycle
    require_once __DIR__ . '/enqueue/index.php';
    require_once __DIR__ . '/actions/index.php';
    require_once __DIR__ . '/ajax/index.php';

    // Modules
    require_once __DIR__ . '/module-loader/index.php';
    require_once __DIR__ . '/modules/index.php';

    // Integrations
    require_once __DIR__ . '/integrations/index.php';

    // For themes: first action hook available after functions.php is loaded.
    add_action('after_setup_theme', function() use ( $html ) {

      // Use this action to load templates
      do_action( 'tangible_templates_ready', $html );
    });
  }
});
