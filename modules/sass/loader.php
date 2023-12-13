<?php

if (!class_exists('Tangible\ScssPhp\Version')) {
  spl_autoload_register(function ($class) {
    if (0 !== strpos($class, 'Tangible\ScssPhp\\')) return;

    $subClass = substr($class, strlen('Tangible\ScssPhp\\'));
    $path = __DIR__ . '/scssphp/' . str_replace('\\', '/', $subClass) . '.php';

    if (file_exists($path)) require $path;
  });
}
