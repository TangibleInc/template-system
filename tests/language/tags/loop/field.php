<?php
/**
 * Loop query by field
 */
namespace Tests\Template\Tags;

class Loop_Field_Query_TestCase extends \WP_UnitTestCase {
  public function test_loop_query_by_field() {

    $ids = self::factory()->post->create_many(3, [
      'post_type' => 'post'
    ]);
    sort($ids);

    foreach ($ids as $index => $id) {

      $title = 'Test Post ' . ($index + 1);
      wp_update_post([
        'ID' => $id,
        'post_title' => $title,
      ]);

      $post = get_post($id);

      $this->assertEquals($title, $post->post_title);
    }

    $html = tangible_template();

    foreach ($ids as $index => $id) {

      $title = 'Test Post ' . ($index + 1);

      /**
       * Field and value
       */

      $this->assertEquals($title, $html->render(<<<HTML
      <Loop type=post field=id field_value=$id><Field title /></Loop>
      HTML));  

      $this->assertEquals($title, $html->render(<<<HTML
      <Loop type=post field=id field_compare=is field_value=$id><Field title /></Loop>
      HTML));  
    }

    /**
     * Field, compare, value
     */

    // in

    $expected = implode(',', $ids);

    $this->assertEquals($expected, $html->render(<<<HTML
    <Loop type=post field=id field_compare=in field_value=$expected orderby=id><Field id /><If not last>,</If></Loop>
    HTML));

    // not_in

    $not_in = implode(',', array_slice($ids, 1));
    $expected = $ids[0];

    $this->assertEquals($expected, $html->render(<<<HTML
    <Loop type=post field=id field_compare=not_in field_value=$not_in orderby=id><Field id /><If not last>,</If></Loop>
    HTML));

    // starts_with

    $expected = implode(',', $ids);

    $this->assertEquals($expected, $html->render(<<<HTML
    <Loop type=post field=title field_compare=starts_with field_value='Test Post' orderby=id><Field id /><If not last>,</If></Loop>
    HTML));

    // ends_with

    $expected = $ids[2];

    $this->assertEquals($expected, $html->render(<<<HTML
    <Loop type=post field=title field_compare=ends_with field_value='Post 3' orderby=id><Field id /><If not last>,</If></Loop>
    HTML));

  }
}
