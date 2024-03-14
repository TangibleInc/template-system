<?php
namespace Tests\Integrations;
use tangible\template_system;

/**
 * - [Register ACF fields](https://www.advancedcustomfields.com/resources/register-fields-via-php/)
 */

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
