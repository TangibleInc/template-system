<?php
/**
 * Repeater field loop
 *
 * @see https://www.advancedcustomfields.com/resources/repeater/
 */

namespace Tangible\Template\Integrations\AdvancedCustomFields;

use Tangible\Loop\ListLoop;

class RepeaterLoop extends ListLoop {

  static $loop;
  protected $object_id;
  static $config = [
    'name'       => 'acf_repeater',
    'title'      => 'ACF repeater',
    'category'   => 'acf',
    'query_args' => [
      'count' => [
        'description' => 'Limit item count',
        'type'        => 'number',
      ],
    ],
  ];

  function run_query( $args = [] ) {
    return $args;
  }

  function get_items_from_query( $args ) {

    // Property "field" is required
    if ( ! isset( $args['field'] )) return [];

    $id = $this->object_id = isset( $args['id'] ) ? $args['id'] : false;

    $parent_loop = self::$loop->get_context();
    $loop_type   = $parent_loop->get_name();

    if ( tangible_template()->is_acf_field_type_with_sub_field( $loop_type ) ) {
      $items = get_sub_field( $args['field'], false );
    } else {
      $items = get_field( $args['field'], $id, false );
    }

    if ( ! is_array( $items )) $items = []; // get_field can return NULL

    if ( isset( $args['count'] ) && $args['count'] >= 0 ) {
      $items = array_slice( $items, 0, (int) $args['count'] );
    }

    $this->reset();

    return $items;
  }

  function set_current( $item ) {
    parent::set_current( $item );
    the_row();
  }

  function reset() {
    parent::reset();
    @have_rows( $this->args['field'], $this->object_id );
  }

  function get_item_field( $item, $field_name, $args = [] ) {
    return get_sub_field( $field_name );
  }
};

$loop->register_type( RepeaterLoop::class );

RepeaterLoop::$loop = $loop;
