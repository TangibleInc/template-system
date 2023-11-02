<?php
namespace Tests\Template\Tags;

use Tangible\TemplateSystem as system;

class Field_TestCase extends \WP_UnitTestCase {

  public function test_field_author() {

    $user_id = (string) self::factory()->user->create_object([
      'user_login' => 'test1',
      'user_pass' => 'test',
    ]);
    $this->assertTrue( !empty($user_id) );

    $post_id = self::factory()->post->create_object([
      'post_author' => $user_id,
      'post_type' => 'post',
      'post_title' => 'ABC123',
      'post_status'  => 'publish', // Important for Loop tag
    ]);

    $this->assertTrue( !empty($post_id) );

    $post = self::factory()->post->get_object_by_id( $post_id );

    $this->assertTrue( !empty($post) );

    $post_author = $post->post_author;
    $this->assertTrue( !($post_author===false || $post_author==='') );


    $html = tangible_template();

    $this->assertEquals((string) $post_author, trim($html->render(<<<HTML
      <Loop type=user id=$post_author><Field id /></Loop>
    HTML)));

    $html->render(<<<HTML
      <Set query=default type=post id=$post_id />
    HTML);

    $this->assertEquals((string) $post_author, trim($html->render(<<<HTML
      <Field author_id />
    HTML)));

    $this->assertEquals((string) $post_author, trim($html->render(<<<HTML
      <Loop field=author><Field id /></Loop>
    HTML)));

    // Modified author

    $another_user_id = (string) self::factory()->user->create_object([
      'user_login' => 'test2',
      'user_pass' => 'test',
    ]);
    $this->assertTrue( !empty($another_user_id) );

    update_post_meta( $post_id, '_edit_last', $another_user_id );

    $html->render(<<<HTML
      <Set query=default type=post id=$post_id />
    HTML);

    $this->assertEquals((string) $another_user_id, trim($html->render(<<<HTML
      <Field modified_author_id />
    HTML)));

    $this->assertEquals((string) $another_user_id, trim($html->render(<<<HTML
      <Loop field=modified_author><Field id /></Loop>
    HTML)));
  }

  public function test_format_shortcuts() {

    $text = 'ABC123';

    $post_id = self::factory()->post->create_object([
      'post_type' => 'post',
      'post_title' => $text,
      'post_status'  => 'publish', // Important for Loop tag
    ]);

    $this->assertTrue( !empty($post_id) );

    $post = self::factory()->post->get_object_by_id( $post_id );

    $this->assertTrue( !empty($post) );


    $html = tangible_template();

    $html->render(<<<HTML
      <Set query=default type=post id=$post_id />
    HTML);

    $this->assertEquals((string) $post_id, trim($html->render(<<<HTML
      <Field id />
    HTML)));

    $this->assertEquals($text, trim($html->render(<<<HTML
      <Field title />
    HTML)));

    // Replace

    $this->assertEquals('DEF345', trim($html->render(<<<HTML
      <Field title replace=ABC with=DEF replace_2=123 with_2=345 />
    HTML)));

    // Replace pattern

    $this->assertEquals('+ABC-*123*', trim($html->render(<<<HTML
      <Field title replace_pattern="/([A-Z]+)/" with="+$1-" replace_pattern_2="/(\d+)/" with_2="*$1*" />
    HTML)));

    // Join

    $result = json_decode(
      trim($html->render(<<<HTML
        <Map test>
          <List items>
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
          </List>
        </Map>
        <Get map=test />
      HTML)),
      JSON_OBJECT_AS_ARRAY
    );

    $this->assertEquals([
      'items' => [1, 2, 3],
    ], $result);

    $this->assertEquals('1 2 3', trim($html->render(<<<HTML
      <Loop map=test>
        <Field items join=" " />
      </Loop>
    HTML)));
  }
}
