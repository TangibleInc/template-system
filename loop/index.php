<?php
/**
 * Loop module
 *
 * Generic, extensible loops: post, user, taxonomy, items.
 *
 * Depends on Date and HTML modules in the plugin framework.
 */

require __DIR__ . '/tangible-module.php';

if ( ! function_exists( 'tangible_loop' ) ) :
function tangible_loop( $type = false, $args = [] ) {
  static $loop;
  return is_a($type, 'TangibleModule')
    ? ($loop = $type->latest)
    : ($type !== false && $loop
      ? $loop->create_type($type, $args)
      : $loop
    )
  ;
}
endif;

return tangible_loop(new class extends TangibleModule {

  public $name    = 'tangible_loop';
  public $version = '20220512';
  public $url     = '';
  public $state   = [];

  function __invoke( $type, $args = [] ) {
    return $this->create_type($type, $args);
  }

  function load_latest_version() {

    $loop = $this;

    $loop->file_path = __FILE__;
    $loop->url = plugins_url( '/', __FILE__ );

    require_once __DIR__ . '/utils/index.php';
    require_once __DIR__ . '/context/index.php';

    require_once __DIR__ . '/type/index.php';
    require_once __DIR__ . '/types/index.php';
    require_once __DIR__ . '/field/index.php';

    add_action('tangible_modules_ready', function() use ($loop) {

      /**
       * Some loop types' fields depend on HTML module to render, for example, image tags; and
       * Date module for date formatting and operations.
       */
      $loop->html = tangible_html();
      $loop->date = tangible_date();

      require_once __DIR__ . '/types/calendar/index.php';

      /**
       * Provide hook for plugins to register new loop types.
       * Template module depends on this for its features.
       */

      do_action('tangible_loop_prepare', $loop);
    });
  }
});
