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

    $control_values = self::$html->get_control_variable( 
      $args['control'], 
      [ 'field' => 'all' ] 
    );

    return [ $control_values ];
  }

  function get_item_field($item, $name, $atts = []) {
    if( empty($name) ) $name = 'value';
    return parent::get_item_field($item, $name, $atts);
  }

}

$loop->register_type( ControlLoop::class );
