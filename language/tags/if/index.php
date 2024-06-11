<?php
// local $html, $loop, $logic

/**
 * <if> tag integrated with Tangible Logic module
 *
 * @see vendor/tangible/logic/rules/tag.php
 * @see ../../logic for definitions of core conditional rules
 */

require_once __DIR__ . '/evaluate.php';
require_once __DIR__ . '/logic-variable.php';
require_once __DIR__ . '/parse.php';
require_once __DIR__ . '/tag.php';

require_once __DIR__ . '/switch.php';

$html->add_open_tag( 'If', $html->if_tag, [

  /**
   * These attributes are skipped from rendering dynamic tags inside
   * @see ../html/parse
   */
  'skip_render_keys' => [
    'matches_pattern'
  ],
  'local_tags' => [
    'Else' => [
      'closed' => true
    ],
  ],
] );

/**
 * Shortcut to call from PHP
 */
$html->if = function($atts) use ($html) {

  if (is_string($atts)) {

    // Parse string into attributes
    $nodes = $html->parse("<If $atts>");
    if (isset($nodes[0]) && isset($nodes[0]['attributes'])) {
      $atts = $nodes[0]['attributes'];
    } else {
      $atts = [];
    }
  }

  if (!isset($atts['keys'])) $atts['keys'] = [];

  $nodes = [
    [ 'text' => 'TRUE' ]
  ];

  return $html->if_tag($atts, $nodes) === 'TRUE'; // Cast to boolean
};

/**
 * Shortcut to parse tag attributes into rule groups and evaluate them
 */
$html->evaluate_if_tag_attributes = function($atts = []) use ($html) {
  return $html->evaluate_logic_token_rule_groups(
    $html->parse_if_tag_logic($atts),
    $atts
  );
};
