<?php
/**
 * Group field loop
 *
 * @see https://www.advancedcustomfields.com/resources/group/
 */

namespace Tangible\Template\Integrations\AdvancedCustomFields;

use Tangible\Loop\ListLoop;

class GroupLoop extends ListLoop {

  static $loop;
  static $config = [
    'name'       => 'acf_group',
    'title'      => 'ACF group',
    'category'   => 'acf',
    'query_args' => [
      'count' => [
        'description' => 'Limit item count',
        'type'        => 'number',
      ],
    ],
  ];

  public $use_sub_fields = true;

  function get_items_from_query( $query ) {

    // Property "field" is required
    if ( ! isset( $query['field'] )) return [];

    $id = $this->object_id = isset( $query['id'] ) ? $query['id'] : false;

    $parent_loop = self::$loop->get_context();
    $loop_type   = $parent_loop->get_name();

    $items = [];

    $field_name = $query['field'];
    $field_value = function_exists('get_field')
      ? get_field( $field_name, $this->object_id )
      : null;

    if ( is_array( $field_value ) ) {
      $this->use_sub_fields = false;
      $items = [ $field_value ];
    } else {
      $this->use_sub_fields = true;
      $items = [
        [ '' ], // Non-empty item to force loop a single time
      ];
    }

    $this->reset();

    return $items;
  }

  function set_current( $item ) {
    parent::set_current( $item );
    if ( $this->use_sub_fields ) {
      the_row();
    }
  }

  function reset() {
    parent::reset();
    if ( $this->use_sub_fields ) {
      @have_rows( $this->query['field'], $this->object_id );
    }
  }

  function get_item_field( $item, $field_name, $args = [] ) {
    if ( $this->use_sub_fields ) {
      return get_sub_field( $field_name );
    }

    if ( is_array( $item ) && array_key_exists( $field_name, $item ) ) {
      return $item[ $field_name ];
    }
  }
};

$loop->register_type( GroupLoop::class );

GroupLoop::$loop = $loop;
