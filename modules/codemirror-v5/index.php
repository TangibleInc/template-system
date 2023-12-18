<?php
namespace tangible\template_system;

function enqueue_codemirror_v5( $options = [] ) {

  $url     = untrailingslashit(plugins_url('/', __FILE__));
  $version = '5';

  wp_enqueue_script('tangible-codemirror-v5',
    "{$url}/vendor/codemirror.min.js",
    [],
    $version,
    true
  );

  wp_enqueue_style('tangible-codemirror-v5',
    "{$url}/vendor/codemirror.min.css",
    [],
    $version
  );

  wp_enqueue_style('tangible-codemirror-v5-theme-light',
    "{$url}/vendor/codemirror-theme-light.min.css",
    [ 'tangible-codemirror-v5' ],
    $version
  );
};
