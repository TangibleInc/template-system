<?php

$html->core_logic_rules = [

  // Any value

  [
'name'         => 'check',
    'label'    => 'Check value',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => $html->logic_comparisons,
    'values'   => [
      'type' => 'string',
    ],
  ],

  // Logic variable type

  [
  'name'       => 'logic',
    'label'    => 'Logic variable type',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => [],
    'values'   => [],
  ],

  // List variable type

  [
  'name'       => 'list',
    'label'    => 'List variable type',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => $html->logic_comparisons,
    'values'   => [
      'type' => 'string',
    ],
  ],

  // Loop

  [
    'name'     => 'first',
    'label'    => 'First item in loop',
    'operands' => [
      [
  'name'  => 'is',
  'label' => 'true',
      ],
      [
      'name'  => 'is_not',
      'label' => 'false',
      ],
    ],
  ],
  [
    'name'     => 'last',
    'label'    => 'Last item in loop',
    'operands' => [
      [
  'name'  => 'is',
  'label' => 'true',
      ],
      [
      'name'  => 'is_not',
      'label' => 'false',
      ],
    ],
  ],
  [
    'name'     => 'count',
    'label'    => 'Current loop count',
    'operands' => $html->logic_comparisons,
    'values'   => [
      'type' => 'number',
    ],
  ],
  [
  'name'       => 'total',
    'label'    => 'Loop items total',
    'operands' => $html->logic_comparisons,
    'values'   => [ 'type' => 'number' ],
  ],
  [
  'name'       => 'previous_total',
    'label'    => 'Previous loop items total',
    'operands' => $html->logic_comparisons,
    'values'   => [ 'type' => 'number' ],
  ],

  // Field

  [
  'name'       => 'field',
    'label'    => 'Field',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => $html->logic_comparisons,
    'values'   => [ 'type' => 'string' ],
  ],

  // User

  [
  'name'       => 'user',
    'label'    => 'User',
    'operands' => [
      [
  'name'  => 'exists',
  'label' => 'exists (logged-in)',
  'value' => false,
      ],
      [
      'name'  => 'not_exists',
      'label' => 'does not exist (not logged-in)',
      'value' => false,
      ],
    ],
  ],
  [
  'name'       => 'user_field',
    'label'    => 'User field',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => $html->logic_comparisons,
    'values'   => [ 'type' => 'string' ],
  ],
  [
  'name'       => 'user_role',
    'label'    => 'User role',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => $html->logic_comparisons,
    'values'   => [ 'type' => 'string' ],
  ],

  // URL Route

  [
  'name'       => 'route',
    'label'    => 'URL route',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => $html->logic_comparisons,
    'values'   => [ 'type' => 'string' ],
  ],

  // Variable - Shortcut for If check="{Get X}"

  [
  'name'       => 'variable',
    'label'    => 'Variable',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => $html->logic_comparisons,
    'values'   => [ 'type' => 'string' ],
  ],

  // Main query conditions - https://developer.wordpress.org/themes/basics/conditional-tags/

  [
  'name'      => 'archive',
    'label'   => 'Archive page - Accepts optional value of: category, tag, taxonomy, post (default), author, and date; Use attribute "type" or "taxonomy" to filter by post type and taxonomy, respectively',
    'field_2' => [
  'type'    => 'string',
  'default' => 'post',
  ],
  ],

  [
  'name'      => 'singular',
    'label'   => 'Single post, page, attachment, or any post type; Use attribute "type" to filter by post type',
    'field_2' => [ 'type' => 'string' ],
  ],

  // Query variable type

  [
  'name'       => 'query',
    'label'    => 'Query variable type',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => [],
    'values'   => [],
  ],

  // File

  [
  'name'       => 'file',
    'label'    => 'File',
    'field_2'  => [ 'type' => 'string' ],
    'operands' => [],
    'values'   => [],
  ],

];
