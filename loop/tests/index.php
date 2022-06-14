<?php

$framework = tangible();
$loop = tangible_loop();
$html = tangible_template();
$tester = $framework->tester();

$test = $tester->start();

$test('tangible_loop()', function($it) use ($loop) {

  foreach ([
    'create_type' => 'Create loop of type',
    'register_type' => 'Register loop of type',
  ] as $key => $value) {

    $title = "\$loop->{$key}";

    $it($title, is_callable($loop->$key));
  }
});

require_once __DIR__.'/../types/base/test.php';
require_once __DIR__.'/../types/post/test.php';
require_once __DIR__.'/../types/user/test.php';

$test->report();
