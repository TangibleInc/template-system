<?php
/**
 * Tangible Template module
 *
 * Implements dynamic template tags with extensible content type loops and logic conditions.
 *
 * It integrates features from the Loop, Logic, Interface modules; as well as HTML and Date
 * modules in the plugin framework.
 */

require __DIR__ . '/tangible-module.php';

if ( ! function_exists( 'tangible_template' ) ) :
function tangible_template( $arg = false ) {
  static $template;
  return is_a($arg, 'TangibleModule')
    ? ($template = $arg->latest)
    : ($arg !== false && $template
      ? $template->html->render( $arg )
      : $template->html
    )
  ;
}
endif;

return tangible_template(new class extends TangibleModule {

  public $name    = 'tangible_template';
  public $version = '20220519';

  function load_latest_version() {

    add_action('tangible_loop_prepare', function() {

      /**
       * Template module extends HTML module in plugin framework
       */
      $this->html = $html = tangible_html();

      /**
       * Loop module - Content type loops and fields
       * @see vendor/tangible/loop
       */
      $html->loop = $loop = tangible_loop();

      /**
       * Logic module - Conditional rules registry, evaluator, UI
       * @see vendor/tangible/logic
       */
      $html->logic = $logic = tangible_logic();

      /**
       * Interface module - Library of UI components
       * @see vendor/tangible/interface
       */
      $html->interface = $interface = tangible_interface();

      /**
       * Plugin framework
       *
       * Using case conversion utilities for format
       *
       * @see vendor/tangible/plugin-framework
       * @see vendor/tangible/plugin-framework/utils/convert
       */
      $html->framework = $framework = tangible();

      /**
       * Date module
       * @see vendor/tangible/plugin-framework/modules/date
      */
      $html->date = tangible_date();

      /**
       * Human JSON module
       * @see vendor/tangible/plugin-framework/modules/hjson
      */
      $html->hjson = $framework->hjson;

      /**
       * Main
       */

      $html->dir_path = __DIR__;
      $html->file_path = __FILE__;
      $html->url = plugins_url( '/', __FILE__ );
      $html->version = $this->version;

      // Utility functions
      require_once __DIR__.'/utils/index.php';

      // Dynamic tags
      require_once __DIR__.'/tags/index.php';

      // Format utilities
      require_once __DIR__.'/format/index.php';

      // Conditional logic rules
      require_once __DIR__.'/logic/index.php';

      // Content structure
      require_once __DIR__.'/content/index.php';

      // Page life cycle
      require_once __DIR__.'/enqueue/index.php';
      require_once __DIR__.'/actions/index.php';
      require_once __DIR__.'/ajax/index.php';

      // Modules
      require_once __DIR__.'/modules/index.php';
      require_once __DIR__.'/module-loader/index.php';

      // Integrations
      require_once __DIR__.'/integrations/index.php';

      // For themes: first action hook available after functions.php is loaded.
      add_action('after_setup_theme', function() use ($html) {

        // Use this action to load templates
        do_action('tangible_templates_ready', $html);
      });

    }, 0);
  }
});
