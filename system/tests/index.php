<?php

$system = tangible_template_system();
$tester = $system->tester();

$test = $tester->start('Template System');

$test('Function tangible_template_system()', function( $it ) {

  $it( 'exists', function_exists( 'tangible_template_system' ) );

  $system = tangible_template_system();

  $it( 'returns an object', is_object( $system ) );

  foreach ([
    'loop',
    'logic',
    'html',
  ] as $key) {
    $it( "has module ->{$key}", !empty( $system->$key ) );
  }

});

$test->report();
