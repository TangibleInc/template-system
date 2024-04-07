<?php
namespace Tests\Template\Modules;

class Table_TestCase extends \WP_UnitTestCase {
  public function test() {

    $error = null;
    set_error_handler(function( $errno, $errstr, ...$args ) use ( &$error ) {
      $error = [ $errno, $errstr, $args ];
      restore_error_handler();
    });

    $html = tangible_template();

    $this->assertEquals( true, isset($html->tags['Table']) );

    $post_ids = [];

    for ($i = 1; $i <= 3; $i++) { 
      $post_ids []= self::factory()->post->create_object([
        'post_type' => 'post',
        'post_status'  => 'publish', // Important for Loop tag
        'post_title' => 'Test ' . $i,
        'post_content' => '',
      ]);
    }

    $result = $html->render(<<<'HTML'
<Table per_page=3 sort=title sort_order=desc>

<Filter>
  <div>
    <input type="text"  action="search"  columns="entry_id,user,entry_date,survey_total_score"   placeholder="Search"  >
  </div>
</Filter>

<Head>
  <Col name=entry_id sort_type=string>Entry ID</Col>
  <Col name=user sort_type=string>User</Col>
  <Col name=entry_date sort_type=string>Entry Date</Col>
  <Col name=survey_total_score sort_type=string>Survey Total Score</Col>
</Head>

<RowLoop type=post>
  <Col>
  <Field id />
  </Col>
  <Col>
  <Loop type="user" id="{Field created_by}">
    <Field full_name /><br/>
  </Loop>
  </Col>
  <Col>
  <Field date_created />
  </Col>
  <Col>
  <Field survey_score />
  </Col>
</RowLoop>

<Paginate>
  Page <Field current /> of <Field total />
</Paginate>

<Empty>
  <p>Empty</p>
</Empty>

</Table>
HTML);

    $this->assertNull( $error );
    // $this->assertEquals( true, !empty($result) );
  }
}
