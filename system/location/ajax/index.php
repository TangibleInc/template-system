<?php

$ajax = $framework->ajax();

/**
 * AJAX action prefix must be the same as in:
 * assets/src/template-location-editor/RuleGroups/Rule/ensureDataForRule.js
 */
$prefix = 'tangible_loops_and_logic__template_location__';

require_once __DIR__ . '/post-type.php';
require_once __DIR__ . '/taxonomy.php';
