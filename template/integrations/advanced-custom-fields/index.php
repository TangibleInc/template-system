<?php

/**
 * Advanced Custom Fields integration
 *
 * @see content/field-group/field.php, tags/loop/context.php, tags/field/acf.php
 */

$html->is_acf_active = function_exists( 'acf' );

$html->is_acf_field_type_with_sub_field = function( $field_type ) {
  return $field_type === 'acf_repeater'
    || $field_type === 'acf_flexible_content'
    || $field_type === 'acf_group';
};

if ( ! $html->is_acf_active ) return;

// Loop types

require_once __DIR__ . '/types/repeater.php';
require_once __DIR__ . '/types/flexible-content.php';
require_once __DIR__ . '/types/group.php';

// ACF field types

add_action('acf/include_field_types', function() {
  require_once __DIR__ . '/fields/index.php';
});

// Logic rules for If tag

require_once __DIR__ . '/logic/index.php';
