<?php
/**
 * Logging methods: see, trace, log, log_to_file
 */
namespace tangible;
use tangible\log;

class log {
  // Keep object references to detect recursion
  static $seen = [];
}

function see() {

  $args = func_get_args();
  $trace = debug_backtrace();

  $caller = $trace[0];
  $file = str_replace(ABSPATH, '', $caller['file']);

  echo "<br><b>{$file}</b> in <b>{$caller['line']}</b><br>";

  log::$seen = [];

  ?><pre><code><?php
    foreach ($args as $arg) {
      print_r(log\format_value($arg));
      echo "\n";
    }
  ?></code></pre><?php

  log::$seen = [];

  if ( isset( $args[0] ) ) return $args[0];
}
