<?php

require_once __DIR__ . '/loader.php';

$sass = new \Tangible\ScssPhp\Compiler();

echo $sass->compileString('
$test: 0.4;
a.latest-post__link:hover {
  box-shadow: 0 4px 8px rgba(var(--clr-text), $test);
}
')->getCss();
