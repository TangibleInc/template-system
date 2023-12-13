<?php
namespace tangible\log;
use tangible\log;

function format_value($obj) {

  $find = ['<', '>'];
  $replace = ['&lt;','&gt;'];

  if (is_string($obj)) return str_replace($find, $replace, $obj);

  if (is_bool($obj)) return ( $obj ? 'TRUE' : 'FALSE' );
  if (is_null($obj) ) return "NULL";
  if (is_numeric($obj) ) return $obj;
  if (!is_array($obj) && !is_object($obj)) return $obj;

  $is_class_instance = is_object($obj) && !($obj instanceof \Closure);

  $name = log\format_function_name($obj);
  if (!empty($name) && !$is_class_instance) return $name;

  $newObj = [];
  if ($is_class_instance && !empty($name)) $newObj['__instance__'] = $name;

  foreach ($obj as $key => $value) {
    $seen = false;
    if (is_object($value)) {
      foreach (log::$seen as $seen_value) {
        if ($seen_value!==$value) continue;

        $name = log\format_function_name($value);
        if (!empty($name)) $newObj[$key] = $name;
        else $newObj[$key] = '*RECURSION*';

        $seen = true;
        break;
      }
      if ($seen) continue;
      log::$seen []= $value;
    }
    $newObj[$key] = log\format_value($value);
  }

  return $newObj;
}

function format_function_location($f) {
  $filename = $f->getFileName();
  if (empty($filename)) return;
  $line = $f->getStartLine();
  return ' in ' . str_replace(ABSPATH, '', $filename) . (
    empty($line) ? '' : (' on line '. $line)
  );
}

function format_function_name($obj) {

  $name = '';
  if (!is_object($obj) && !is_callable($obj, false, $name)) return;
  try {
    if (is_array($obj)) {
      $f = new \ReflectionMethod($obj[0], $obj[1]);
      return $f->class.'::'.$f->name . log\format_function_location($f);
    }
    if (is_object($obj)) {
      if ($obj instanceof Closure) {
        $f = new \ReflectionFunction($obj);
        return 'Anonymous function' . log\format_function_location($f);
      }
      $f = new \ReflectionClass($obj);
      return ($f->isAnonymous() ? (
        isset( $obj->name ) ? 'Object ' . $obj->name
          : 'Anonymous class'
      ) : 'Class '.$f->name) . log\format_function_location($f);
    }
    $f = new \ReflectionFunction($obj);
    return 'Function '.$f->name . log\format_function_location($f);
  } catch (\Throwable $th) {}

  return $name;
};  
