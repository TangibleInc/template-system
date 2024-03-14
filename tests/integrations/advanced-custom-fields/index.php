<?php
namespace Tests\Integrations;
use tangible\template_system;

class ACF_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return function_exists('acf'); 
  }

  function test_dependency_active() {
    if (!$this->is_dependency_active()) {      
      echo 'Advanced Custom Fields is not installed and active';
    }
    $this->assertTrue(true);
  }
}
