<?php
/**
 * Code Editor
 */
namespace Tangible\TemplateSystem\Editor;

use Tangible\TemplateSystem\Editor as editor;

class state {
  static $version = '20230707';
  static $html;
  static $url;
  static $ignore_tags;
}

editor\state::$html = $html; // tangible_template()
editor\state::$url = trailingslashit( plugins_url( '/', __FILE__ ) );

function load() {

  // $linters = editor\load_linters();

  // Code Editor

  wp_enqueue_script(
    'tangible-template-system-editor',
    editor\state::$url . 'build/editor.min.js',
    [], // $linters,
    editor\state::$version,
    true
  );

  // Pass language data
  wp_localize_script( 'tangible-template-system-editor', 'TangibleTemplateLanguage', get_language_definition() );

}


/**
 * Linters - Unused
 * 
 * Currently using a minimal linter using default CodeMirror parser for the
 * languages, which just shows "Syntax Error".
 * 
 * In the future, if we want to provide an option to load proper linters with
 * more informative warnings and errors, move them here from v5 editor:
 * 
 * /template/codemirror/lib
 * 
 */

function load_linters() {

  $html = &editor\state::$html;

  $linters = [];

  foreach ([
    'htmlhint',
    'csslint', 'scsslint',
    'jshint',
    // 'jsonlint',
  ] as $lib) {
    $name = "tangible-codemirror-{$lib}";
    $linters []= $name;
    wp_enqueue_script($name,
      "{$html->url}codemirror/vendor/{$lib}.min.js",
      [],
      $html->version,
      true
    );
  }

  // Define raw tags whose content should not be parsed

  $raw_tags_map = json_encode( $html->raw_tags );

  wp_add_inline_script(
    'tangible-codemirror-htmlhint',
    "if (window.Tangible && window.Tangible.HTMLHint && window.Tangible.HTMLHint.parser) { Object.assign(window.Tangible.HTMLHint.parser.mapCdataTags, $raw_tags_map) };"
  );

  return $linters;
}

function load_ide() {

  editor\load();

  wp_enqueue_script(
    'tangible-template-system-ide',
    editor\state::$url . 'build/ide.min.js',
    [
      'tangible-ajax',
      'tangible-module-loader',
      'tangible-template-system-editor',
      'wp-element',
    ],
    editor\state::$version,
    true
  );

  wp_enqueue_style(
    'tangible-template-system-ide',
    editor\state::$url . 'build/ide.min.css',
    [],
    editor\state::$version
  );
}


function get_language_definition() {

  $html = &editor\state::$html;

  // TODO: These internal tags should define themselves as such
  $ignore_tags = [
    'a',
    'code',
    'img',
    'link',
    'script', 'style',
    'title',

    'Glide', // TODO: Local to Glider
    'Slide', // TODO: Local to Slider

    'PaginateButtons', 'PaginateFields', 'PaginateLoading', // TODO: Consolidate as Paginate

    'PopContext',
    'PushContext',
    'Raw',
    'Path',
  ];

  $tagNames = array_keys($html->tags);
  sort($tagNames);

  $tags = array_reduce(
    $tagNames,
    function($result, $name) use ($html, $ignore_tags) {

      $tag = $html->tags[ $name ];

      if (!in_array($name, $ignore_tags)) {
        /**
         * TODO: Tag definitions should include:
         * 
         * - Description
         * - Tag attributes
         * - Local tags
         */
        $result[ $name ] = $tag;
      }

      return $result;
    },
    []
  );

  $language = [
    'tags' => $tags,
  ];

  // tangible()->see($language);

  return $language;
}
