<?php
class Template_Tags_If_TestCase extends WP_UnitTestCase {
    /**
     * @link https://discourse.tangible.one/t/if-else-condition-in-html-attribute/954
     */
  public function test_template_tags_if_else_condition_in_html_attribute_954() {
      $template  = '<Set href_value>home</Set>';
      $template .= '<a href="{If variable=href_value value=home}{Url home /}{Else /}{Url current /}{/If}">Click here.</a>';
    $this->assertEquals( '<a href="' . get_site_url() . '">Click here.</a>', tangible_template( $template ) );
  }

    /**
     * @link https://discourse.tangible.one/t/if-is-not-singular-of-a-specific-post-type/804
     */
  public function test_template_tags_if_not_is_not_804() {
      $template  = '<Set _type>one</Set>';
      $template .= '<If variable="_type" not value="two">ok</If>';
      $this->assertEquals( 'ok', tangible_template( $template ) );

      $template = '<If variable="_type" not value="one">ok</If>';
      $this->assertEquals( '', tangible_template( $template ) );

      $template .= '<If variable="_type" is_not value="two">ok</If>';
      $this->assertEquals( 'ok', tangible_template( $template ) );

      $template = '<If variable="_type" is_not value="one">ok</If>';
      $this->assertEquals( '', tangible_template( $template ) );

      // Create two distinct types.
    $post_id = self::factory()->post->create([
          'post_type' => 'post',
      ]);

    $page_id = self::factory()->post->create([
          'post_type' => 'page',
      ]);

      $this->assertFalse( is_singular() );

      // Emulate request to their pages.
      $this->go_to( get_permalink( $page_id ) );

      $this->assertTrue( is_singular( 'page' ) );
      $this->assertFalse( is_singular( 'post' ) );

      $template = '<If singular is type="page">ok</If>';
      $this->assertEquals( 'ok', tangible_template( $template ) );

      $template = '<If not singular is type="post">ok</If>';
      $this->assertEquals( 'ok', tangible_template( $template ) );

      $template = '<If singular is_not type="post">ok</If>';
      $this->assertEquals( 'ok', tangible_template( $template ) );

      $template = '<If singular is_not type="page">ok</If>';
      $this->assertEquals( '', tangible_template( $template ) );

      $this->go_to( get_permalink( $post_id ) );

      $template = '<If singular is_not type="page">ok</If>';
      $this->assertEquals( 'ok', tangible_template( $template ) );

      $template = '<If singular is type="post">ok</If>';
      $this->assertEquals( 'ok', tangible_template( $template ) );

      $template = '<If not singular is type="page">ok</If>';
      $this->assertEquals( 'ok', tangible_template( $template ) );

      $template = '<If singular is_not type="post">ok</If>';
      $this->assertEquals( '', tangible_template( $template ) );
  }
}
