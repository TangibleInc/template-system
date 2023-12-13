<?php
namespace tangible;
use tangible\log;

function trace($depth = 0) {

  $stack = (new \Exception())->getTrace();

  ?><br><?php

  foreach ($stack as $index => $caller) {

    if ($depth > 0 && $index > $depth) break;

    $next_caller = isset($stack[ $index+1 ])
      ? $stack[ $index+1 ]
      : []
    ;

    $cls = isset($next_caller['class']) ? $next_caller['class'] : '';
    if (strpos($cls, '@anonymous')!==false) $next_caller = '$this';

    $fn = isset($next_caller['function']) ? $next_caller['function'] : '';

    $full_fn = ($fn==='__call'
      && isset($next_caller['args']) && isset($next_caller['args'][0]))
      ? $next_caller['args'][0]
      : (!empty($cls) ? "$cls::" : '').$fn;

    $file = isset($caller['file']) ? str_replace(ABSPATH, '', $caller['file']) : 'unknown file';
    $line = isset($caller['line']) ? $caller['line'] : 'unknown';

    echo "{$full_fn} - <b>{$file}</b> in line <b>{$line}</b><br>";
  }
};
