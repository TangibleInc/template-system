<?php

namespace Tangible\Loop;

/**
 * Comment loop
 *
 * @see https://developer.wordpress.org/reference/..
 */

class CommentLoop extends BaseLoop {

  static $loop;

  static $config = [
    'name'       => 'comment',
    'title'      => 'Comment',
    'category'   => 'core',
    'query_args' => [],
    'fields'     => [
      'title' => [ 'description' => 'Title' ],
    ],
  ];

  function create_query( $query_args = [] ) {

    $items = [];

    return $items;
  }

  /**
   * Field
   *
   * Inherited `get_field` method runs a filter for extended fields, then
   * calls `get_item_field` as needed.
   */
  function get_item_field( $item, $field_name, $args = [] ) {

    switch ( $field_name ) {

      case 'all':
        ob_start();
        ?><pre><code><?php print_r( $item ); ?></code></pre><?php
          return ob_get_clean();
      break;

      case 'name':
          return $item->name;
    }
  }
};

CommentLoop::$loop = $loop;

$loop->register_type( CommentLoop::class );
