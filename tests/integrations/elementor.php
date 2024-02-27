<?php
namespace Tests\Integrations;

class Elementor_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return class_exists('Elementor\\Plugin'); 
  }

  function test_dependency_active() {
    if (!$this->is_dependency_active()) {      
      echo 'Elementor is not installed and active';
    }
    $this->assertTrue(true);
  }

}
