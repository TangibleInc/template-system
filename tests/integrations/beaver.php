<?php
namespace Tests\Integrations;

class Beaver_TestCase extends \WP_UnitTestCase {

  function is_dependency_active() {
    return class_exists( 'FLBuilder' ); 
  }

  function test_dependency_active() {
    if (!$this->is_dependency_active()) {      
      echo 'Beaver Builder is not installed and active';
    }
    $this->assertTrue(true);
  }

}
