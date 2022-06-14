<?php
/**
 * Sass
 *
 * @see http://leafo.github.io/scssphp/docs/
 * @see https://github.com/sabberworm/PHP-CSS-Parser
 * @see https://github.com/padaliyajay/php-autoprefixer
 */

$html->sass = function($content = '', $options = []) use ($html) {

  static $sass;

  if ( ! is_string($content) ) return;

  if ( ! $sass ) {

    require_once __DIR__.'/load.php';

    $sass = new \Tangible\ScssPhp\Compiler();

    $sass->import_paths = [];

    $sass->setDynamicImporter(function($path) use ($html, $sass) {

      $content = '';
      $sass->import_paths []= $sass->current_path;

      if ( empty($path) ) return;

      if ($path[0]==='~') {
        // TODO: Support importing from post type
        return;
      }

      $import_path = empty( $sass->current_path )
        ? $path
        : "{$sass->current_path}/$path"
      ;

      if ( ! file_exists($import_path) ) return;

      $sass->current_path = dirname( $import_path );

      return file_get_contents( $import_path );
    });

    $sass->setExitDynamicImporter(function() use ($html, $sass) {
      $sass->current_path = array_pop( $sass->import_paths );
    });

    // Format mode doesn't matter because autoprefixer
    $sass->setFormatter("Tangible\\ScssPhp\\Formatter\\Expanded"); // Crunched, Nested, Expanded
  }

  $css = '';
  $sass->current_path = isset($options['path']) ? $options['path'] : '';
  $sass->import_paths = [
    $sass->current_path
  ];

  $sass->resetVariables(
    isset($options['variables']) ? $options['variables'] : []
  );

  try {

    $css = $sass->compile($content, $sass->current_path);
    $css = (new \Padaliyajay\PHPAutoprefixer\Autoprefixer($css))->compile();

  } catch (\Exception $e) {

    if (!isset($options['error']) || $options['error']!==false) {

      $path = @$sass->sourceNames[$sass->sourceIndex];
      $error = [
        'path' => !empty($path) ? $path : $sass->current_path,
        'message' => @$e->getMessage(),
        // 'line' => $sass->sourceLine,
        // 'column' => $sass->sourceColumn
      ];

      trigger_error("Sass error in {$error['path']} {$error['message']}", E_USER_WARNING);
    }
  }

  $sass->current_path = '';
  $sass->import_paths = [];

  return $css;
};

/**
 * <style type=sass>
 */
$html->register_style_type('sass', function($content, $options = []) use ($html) {

  if (!isset($options['path'])) {
    $options['path'] = $html->get_current_context('path');
  }

  $content = $html->sass( $content, $options );

  return isset($options['render']) ? $html->render( $content ) : $content;
});

/**
 * Render and enqueue Sass file
 *
 * TODO:
 * - Option to save CSS and cache
 * - Add comment with source path and timestamp
 */

$html->enqueue_sass_file = function($file_path_or_options = [], $args = []) use ($html) {

  if (is_string($file_path_or_options)) {
    $options = [
      'src' => $file_path_or_options
    ];
  }

  $options = $options + [
    // Defaults
  ];

  foreach ($options as $key => $value) $$key = $value;

  if (empty($src)) return;

  try {

    $css = $html->sass( file_get_contents( $src ), [
      'path' => dirname( $src )
    ]);

  } catch (\Throwable $th) {
    return;
  }

  $html->enqueue_inline_style( $css );
};
