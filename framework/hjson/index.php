<?php
namespace tangible\hjson;
use tangible\hjson;

function parse($content, $options = []) {
  static $parser;
  if (!$parser) {

    require_once __DIR__.'/HJSONException.php';
    require_once __DIR__.'/HJSONUtils.php';
    require_once __DIR__.'/HJSONParser.php';

    $parser = new hjson\HJSONParser();
  }

  $parse_options = [
    'assoc' => true // Return associative array instead of object
  ];

  if (isset($options['throw'])) {
    return $parser->parse($content, $parse_options);
  }

  try {
    return $parser->parse($content, $parse_options);
  } catch (Exception $e) {
    return [];
  }
};

function render($content) {
  static $renderer;
  if (!$renderer) {
    require_once __DIR__.'/HJSONException.php';
    require_once __DIR__.'/HJSONUtils.php';
    require_once __DIR__.'/HJSONStringifier.php';

    $renderer = new hjson\HJSONStringifier();
  }
  if (isset($options['throw'])) {
    return $renderer->stringify($content);
  }

  try {
    return $renderer->stringify( $content );
  } catch (Exception $e) {
    return '';
  }
};
