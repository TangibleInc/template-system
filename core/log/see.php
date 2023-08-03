<?php
/**
 * Logging methods: see, trace, log, log_to_file
 */
namespace Tangible\TemplateSystem;

use Tangible\TemplateSystem as system;

// Keep object references to detect recursion
system::$state->seen = [];

function see() {

  $args = func_get_args();

  $trace = debug_backtrace();
  $caller = $trace[1];
  $file = str_replace(ABSPATH, '', $caller['file']);

  echo "<br><b>{$file}</b> in <b>{$caller['line']}</b><br>";

  system::$state->seen = [];

  ?><pre><code><?php
    foreach ($args as $arg) {
      print_r(system\format_value($arg));
      echo "\n";
    }
  ?></code></pre><?php

  system::$state->seen = [];

  if ( isset( $args[0] ) ) return $args[0];
}

function format_value($obj) {

  $find = ['<', '>'];
  $replace = ['&lt;','&gt;'];

  if (is_string($obj)) return str_replace($find, $replace, $obj);

  if (is_bool($obj)) return ( $obj ? 'TRUE' : 'FALSE' );
  if (is_null($obj) ) return "NULL";
  if (is_numeric($obj) ) return $obj;
  if (!is_array($obj) && !is_object($obj)) return $obj;

  $is_class_instance = is_object($obj) && !($obj instanceof \Closure);

  $name = system\format_function_name($obj);
  if (!empty($name) && !$is_class_instance) return $name;

  $newObj = [];
  if ($is_class_instance && !empty($name)) $newObj['__instance__'] = $name;

  foreach ($obj as $key => $value) {
    $seen = false;
    if (is_object($value)) {
      foreach (system::$state->seen as $seen_value) {
        if ($seen_value!==$value) continue;

        $name = system\format_function_name($value);
        if (!empty($name)) $newObj[$key] = $name;
        else $newObj[$key] = '*RECURSION*';

        $seen = true;
        break;
      }
      if ($seen) continue;
      system::$state->seen []= $value;
    }
    $newObj[$key] = system\format_value($value);
  }

  return $newObj;
};

function format_function_location($f) {
  return ' in '.str_replace(ABSPATH, '', $f->getFileName()).' on line '.$f->getStartLine();
}

function format_function_name($obj) {

  $name = '';
  if (!is_object($obj) && !is_callable($obj, false, $name)) return;
  try {
    if (is_array($obj)) {
      $f = new \ReflectionMethod($obj[0], $obj[1]);
      return $f->class.'::'.$f->name . system\format_function_location($f);
    }
    if (is_object($obj)) {
      if ($obj instanceof Closure) {
        $f = new \ReflectionFunction($obj);
        return 'Anonymous function' . system\format_function_location($f);
      }
      $f = new \ReflectionClass($obj);
      return ($f->isAnonymous() ? (
        isset( $obj->name ) ? 'Object ' . $obj->name
          : 'Anonymous class'
      ) : 'Class '.$f->name) . system\format_function_location($f);
    }
    $f = new \ReflectionFunction($obj);
    return 'Function '.$f->name . system\format_function_location($f);
  } catch (\Throwable $th) {}

  return $name;
};
