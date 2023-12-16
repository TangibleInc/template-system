<?php
namespace Tests\Template\Tags;

class If_Route_TestCase extends \WP_UnitTestCase {

    /**
     * If current URL is is_singular() of specific post type
     * @link https://discourse.tangible.one/t/if-is-not-singular-of-a-specific-post-type/804
     */
  function test_if_not_is_not_804() {
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
