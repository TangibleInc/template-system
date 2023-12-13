<?php
namespace tangible\hjson;

function parse() {
  static $parser;
  if (!$parser) {
    require_once __DIR__.'/HJSONException.php';
    require_once __DIR__.'/HJSONUtils.php';
    require_once __DIR__.'/HJSONParser.php';
  }
};

function render() {
  static $renderer;
  if (!$renderer) {
    require_once __DIR__.'/HJSONException.php';
    require_once __DIR__.'/HJSONUtils.php';
    require_once __DIR__.'/HJSONStringifier.php';
  }
};
