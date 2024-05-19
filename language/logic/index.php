<?php
// local $html, $loop, $logic

require_once __DIR__ . '/comparison.php';
require_once __DIR__ . '/date-comparison.php';
require_once __DIR__ . '/definition.php';
require_once __DIR__ . '/evaluate.php';
require_once __DIR__ . '/tag.php';

/**
 * Register with Logic module
 */

$logic->extend_rules_by_category(
  'core',
  $html->core_logic_rules,
  $html->evaluate_core_logic_rule
);
