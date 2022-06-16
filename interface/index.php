<?php
/**
 * Interface module
 */

require __DIR__ . '/tangible-module.php';

if ( ! function_exists( 'tangible_interface' ) ) :
function tangible_interface( $module = false ) {
  static $interface;
  return is_a($module, 'TangibleModule')
    ? ($interface = $module->latest)
    : $interface
  ;
}
endif;

return tangible_interface(new class extends TangibleModule {

  public $name    = 'tangible_interface';
  public $version = '20210901';
  public $state   = [];

  function __construct() {
    $this->version = tangible_template_system()->version;
    parent::__construct();
  }

  function load_latest_version() {

    $interface = $this;

    $interface->path = __DIR__;
    $interface->file_path = __FILE__;

    $interface->url = plugins_url( '/', realpath( __FILE__ ) );
    $interface->assets_url = $interface->url . 'assets/';

    require_once __DIR__.'/includes/index.php';
  }
});
