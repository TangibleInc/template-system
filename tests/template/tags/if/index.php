<?php
namespace Tests\Template\Tags;

class If_TestCase extends \WP_UnitTestCase {
    /**
     * If else condition in HTML attribute
     * @link https://discourse.tangible.one/t/if-else-condition-in-html-attribute/954
     */
  public function test_template_tags_if_else_condition_in_html_attribute_954() {
      $template  = '<Set href_value>home</Set>';
      $template .= '<a href="{If variable=href_value value=home}{Url home /}{Else /}{Url current /}{/If}">Click here.</a>';
    $this->assertEquals( '<a href="' . get_site_url() . '">Click here.</a>', tangible_template( $template ) );
  }

}
