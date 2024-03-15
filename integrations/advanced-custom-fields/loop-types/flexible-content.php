<?php
/**
 * Flexible content field loop
 *
 * @see https://www.advancedcustomfields.com/resources/flexible-content/
 */

namespace Tangible\Template\Integrations\AdvancedCustomFields;

use Tangible\Loop\ListLoop;

class FlexibleContentLoop extends ListLoop {

  static $loop;
  static $html;
  protected $object_id;
  static $config = [
    'name'       => 'acf_flexible_content',
    'title'      => 'ACF flexible content',
    'category'   => 'acf',
    'query_args' => [
      'count' => [
        'description' => 'Limit item count',
        'type'        => 'number',
      ],
    ],
  ];

  function get_items_from_query( $query ) {

    if ( ! isset( $query['field'] )) return [];

    $id = $this->object_id = isset( $query['id'] ) ? $query['id'] : false;

    $parent_loop = self::$loop->get_context();
    $loop_type   = $parent_loop->get_name();

    if ( tangible_template()->is_acf_field_type_with_sub_field( $loop_type ) ) {
      $items = get_sub_field( $query['field'], false );
    } else {
      $items = get_field( $query['field'], $id, false );
    }

    if ( ! is_array( $items )) $items = []; // get_field can return NULL

    if ( isset( $query['count'] ) && $query['count'] >= 0 ) {
      $items = array_slice( $items, 0, (int) $query['count'] );
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
    @have_rows( $this->query['field'], $this->object_id );
  }

  function get_item_field( $item, $field_name, $args = [] ) {
    if ($field_name === 'layout') return get_row_layout();
    return get_sub_field( $field_name );
  }
};

$loop->register_type( FlexibleContentLoop::class );

FlexibleContentLoop::$loop = $loop;
FlexibleContentLoop::$html = $html;
