<?php

use tangible\format;
use tangible\hjson;

use Tangible\Loop\BaseLoop;

$html->logic_comparisons = [
  [
'name'  => 'exists',
'label' => 'exists',
'value' => false,
  ],
  [
  'name'  => 'not_exists',
  'label' => 'does not exist',
  'value' => false,
  ],
  [
  'name'  => 'is',
  'label' => 'is',
  ],
  [
  'name'  => 'is_not',
  'label' => 'is not',
  ],
  [
  'name'  => 'any_is',
  'label' => 'any is',
  ],
  [
  'name'  => 'all_is',
  'label' => 'all is',
  ],
  [
  'name'  => 'any_is_not',
  'label' => 'any is not',
  ],
  [
  'name'  => 'all_is_not',
  'label' => 'all is not',
  ],
  [
  'name'  => 'more_than',
  'label' => 'more than',
  ],
  [
  'name'  => 'more_than_or_equal',
  'label' => 'more than or equal',
  ],
  [
  'name'  => 'less_than',
  'label' => 'less than',
  ],
  [
  'name'  => 'less_than_or_equal',
  'label' => 'less than or equal',
  ],
  [
  'name'  => 'starts_with',
  'label' => 'starts with',
  ],
  [
  'name'  => 'any_starts_with',
  'label' => 'any starts with',
  ],
  [
  'name'  => 'all_starts_with',
  'label' => 'all starts with',
  ],
  [
  'name'  => 'ends_with',
  'label' => 'ends with',
  ],
  [
  'name'  => 'any_ends_with',
  'label' => 'any ends with',
  ],
  [
  'name'  => 'all_ends_with',
  'label' => 'all ends with',
  ],
  [
  'name'  => 'in',
  'label' => 'in',
  ],
  [
  'name'  => 'not_in',
  'label' => 'in',
  ],
  [
  'name'  => 'includes',
  'label' => 'includes',
  ],
  [
  'name'  => 'not_includes',
  'label' => 'does not include',
  ],
  [
  'name'  => 'any_includes',
  'label' => 'any includes',
  ],
  [
  'name'  => 'all_includes',
  'label' => 'all includes',
  ],
  [
  'name'  => 'any_not_includes',
  'label' => 'any not includes',
  ],
  [
    'name'  => 'all_not_includes',
    'label' => 'all not includes',
  ],
  [
    'name'  => 'matches_pattern',
    'label' => 'matches regular expression',
  ],
];

$html->logic_comparison_keys = null;

