<?php

use Tangible\Loop\BaseLoop;

$test('Base loop', function( $it ) {

  $class_name = 'Tangible\\Loop\\BaseLoop';

  $it( 'exists', class_exists( $class_name ) );

  $test_loop = new BaseLoop([
    'query' => [
      [ 'key' => 'value' ],
      [],
    ]
  ]);

  $it( 'instantiates', is_a( $test_loop, $class_name ) );

  $it( 'has_next', $test_loop->has_next() === true );

  $item = $test_loop->next();

  $it( 'next', ! empty( $item ) && isset( $item['key'] ) && $item['key'] === 'value' );

  $value = $test_loop->get_field( 'key' );

  $it( 'get_field', $value === 'value' );

  $value = $test_loop->get_item_field([
    'test' => 123,
  ], 'test');

  $it( 'get_item_field', $value === 123 );
});
