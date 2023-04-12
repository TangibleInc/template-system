<?php
class Template_Tags_Url_TestCase extends WP_UnitTestCase {
  public function test_template_tags_url_current() {

      $post_id = self::factory()->post->create( [] );

    // Current URL

    $template = '<Url />';

      $this->set_permalink_structure( '/%postname%' );
      $this->go_to( $permalink = get_permalink( $post_id ) );

      $this->assertSame( $permalink, tangible_template( $template ) );

    tangible_template()->flush_variable_type_memory( 'url' );

    // With query parameters

    $this->set_permalink_structure( '/?p=%post_id%' );
      $this->go_to( $permalink = get_permalink( $post_id ) );

    // For backward compatibility, query is not included in URL by default
    $template = '<Url />';
    $this->assertSame( get_site_url(), tangible_template( $template ) );

    $template = '<Url query=true />';
    $this->assertSame( $permalink, tangible_template( $template ) );

    $template = '<Url query />';
    $this->assertSame( "p={$post_id}", tangible_template( $template ) );

    $template = '<Url query=p />';
    $this->assertSame( strval( $post_id ), tangible_template( $template ) );

    tangible_template()->flush_variable_type_memory( 'url' );

    // With query parameters exclude

    $template = '<Url query=true exclude=utm,extra />';

    $this->go_to( $permalink . '&x=123&y=456&utm=test&extra=stuff' );

    $this->assertSame( $permalink . '&x=123&y=456', tangible_template( $template ) );

    tangible_template()->flush_variable_type_memory( 'url' );

    // With query parameters include

    $template = '<Url query=true include=p,x />';

    $this->go_to( $permalink . '&x=123&y=456&utm=test' );

    $this->assertSame( $permalink . '&x=123', tangible_template( $template ) );

    tangible_template()->flush_variable_type_memory( 'url' );

  }
}
