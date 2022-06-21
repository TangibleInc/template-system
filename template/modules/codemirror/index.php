<?php

// Register script and style

// Enqueue

$html->enqueue_codemirror = function( $options = [] ) use ( $html ) {

  $theme = isset( $options['theme'] ) ? $options['theme'] : 'light';

  $url     = $html->url;
  $version = $html->version;

  // Lint/hint libraries

  $libs = [ 'csslint', 'htmlhint', 'jshint', 'jsonlint', 'scsslint' ];

  foreach ( $libs as $lib ) {
    wp_enqueue_script("tangible-codemirror-{$lib}",
      "{$url}codemirror/vendor/{$lib}.min.js",
      [],
      $version,
      true
    );
  }

  // CodeMirror

  wp_enqueue_script('tangible-codemirror',
    "{$url}assets/build/codemirror.min.js",
    array_map(function( $lib ) {
      return "tangible-codemirror-{$lib}";
    }, $libs),
    $version,
    true
  );

  wp_enqueue_style('tangible-codemirror',
    "{$url}assets/build/codemirror.min.css",
    [],
    $version
  );

  wp_register_style('tangible-codemirror-theme-light',
    "{$url}assets/build/codemirror-theme-light.min.css",
    [ 'tangible-codemirror' ],
    $version
  );

  wp_enqueue_style( "tangible-codemirror-theme-{$theme}" );
};
