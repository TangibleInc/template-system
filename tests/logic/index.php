<?php
namespace Tests\Logic;

class Logic_Test_Case extends \WP_UnitTestCase {
  public function test_legacy_logic_module() {

    $this->assertTrue(function_exists('tangible_logic'));

    $logic = tangible_logic();

    $this->assertTrue( isset($logic->extend_rules_by_category) );
    $this->assertTrue( is_callable([$logic, 'extend_rules_by_category']) );
  }
}
