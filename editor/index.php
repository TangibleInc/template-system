<?php
/**
 * Code Editor
 */
namespace Tangible\TemplateSystem\Editor;

class Editor {

  static $version = '20230607';

  static $html;
  static $state = [];
}

Editor::$html = $html; // tangible_template()

function enqueue() {

  $html = &Editor::$html;

  /**
   * Linters
   * 
   * @todo Move them here from v5 editor /template/codemirror/lib
   */

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

  // Editor

  $editor_url = trailingslashit( plugins_url( '/', __FILE__ ) );
  $editor_version = Editor::$version;

  wp_enqueue_script(
    'tangible-template-system-editor',
    "{$editor_url}build/editor.min.js",
    $linters,
    $editor_version,
    true
  );

}
