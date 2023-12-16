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

  /**
   * @see https://bitbucket.org/tangibleinc/blocks/issues/3/block-control-logic-not-working-when
   * @see https://bitbucket.org/tangibleinc/blocks/pull-requests/23
   */

  function test_if_control_empty() {

    $html = tangible_template();

    $html->clear_control_variables();

    // Default value is empty

    // "is" empty == true

    $template = '<If check="{Get control=loop_type}" is value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    $template = '<If control=loop_type is value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    // "is_not" empty == false

    $template = '<If check="{Get control=loop_type}" is_not value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    $template = '<If control=loop_type is_not value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    // Default comparison "exists" == false

    $template = '<If control=loop_type>TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    $template = '<If not control=loop_type>TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));


    // Non-empty value

    $html->set_control_variable('loop_type', 'one');

    // "is" empty == false

    $template = '<If check="{Get control=loop_type}" is value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    $template = '<If control=loop_type is value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    // "is_not" empty == true

    $template = '<If check="{Get control=loop_type}" is_not value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    $template = '<If control=loop_type is_not value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    // Default comparison "exists" == true

    $template = '<If control=loop_type>TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    $template = '<If not control=loop_type>TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));


    // Value set to empty

    $html->set_control_variable('loop_type', '');

    // "is" empty == true

    $template = '<If check="{Get control=loop_type}" is value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    $template = '<If control=loop_type is value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    // "is_not" empty == false

    $template = '<If check="{Get control=loop_type}" is_not value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    $template = '<If control=loop_type is_not value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    // Default comparison "exists" == false

    $template = '<If control=loop_type>TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    $template = '<If not control=loop_type>TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));


    // Number 0 is *not* empty, nor equal to empty string

    $html->set_control_variable('loop_type', '0');

    // "is" empty == false

    $template = '<If check="{Get control=loop_type}" is value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    $template = '<If control=loop_type is value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

    // "is_not" empty == true

    $template = '<If check="{Get control=loop_type}" is_not value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    $template = '<If control=loop_type is_not value="">TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    // Default comparison "exists" === true

    $template = '<If control=loop_type>TRUE<Else />FALSE</If>';
    $this->assertEquals('TRUE', $html->render($template));

    $template = '<If not control=loop_type>TRUE<Else />FALSE</If>';
    $this->assertEquals('FALSE', $html->render($template));

  }
}