$html->evaluate_logic_comparison = function( $operand, $value, $current_value, $atts = [] ) use ( $html, $loop ) {
  $condition = true;

  // Compare current value, using operand, against value

  switch ( $operand ) {
    case 'is':
    case 'is_not':
      $c         = $current_value == $value; // Loose equal
      $condition = $operand === 'is_not' ? ! $c : $c;
        break;

    case '':
      /**
       * Empty operand means "exists", unless there's an attribute that defines an **operator with value**
       */

      // Populate helper map as needed
      if ( is_null( $html->logic_comparison_keys ) ) {

        $html->logic_comparison_keys = [];

        foreach ( $html->logic_comparisons as $comparison ) {

          // Skip operators without value
          if (isset( $comparison['value'] ) && ! $comparison['value']) continue;

          $html->logic_comparison_keys[ $comparison['name'] ] = true;
        }
      }

      $has_operator_with_value = false;

      foreach ( $atts as $operand_key => $operand_value ) {

        if ( ! isset( $html->logic_comparison_keys[ $operand_key ] )) continue;

        // Found operator with value

        $has_operator_with_value = true;
        $condition               = $condition && $html->evaluate_logic_comparison(
          $operand_key, $operand_value, $current_value
        );

        if ( ! $condition ) break; // All must be true
      }

      if ($has_operator_with_value) return $condition;

      // Fall through

    case 'exists':
    case 'not_exists':
      // Not empty
      $c = ! ( is_null( $current_value ) || $current_value === ''
        || $current_value === 0
        || $current_value === false
        // Empty loop instance
        || ( is_a( $current_value, BaseLoop::class )
          ? ( ! $current_value->has_next() )
          // Empty array
          : ( is_array( $current_value ) && empty( $current_value ) )
        )
      );
      $condition = $operand === 'not_exists' ? ! $c : $c;
        break;
    case 'more_than':
    case 'after':
      $condition = $current_value > $value;
        break;
    case 'more_than_or_equal':
    case 'after_inclusive':
      $condition = $current_value >= $value;
        break;
    case 'less_than':
    case 'before':
      $condition = $current_value < $value;
        break;
    case 'less_than_or_equal':
    case 'before_inclusive':
      $condition = $current_value <= $value;
        break;

    case 'starts_with':
      if ( is_string( $current_value ) ) {
        $condition = substr( $current_value, 0, strlen( $value ) ) === $value;
      } elseif ( is_array( $current_value ) ) {
        // First item
        $condition = $current_value[0] === $value;
      } else {
        $condition = false;
      }
        break;

    case 'any_starts_with':
    case 'all_starts_with':
      if ( is_string( $current_value ) ) {
        // Convert to list
        $current_value = empty( $current_value )
          ? []
          : format\multiple_values($current_value) // Comma-separated list
        ;
      }
      if ( is_array( $current_value ) ) {

        $condition = false;
        $match_all = $operand === 'all_starts_with';

        foreach ( $current_value as $each_value ) {
          if ( is_string( $each_value ) ) {
            $condition = substr( $each_value, 0, strlen( $value ) ) === $value;
          }
          if ($match_all
            ? $condition === false // All must be true
            : $condition === true  // Any can be true
          ) break;
        }
      } else {
        $condition = false;
      }
        break;

    case 'ends_with':
      $length = strlen( $value );

      if ( is_string( $current_value ) ) {
        $condition = substr( $current_value, -$length ) === $value;
      } elseif ( is_array( $current_value ) ) {
        // Last item (without modifying the array)
        $condition = $current_value[ count( $current_value ) - 1 ] === $value;
      } else {
        $condition = false;
      }
        break;

    case 'any_ends_with':
    case 'all_ends_with':
      $length = strlen( $value );

      if ( is_string( $current_value ) ) {
        // Convert to list
        $current_value = empty( $current_value )
          ? []
          : format\multiple_values($current_value) // Comma-separated list
        ;
      }
      if ( is_array( $current_value ) ) {

        $condition = false;
        $match_all = $operand === 'all_ends_with';

        foreach ( $current_value as $each_value ) {
          if ( is_string( $each_value ) ) {
            $condition = substr( $each_value, -$length ) === $value;
          }
          if ($match_all
            ? $condition === false // All must be true
            : $condition === true  // Any can be true
          ) break;
        }
      } else {
        $condition = false;
      }
        break;

    case 'all_is':
    case 'all_is_not':
      $not = $operand === 'all_is_not';

      if ( is_string( $current_value ) ) {
        // Convert to list
        $current_value = empty( $current_value )
          ? []
          : format\multiple_values($current_value) // Comma-separated list
        ;
      }
      if ( is_array( $current_value ) ) {

        $condition = false;
        foreach ( $current_value as $each_value ) {
          $c         = $each_value == $value;
          $condition = $not ? ! $c : $c;
          if ($condition === false) break; // All must be equal
        }
      } else {
        $condition = false;
      }
        break;

    case 'in':
    case 'not_in':
      if ( is_array( $value ) ) {
        $values = $value;
      } elseif ( isset( $atts['list'] ) ) {
        /**
         * Handle special case for backward compatibility:
         *
         * <If value=1 in list=items>
         *
         * This syntax is deprecated in favor of:
         *
         * <If list=items includes=1>
         */

        // List variable - See ../tags/list.php
        $values = $html->get_list( $atts['list'] );
      } else {
        // Convert to list
        $values = $loop->is_instance($value)
          ? $value->total_items
          : format\multiple_values($value) // Comma-separated list
        ;
      }

      // needle in haystack
      $condition = in_array( $current_value, $values );

      if ($operand === 'not_in') $condition = ! $condition;

      break;

    case 'any_is':
    case 'any_is_not':

      /**
       * Very similar to "includes" and "not_includes" below. The differences:
       * 
       * - "any_is" converts a string into a comma-separated list
       * - "includes" searches a string for value
       * - "any_is_not" checks if the list has any item that is not value
       * - "not_includes" checks if the list does not include a value
       */

      // Support loop instance
      if ($loop->is_instance($current_value)) {
        $current_value = $current_value->total_items;
      }

      if ( is_string( $current_value ) ) {
        
        // Convert to list
        $current_value = empty( $current_value )
          ? []
          // Support JSON
          : format\multiple_values($current_value) // Comma-separated list
        ;
      }

      $not = $operand === 'any_is_not';
      if ( is_array( $current_value ) ) {

        $condition = false;
        foreach ( $current_value as $each_value ) {
          $c         = $each_value == $value;
          $condition = $not ? ! $c : $c;
          if ($condition === true ) break; // Any can be equal
        }
      } else {
        $condition = false;
      }
        break;

    case 'includes':
    case 'not_includes':

      // Support loop instance
      if ($loop->is_instance($current_value)) {
        $current_value = $current_value->total_items;
      }

      // Support JSON
      if (is_string( $current_value ) && isset( $current_value[0] ) && $current_value[0] === '[') {
        $current_value = hjson\parse( $current_value );
      }

      if ( is_array( $current_value ) ) {

        if ( is_array( $value ) ) {
          foreach ( $value as $val ) {
            $condition = array_search( $val, $current_value ) !== false;
            if ($condition) break;
          }
        } else {
          $condition = array_search( $value, $current_value ) !== false;
        }

      } elseif ( is_string( $current_value ) ) {

        // Search string
        $condition = strpos( $current_value, $value ) !== false;

      } else {
        $condition = false;
      }

      if ( $operand === 'not_includes' ) {
        $condition = ! $condition;
      }
        break;

    case 'any_includes':
    case 'any_not_includes':
      $not = $operand === 'any_not_includes';
      if ( is_string( $current_value ) ) {

        $c         = strpos( $current_value, $value ) !== false;
        $condition = $not ? ! $c : $c;

      } elseif ( is_array( $current_value ) ) {

        $condition = false;
        foreach ( $current_value as $each_value ) {
          $c         = strpos( $each_value, $value ) !== false;
          $condition = $not ? ! $c : $c;

          if ($condition === true) break;
        }
      } else {
        $condition = false;
      }
        break;
    case 'all_includes':
    case 'all_not_includes':
      $not = $operand === 'all_not_includes';
      if ( is_string( $current_value ) ) {

        $c         = strpos( $current_value, $value ) !== false;
        $condition = $not ? ! $c : $c;
      } elseif ( is_array( $current_value ) ) {

        $condition = false;
        foreach ( $current_value as $each_value ) {
          $c         = strpos( $each_value, $value ) !== false;
          $condition = $not ? ! $c : $c;

          if ($condition === false) break;
        }
      } else {
        $condition = false;
      }
        break;

    case 'matches_pattern':

      if ( is_string( $value ) && !empty($value) ) {
        if ($value[0]!=='/') {

          // Without delimiter - Render dynamic tags

          $value = $html->render_attribute_value(
            $operand,
            $value
          );
        }
        // Regular expression
        $pattern = $value;
        $subject = $current_value;

        try {

          $condition = !empty( preg_match( $pattern, $subject ) );

        } catch (\Throwable $th) {
          /**
           * preg_match() can throw an error for invalid regex pattern.
           * Convert it into a warning.
           */
           trigger_error($th->getMessage(), E_USER_NOTICE);
           $condition = false;
          }
    
      } else {
        $condition = false;
      }
      break;

    // Unknown operand
    default:
        return false;
  }

  return $condition;
};
