<?php
/**
 * Sass compiler
 *
 * @see https://scssphp.github.io/scssphp/docs/
 */

$html->sass = function($content = '', $options = []) use ($html) {

  static $sass;

  if ( ! is_string($content) ) return;

  if ( ! $sass ) {

    require_once __DIR__.'/loader.php';

    $sass = new \Tangible\ScssPhp\Compiler();
  }

  // Minified output by default
  $minify = !isset($options['minify']) || $options['minify']!==false;

  $sass->setOutputStyle(
    $minify
      ? \Tangible\ScssPhp\OutputStyle::COMPRESSED
      : \Tangible\ScssPhp\OutputStyle::EXPANDED
  );

  $current_path = isset($options['path']) ? $options['path'] : '';

  $sass->setImportPaths(
    !empty($current_path) ? [$current_path] : []
  );

  /**
   * Convert variable values for parser
   * 
   * @see scssphp/Compiler.php, addVariables()
   * @see scssphp/ValueConverter.php, fromPhp()
   */
  $vars = [];

  if (isset($options['variables'])) {
    foreach ($options['variables'] as $key => $value) {
      $vars[ $key ] = \Tangible\ScssPhp\ValueConverter::fromPhp( $value );
    }  
  }

  $sass->replaceVariables( $vars );

  $css = '';

  try {

    $css = $sass->compileString($content)->getCss();

  } catch (\Exception $e) {

    if (!isset($options['error']) || $options['error']!==false) {

      $message =  $e->getMessage();

      if (!empty($current_path)) {
        $message = str_replace('(stdin)', $current_path, $message);
      }
      trigger_error("Sass compiler error: {$error['message']}", E_USER_WARNING);
    }
  }

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
