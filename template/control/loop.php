<?php

namespace Tangible\Loop;

class ControlLoop extends BaseLoop {

  static $config = [
    'name'       => 'control',
    'title'      => 'Control',
    'category'   => 'core',
    'query_args' => [
      'control' => [
        'target_name' => 'control',
        'description' => 'Control name',
        'type'        => [ 'string' ]
      ],
    ],
  ];

  function run_query( $args ) {
    
    if( empty($args['control']) ) return [];

    $control_values = tangible_template()->get_control_variable( 
      $args['control'], 
      [ 'field' => 'all' ] 
    );
    
    $has_multiple_items = is_array($control_values) && ! isset($control_values['value']);

    return $has_multiple_items 
      ? $control_values
      : [ $control_values ]
    ;
  }

  function get_items_from_query( $items ) {

    $this->controls = $items;
    $fields = [];

    foreach( $items as $item ) {  
      $fields []= array_map(function($item) {
        return is_array($item) ? ($item['value'] ?? '') : $item; 
      }, $item); 
    }
    
    return $fields;
  }

  function next() {
    
    $response = parent::next();

    if( $response === null ) return $response;

    $html = tangible_template();

    if( $this->index !== 0 ) {
      $html->pop_control_variable_scope();
    }

    $html->push_control_variable_scope();

    $child_controls = $this->controls[ $this->index ];

    foreach( $child_controls as $name => $control ) {
      $html->set_control_variable( $name, $control );
    }
    
    return $response;
  }

  function get_item_field($item, $name, $atts = []) {
    
    if( empty($name) ) $name = 'value';
    
    return parent::get_item_field($item, $name, $atts);
  }

}

$loop->register_type( ControlLoop::class );
