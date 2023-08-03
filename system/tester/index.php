<?php
/**
 * Deprecated: Tester module
 * 
 * - Used in tests for [Template System Pro](https://bitucket.org/tangibleinc/template-system-pro)
 * - TODO: Rewrite to use PHPUnit, [wp-env](https://github.com/WordPress/gutenberg/tree/trunk/packages/env), and maybe [Playwright](https://playwright.dev/)
 */
$plugin->tester = function() use ( $plugin ) {
  static $tester;
  if ($tester) return $tester;

  $tester = new class {

    public $name = 'tangible_template_system_tester';
    public $mode = 'html'; // or 'json'

    function __construct() {
      $this->version   = tangible_template_system()->version;
      $this->path      = __DIR__;
      $this->file_path = __FILE__;
      $this->url       = plugins_url( '/', __FILE__ );
    }

    // Dynamic methods
    function __call( $method = '', $args = [] ) {
      if ( isset( $this->$method ) ) return call_user_func_array( $this->$method, $args );
      $caller = current( debug_backtrace() );
      trigger_error("Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> in <b>{$caller['line']}</b><br>", E_USER_WARNING);
    }
  };

  require_once __DIR__ . '/enqueue.php';
  require_once __DIR__ . '/report.php';
  require_once __DIR__ . '/group.php';
  require_once __DIR__ . '/test.php';

  return $tester;
};
