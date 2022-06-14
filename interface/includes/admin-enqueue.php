<?php

/**
 * Admin equivalent of ./enqueue.php
 */

$interface->admin_enqueued_modules = [];
$interface->admin_enqueue_modules_done = false;

$interface->admin_enqueue_modules = function() use ($interface) {

  foreach ($interface->admin_enqueued_modules as $name) {

    $handle = "tangible-{$name}";

    if (wp_script_is( $handle, 'registered' )) {
      wp_enqueue_script( $handle );
    }

    if (wp_style_is( $handle, 'registered' )) {
      wp_enqueue_style( $handle );
    }
  }

  $interface->admin_enqueued_modules = [];
  $interface->admin_enqueue_modules_done = true;
};

add_action('admin_enqueue_scripts', $interface->admin_enqueue_modules, 10);

/**
 * Schedule for enqueue
 */

$interface->admin_enqueue = function($names = []) use ($interface) {

  $names = is_string($names) ? [$names] : $names;

  foreach ($names as $name) {
    if (!in_array($name, $interface->admin_enqueued_modules)) {
      $interface->admin_enqueued_modules []= $name;
    }
  }

  // Manually enqueue if called after admin_enqueue_scripts action
  if ($interface->admin_enqueue_modules_done) {
    $interface->admin_enqueue_modules();
  }
};
