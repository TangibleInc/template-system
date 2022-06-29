<?php

$system = tangible_template_system();
$tester = $system->tester();

$tester->enqueue();
$tester->start_group();


$test = $tester->start('Template System');

$test('Global function', function( $it ) {

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

$test->end();

$test = $tester->start('Logic');
include $system->logic->path . '/tests/index.php';
$test->end();

$test = $tester->start('Loop');
include $system->loop->path . '/tests/index.php';
$test->end();


$tester->group_report();
