<?php

// Register script and style

// Enqueue

$html->enqueue_codemirror = function($options = []) use ($html) {

  $theme = isset($options['theme']) ? $options['theme'] : 'light';

  $version = $html->version;

  // Lint/hint libraries

  $libs = ['csslint', 'htmlhint', 'jshint', 'jsonlint', 'scsslint'];

  foreach ($libs as $lib) {
    wp_enqueue_script("tangible-codemirror-{$lib}",
      "{$html->url}assets/vendor/{$lib}.min.js",
      [],
      $version,
      true
    );
  }

  // CodeMirror

  wp_enqueue_script('tangible-codemirror',
    "{$html->url}assets/build/codemirror.min.js",
    array_map(function($lib) {
      return "tangible-codemirror-{$lib}";
    }, $libs),
    $version,
    true
  );

  wp_enqueue_style('tangible-codemirror',
    "{$html->url}assets/build/codemirror.min.css",
    [],
    $version
  );

  wp_register_style('tangible-codemirror-theme-light',
    "{$html->url}assets/build/codemirror-theme-light.min.css",
    ['tangible-codemirror'],
    $version
  );

  wp_enqueue_style("tangible-codemirror-theme-{$theme}");
};
