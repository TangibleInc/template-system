<?php
/**
 * Code Editor
 */
namespace Tangible\TemplateSystem\Editor;

use Tangible\TemplateSystem\Editor as editor;

class state {
  static $version = '20230707';
  static $system;
  static $html;
  static $url;
  static $ignore_tags;
}

editor\state::$system = $system; // tangible_template_system()
editor\state::$html = $html; // tangible_template()
editor\state::$url = trailingslashit( plugins_url( '/', __FILE__ ) );

require_once __DIR__.'/includes/index.php';
