<?php
namespace Tests\Admin;
use tangible\template_system;

class Import_Export extends \WP_UnitTestCase {

  function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });


    // Deprecated method
    $plugin = tangible_template_system();
    $this->assertTrue(isset($plugin->export_templates));
    $this->assertTrue(isset($plugin->import_templates));

    $export_data = $plugin->export_templates([]);
    $this->assertTrue(is_null($error));
    $this->assertTrue(!empty($export_data));

    $import_resut = $plugin->import_templates([]);
    $this->assertTrue(is_null($error));
    $this->assertTrue(!empty($import_resut));

    // Export

    $namespace = 'tangible\\template_system';
    $this->assertTrue(is_callable($namespace.'\\export_templates'));

    $export_data = template_system\export_templates([
      'export_rules' => [
        [ 'field' => 'tangible_template', 'operator' => 'all' ]
      ]
    ]);
    $this->assertTrue(is_null($error));
    $this->assertTrue(!empty($export_data));

    // Import

    $import_resut = template_system\import_templates([]);
    $this->assertTrue(is_null($error));
    $this->assertTrue(!empty($import_resut));
  }
}
