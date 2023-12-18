<?php
namespace tangible\ajax;
use tangible\ajax;

// Enqueue

ajax::$state->schedule_enqueue = false;
ajax::$state->enqueued = false;
ajax::$state->registered = false;

function enqueue() {
  if (ajax::$state->enqueued || ajax::$state->schedule_enqueue) return;
  ajax::$state->schedule_enqueue = true;
};

function register() {

  if (ajax::$state->registered) return;

  wp_deregister_script('tangible-ajax'); // Override previous versions

  $url = ajax::$state->url;
  $version = ajax::$state->version;

  wp_register_script('tangible-ajax',
    $url . '/ajax.js',
    ['jquery'],
    $version,
    true
  );

  wp_localize_script('tangible-ajax', 'TangibleAjaxConfig', [
    'url' => admin_url('admin-ajax.php'),
    'nonce' => ajax\create_nonce()
  ]);

  ajax::$state->registered = true;
};

function conditional_enqueue() {

  if (!ajax::$state->schedule_enqueue || ajax::$state->enqueued) return;
  if (!ajax::$state->registered) {
    ajax\register();
  }

  wp_enqueue_script('tangible-ajax');

  ajax::$state->schedule_enqueue = false;
  ajax::$state->enqueued = true; // Run only once
};

// Register after priority 1, when plugin framework used to register
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\register', 2);
add_action('admin_enqueue_scripts', __NAMESPACE__ . '\\register', 2);

add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\conditional_enqueue', 999);
add_action('admin_enqueue_scripts', __NAMESPACE__ . '\\conditional_enqueue', 999);

add_action('wp_footer', __NAMESPACE__ . '\\conditional_enqueue', 0);
add_action('admin_footer', __NAMESPACE__ . '\\conditional_enqueue', 0);
