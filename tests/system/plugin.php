<?php
namespace Tangible\TemplateSystem;
use Tangible\TemplateSystem as system;

class System_Core_Plugin extends \WP_UnitTestCase {

  /**
   * Backward compatibility: $system->has_plugin is deprecated in favor of
   * system\get_active_plugins().
   * @ee /core/plugin.php
   */
  function test_system_has_plugin() {

    $system = tangible_template_system();

    $this->assertTrue( isset($system->has_plugin) );
    $this->assertTrue( function_exists(__NAMESPACE__.'\\get_active_plugins') );

    $has_plugin = system\get_active_plugins();

    $plugins = [
      'loops',
      'loops_pro',
      'blocks_editor',
      'blocks_pro',
      'template_system'
    ];

    foreach ($plugins as $key) {

      $this->assertTrue( isset($system->has_plugin[$key]), "has_plugin['$key']" );
      $this->assertTrue( isset($has_plugin[$key]), "\$has_plugin['$key']" );
    }

  }

  function test_system_is_plugin() {
    $this->assertTrue( is_bool(system\is_plugin()) );
  }  
}
