<?php

/**
 * Template/block controls
 *
 * Currently used by the Tangible Blocks plugin for block templates
 * to use values from page builders' block setting fields.
 *
 * The plan is to integrate into Loops & Logic as "template controls",
 * a visual interface in the template edit screen to provide values.
 */

require_once __DIR__ . '/logic.php';
require_once __DIR__ . '/loop.php';
require_once __DIR__ . '/variable.php';

/**
 * Support <Loop control=field_name>
 *
 * @see /template/tags/loop/context.php
 */
$html->loop_tag_attributes_for_type [] = 'control';
