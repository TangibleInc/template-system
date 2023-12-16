<?php
namespace Tests\Language;

use tangible\template_system;

class Definition extends \WP_UnitTestCase {
  function test() {

    $def = template_system\get_language_definition();

    $this->assertTrue( !empty($def) );
    $this->assertTrue( isset($def['tags']) );
  }
}
