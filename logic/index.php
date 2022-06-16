<?php
/**
 * Generic conditional logic UI
 */

require __DIR__ . '/tangible-module.php';

if ( ! function_exists( 'tangible_logic' ) ) {

  function tangible_logic( $instance = null ) {
    static $o;
    return is_a($instance, 'TangibleModule')
      ? ($o = $instance->latest)
      : $o
    ;
  }
}

if ( ! class_exists( 'TangibleLogic' ) ) {
  class TangibleLogic {}; // Backward compatibility
}

return tangible_logic(new class extends TangibleModule {

  public $name    = 'tangible_logic';
  public $version = '20220131';
  public $state   = [];

  function __construct() {
    $this->version = tangible_template_system()->version;
    parent::__construct();
  }

  function load_version() {

    $this->file_path = __FILE__;
    $this->url = plugins_url( '/', __FILE__ );

    // Backward compatibility
    $this->state['url'] = $this->url;
    $this->state['version'] = $this->version;
  }

  function load_latest_version() {

    $logic = $this;

    require __DIR__ . '/enqueue.php';
    require __DIR__ . '/evaluate/index.php';
    require __DIR__ . '/rules/index.php';

    require __DIR__ . '/v1/index.php';
  }
});
