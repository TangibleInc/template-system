<?php
namespace Tests\Template;
/**
 * Control variable type
 */
class Control_Variable_Type extends \WP_UnitTestCase {
  function test_if_control() {

    $html = tangible_template();

    $html->clear_control_variables();

    // Undefined control
    $this->assertEquals('FALSE',
      $html->render('<If control=test>TRUE<Else />FALSE</If>')
    );
    $this->assertEquals('TRUE',
      $html->render('<If control=test is value="">TRUE<Else />FALSE</If>')
    );

    $html->set_control_variable('test', '123');

    $this->assertEquals('123',
      $html->render('<Get control=test />')
    );

    $this->assertEquals('TRUE',
      $html->render('<If control=test>TRUE</If>')
    );
    $this->assertEquals('TRUE',
      $html->render('<If control=test is_not value="">TRUE<Else />FALSE</If>')
    );
    
    $this->assertEquals('TRUE',
      $html->render('<If control=test value=123>TRUE</If>')
    );    
    $this->assertEquals('FALSE',
      $html->render('<If control=test value=456>TRUE<Else />FALSE</If>')
    );    
  }
}
