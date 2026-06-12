<?php
namespace Tests\CompilePhp;

/**
 * Table-driven checks that documented loop attributes reach the underlying
 * WordPress query with the expected mapping. Catches the category of
 * silently dropped attributes (forum thread #1331 / GitHub #156: the user
 * loop ignores orderby=random).
 *
 * KNOWN GAPS are asserted as gaps on purpose: if someone implements one,
 * the test fails and the entry moves up into the supported matrix.
 */
class Loop_Attribute_Matrix_TestCase extends \WP_UnitTestCase {

  /**
   * @group compile-php
   */
  function test_post_loop_orderby_mappings() {

    $loop = tangible_template_system()->loop;

    $matrix = [
      // attribute value => expected WP_Query orderby
      'title' => 'title',
      'date' => 'date',
      'modified' => 'modified',
      'id' => 'ID',
      'random' => 'rand',
      'menu' => 'menu_order',
      'comments' => 'comment_count',
    ];

    foreach ($matrix as $attribute => $expected) {
      $instance = $loop('post', [ 'orderby' => $attribute, 'post_type' => 'post' ]);
      $this->assertSame(
        $expected,
        $instance->query->query_vars['orderby'] ?? null,
        "post loop orderby={$attribute} maps to {$expected}"
      );
    }

    // Order direction
    foreach ([ 'asc' => 'asc', 'desc' => 'desc' ] as $attribute => $expected) {
      $instance = $loop('post', [ 'orderby' => 'title', 'order' => $attribute, 'post_type' => 'post' ]);
      $this->assertSame(
        $expected,
        strtolower($instance->query->query_vars['order'] ?? ''),
        "post loop order={$attribute}"
      );
    }
  }

  /**
   * @group compile-php
   */
  function test_user_loop_orderby_mappings() {

    $loop = tangible_template_system()->loop;

    $matrix = [
      'display_name' => 'display_name',
      'login' => 'login',
      'registered' => 'registered',
    ];

    foreach ($matrix as $attribute => $expected) {
      $instance = $loop('user', [ 'orderby' => $attribute ]);
      // The user loop normalizes orderby to an array
      $this->assertSame(
        [ $expected ],
        (array) ($instance->query->query_vars['orderby'] ?? null),
        "user loop orderby={$attribute}"
      );
    }
  }

  /**
   * Known gaps, asserted as gaps. Implementing one should fail this test,
   * prompting the entry to move into the supported matrix above.
   *
   * @group compile-php
   */
  function test_known_attribute_gaps() {

    $loop = tangible_template_system()->loop;

    /**
     * User loop orderby=random: WP_User_Query has no random ordering and
     * the loop does not compensate - the value passes through unmapped
     * and WP_User_Query falls back to default ordering.
     * @see https://github.com/tangibleinc/template-system/issues/156
     */
    $instance = $loop('user', [ 'orderby' => 'random' ]);
    $this->assertSame(
      [ 'random' ],
      (array) ($instance->query->query_vars['orderby'] ?? null),
      'user loop orderby=random is passed through unmapped (known gap, GH #156)'
    );
  }
}
