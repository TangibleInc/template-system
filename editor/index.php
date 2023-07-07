<?php
/**
 * Code Editor
 */
namespace Tangible\TemplateSystem\CodeEditor;

use Tangible\TemplateSystem\CodeEditor as editor;

class state {
  static $version = '20230707';
  static $html;
  static $url;
}

editor\state::$html = $html; // tangible_template()
editor\state::$url = trailingslashit( plugins_url( '/', __FILE__ ) );

function enqueue() {

  /**
   * Linters
   * 
   * @todo Move them here from v5 editor /template/codemirror/lib
   */
/*

  $html = &CodeEditor::$html;

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
*/

  // CodeEditor

  wp_enqueue_script(
    'tangible-template-system-editor',
    editor\state::$url . 'build/editor.min.js',
    [], // $linters,
    editor\state::$version,
    true
  );

}

function enqueue_ide() {

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

function load_ide() {

  editor\enqueue();
  editor\enqueue_ide();

    // include __DIR__ . '/build/index.html';
}
