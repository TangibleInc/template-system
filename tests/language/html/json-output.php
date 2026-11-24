<?php
namespace Tests\Language;

use WP_UnitTestCase;

/**
 * Non-string tag results are printed as JSON with markup characters encoded, so
 * a stored value holding markup cannot become a live tag in the page, while
 * tags that read the JSON back get the original value.
 *
 * @see language/utils/json.php
 */
class Json_Output_TestCase extends WP_UnitTestCase {

  public function test_json_output_escapes_markup_characters() {

    $html = tangible_template();

    $payload = '<img src="x" onerror=\'alert(1)\'>&';
    $encoded = '\u003Cimg src=\u0022x\u0022 onerror=\u0027alert(1)\u0027\u003E\u0026';

    $post_id = self::factory()->post->create([ 'post_status' => 'publish' ]);

    update_post_meta( $post_id, 'list_field', [ [ 'name' => $payload ], [ 'name' => 'two' ] ] );
    update_post_meta( $post_id, 'map_field', [ 'label' => $payload ] );
    update_post_meta( $post_id, 'string_list_field', [ $payload, 'two' ] );

    $closed_tag = [ 'callback' => fn() => [ $payload ], 'closed' => true ];
    $open_tag   = [ 'callback' => fn() => [ $payload ] ];

    // Template, expected output, render options
    $cases = [
      'field with list value' => [
        "<Loop type=post id=$post_id><Field list_field /></Loop>",
        "[{\"name\":\"$encoded\"},{\"name\":\"two\"}]",
      ],
      'field with map value' => [
        "<Loop type=post id=$post_id><Field map_field /></Loop>",
        "{\"label\":\"$encoded\"}",
      ],
      'list tag' => [
        <<<HTML
        <Loop type=post id=$post_id>
          <List>
            <Item><Field map_field field=label /></Item>
          </List>
        </Loop>
        HTML,
        "[\"$encoded\"]",
      ],
      'map tag' => [
        <<<HTML
        <Loop type=post id=$post_id>
          <Map>
            <Key label><Field map_field field=label /></Key>
          </Map>
        </Loop>
        HTML,
        "{\"label\":\"$encoded\"}",
      ],
      /**
       * Local tag registered for this render only, as no core tag returns an
       * array. Closed tag results are encoded by render_tag
       *
       * @see render_tag() language/html/render/tag.php
       */
      'closed tag returning array' => [
        '<Payload />',
        "[\"$encoded\"]",
        [ 'local_tags' => [ 'Payload' => $closed_tag ] ],
      ],
      /**
       * Open tag results are returned as is by render_tag, and encoded by
       * render_nodes
       *
       * @see render_nodes() language/html/render/index.php
       */
      'open tag returning array' => [
        '<Payload></Payload>',
        "[\"$encoded\"]",
        [ 'local_tags' => [ 'Payload' => $open_tag ] ],
      ],
      'get list variable' => [
        <<<HTML
        <Loop type=post id=$post_id>
          <List name=list_variable>
            <Loop list="{Field list_field}"><Item><Field name /></Item></Loop>
          </List>
        </Loop>
        <Get list=list_variable />
        HTML,
        "[\"$encoded\",\"two\"]",
      ],
      'get map variable' => [
        <<<HTML
        <Loop type=post id=$post_id>
          <Map name=map_variable>
            <Key label><Field map_field field=label /></Key>
          </Map>
        </Loop>
        <Get map=map_variable />
        HTML,
        "{\"label\":\"$encoded\"}",
      ],
      // Reading the JSON back restores the markup
      'loop over field json' => [
        <<<HTML
        <Loop type=post id=$post_id>
          <Loop list="{Field list_field}"><Field name format=code />,</Loop>
        </Loop>
        HTML,
        '&lt;img src=&quot;x&quot; onerror=&#039;alert(1)&#039;&gt;&amp;,two,',
      ],

      /**
       * Outside a JSON value, the payload prints unchanged: string fields,
       * joined arrays, and single List items or Map keys
       */
      'string field' => [
        "<Loop type=post id=$post_id><Field map_field field=label /></Loop>",
        $payload,
      ],
      'joined field' => [
        "<Loop type=post id=$post_id><Field string_list_field join=\", \" /></Loop>",
        "$payload, two",
      ],
      'list item' => [
        <<<HTML
        <Loop type=post id=$post_id>
          <List name=list_variable>
            <Item><Field map_field field=label /></Item>
          </List>
        </Loop>
        <Field list=list_variable item=1 />
        HTML,
        $payload,
      ],
      'map key' => [
        <<<HTML
        <Loop type=post id=$post_id>
          <Map name=map_variable>
            <Key label><Field map_field field=label /></Key>
          </Map>
        </Loop>
        <Field label map=map_variable />
        HTML,
        $payload,
      ],
    ];

    // Compare all cases at once so a failure lists every differing case
    $expected = array_map( fn( $case ) => $case[1], $cases );
    $results  = array_map(
      fn( $case ) => trim( $html->render( $case[0], $case[2] ?? [] ) ),
      $cases
    );

    $this->assertSame( $expected, $results );
  }
}
