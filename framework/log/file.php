<?php
namespace tangible;

function log_to_file() {

  $args = func_get_args();
  if (empty($args)) return;

  // First argument is the log file path

  $log_path = $args[0];
  $file = fopen($log_path, 'a');
  if (!$file) return;
  array_shift($args);

  ob_start();

  foreach ($args as $arg) {
    if (is_string($arg)) echo $arg;
    else print_r($arg);
    echo "\n";
  }

  fwrite($file, ob_get_clean());
  fclose($file);
};
