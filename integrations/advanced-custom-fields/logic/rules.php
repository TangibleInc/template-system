<?php

/**
 * Add all ACF field types as rules
 *
 * @see /tags/field/acf.php
 * @see /content/field-group/field.php
 */

$html->acf_logic_rules = [];

foreach ( [

  'checkbox'         => 'Checkbox',
  'date_picker'      => 'Date',
  'date_time_picker' => 'Date/Time',
  'time_picker'      => 'Time',
  'file'             => 'File',
  'flexible_content' => 'Flexible Content',
  'gallery'          => 'Gallery',
  'image'            => 'Image',
  'key'              => 'Field by ACF key',
  'link'             => 'Link',
  'multi_select'     => 'Multi-Select',
  'post_object'      => 'Post Object',
  'radio'            => 'Radio',
  'relationship'     => 'Relationship',
  'repeater'         => 'Repeater',
  'select'           => 'Select',
  'taxonomy'         => 'Taxonomy',
  'template'         => 'Template',
  'true_false'       => 'True/False',
  'user'             => 'User',

  // Aliases
  'date'             => 'Date',
  'date_time'        => 'Date/Time',
  'time'             => 'Time',
  'editor'           => 'Editor',
  'flexible'         => 'Flexible Content',
  'post'             => 'Post',

] as $name => $label ) {

  $html->acf_logic_rules [] = [
    'name'     => 'acf_' . $name,
    'label'    => 'ACF ' . $label,
    'field_2'  => [ 'type' => 'string' ],
    'operands' => $html->logic_comparisons,
    'values'   => [ 'type' => 'string' ],
  ];
}

return $html->acf_logic_rules;
