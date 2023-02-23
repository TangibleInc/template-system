<?php

/**
 * Sass compiler
 *
 * @see https://scssphp.github.io/scssphp/docs/
 */

$html->sass = function ($content = '', $options = []) use ($html) {

  static $sass;

  if (!is_string($content)) return;

  if (!$sass) {

    require_once __DIR__ . '/loader.php';

    $sass = new \Tangible\ScssPhp\Compiler();

    /**
     * When the compiler detects a multibyte character in the Sass source code,
     * it adds by default a @charset rule or "byte-order mark", which are only
     * valid for CSS stylesheet as a file. The following option prevents it.
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@charset
     * @see https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8
     */
    $sass->setCharset(false);
  }

  // Minified output by default
  $minify = !isset($options['minify']) || $options['minify'] !== false;

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
   * Pass variables to Sass compiler
   * 
   * Previously using $sass->addVariables( $vars ), but ScssPhp 1.x no longer
   * accepts unprocessed values. Convert known types manually and pass
   * as Sass variable declarations.
   * 
   * @see scssphp/Compiler.php, addVariables()
   * @see scssphp/ValueConverter.php, fromPhp()
   */
  if (isset($options['variables'])) {

    $vars = '';

    foreach ($options['variables'] as $key => $value) {

      try {
        if (is_string($value)) {
          /**
           * Quoted string, or other types (boolean, number, etc.) already
           * converted to string
           */
        } elseif (is_array($value)) {
          /**
           * Convert to Sass map or list
           */
          $value = $html->convert_array_to_sass_map_or_list($value);
        } else {
          /**
           * Convert other types: will throw error on invalid value 
           */
          $value = \Tangible\ScssPhp\ValueConverter::fromPhp($value);
        }

        $vars .= "\$$key: $value;\n";

      } catch (\Exception $error) {
        $vars .= $html->convert_error_message_to_css_comment($error, $options);
      }
    }
    $content = $vars . $content;
  }

  $css = '';

  try {

    $css = $sass->compileString($content)->getCss();

  } catch (\Exception $error) {
    $css = $html->convert_error_message_to_css_comment($error, $options);
  }

  return $css;
};

$html->convert_array_to_sass_map_or_list = function ($value) {
  $value = json_encode($value);
  $value = (!empty($value) && ($value[0] === '{' || $value[0] === '['
  ))
    ? '(' . substr($value, 1, strlen($value) - 2) . ')'
    : '()' // Empty map
  ;
  return $value;
};

$html->convert_error_message_to_css_comment = function ($error, $options) {

  $message = $error->getMessage();
  $message = str_replace('(stdin) ', '', $message);

  $source = isset($options['source'])
    ? (is_a($options['source'], 'WP_Post')
      ? "Error in \"{$options['source']->post_name}\" - Post type: {$options['source']->post_type}, ID: {$options['source']->ID}"
      : (is_string($options['source'])
        ? $options['source']
        : ''
      )
    )
    : (isset($options['path'])
      ? $options['path'] // Template file
      : ''
    );

  $css = "/**\n";
  if (!empty($source)) $css .= " * $source\n";
  $css .= " * $message\n";
  $css .= " */\n";

  return $css;
};

/**
 * <style type=sass>
 */
$html->register_style_type('sass', function ($content, $options = []) use ($html) {

  if (!isset($options['path'])) {
    $options['path'] = $html->get_current_context('path');
  }

  $content = $html->sass($content, $options);

  return isset($options['render']) ? $html->render($content) : $content;
});

/**
 * Render and enqueue Sass file
 */
$html->enqueue_sass_file = function ($file_path_or_options = [], $args = []) use ($html) {

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

    $css = $html->sass(file_get_contents($src), [
      'path' => dirname($src)
    ]);
  } catch (\Throwable $th) {
    return;
  }

  $html->enqueue_inline_style($css);
};
