<?php
namespace tangible\preact;
use tangible\preact;

// Enqueue

preact::$state->schedule_enqueue = false;
preact::$state->enqueued = false;
preact::$state->registered = false;

function enqueue() {
  if (preact::$state->enqueued || preact::$state->schedule_enqueue) return;
  preact::$state->schedule_enqueue = true;
};

function register() {

  if (preact::$state->registered) return;

  wp_deregister_script('tangible-preact'); // Override previous versions

  $url = preact::$state->url;
  $version = preact::$state->version;

  wp_register_script('tangible-preact',
    $url . '/build/preact.min.js',
    [],
    $version,
    true
  );

  preact::$state->registered = true;
};

function conditional_enqueue() {

  if (!preact::$state->schedule_enqueue || preact::$state->enqueued) return;
  if (!preact::$state->registered) {
    preact\register();
  }

  wp_enqueue_script('tangible-preact');

  preact::$state->schedule_enqueue = false;
  preact::$state->enqueued = true; // Run only once
};

// Register after priority 1, when plugin framework used to register
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\register', 2);
add_action('admin_enqueue_scripts', __NAMESPACE__ . '\\register', 2);

add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\conditional_enqueue', 999);
add_action('admin_enqueue_scripts', __NAMESPACE__ . '\\conditional_enqueue', 999);

add_action('wp_footer', __NAMESPACE__ . '\\conditional_enqueue', 0);
add_action('admin_footer', __NAMESPACE__ . '\\conditional_enqueue', 0);
