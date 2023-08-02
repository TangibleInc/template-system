<?php

namespace Tangible\TemplateSystem\Editor;

use Tangible\TemplateSystem\Editor as editor;

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
