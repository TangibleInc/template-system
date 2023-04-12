<?php

$logic = tangible_logic();

$test = $tester->start( 'Logic' );

require_once __DIR__ . '/methods.php';
// require_once __DIR__ . '/rules.php';
require_once __DIR__ . '/frontend.php';

$test->report();
