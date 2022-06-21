<?php

/**
 * Date comparison
 *
 * Returns true/false or null for unknown operand (pass through)
 *
 * Example use:
 *
 * ```php
 * $condition = $html->evaluate_date_comparison($value, $current_value, $atts);
 * if (is_bool($condition)) return $condition;
 * ```
 *
 * @see /logic/evaluate.php, case 'field'
 * @see /integrations/advanced-custom-fields/logic/index.php
 */

$html->date_comparisons = [
  [
'name'  => 'before',
'label' => 'before date',
  ],
  [
  'name'  => 'before_inclusive',
  'label' => 'before and including date',
  ],
  [
  'name'  => 'after',
  'label' => 'after date',
  ],
  [
  'name'  => 'after_inclusive',
  'label' => 'after and including date',
  ],
];

$html->evaluate_date_comparison = function( $value, $current_value, $atts ) use ( $html ) {

  // Return true/false, or null for unknown operand (pass through)
  $condition = null;
  $timestamp = null;

  if ( isset( $atts['from_format'] ) ) {
    /**
     * Convert from format - Same logic in /format/date.php
     *
     * Field value is expected to be timestamp, "Y-m-d", or "Y-m-d H:i:s". Otherwise,
     * it needs to be converted to a standard format.
     */
    try {
      $current_value = $html->date()
        ->createFromFormat( $atts['from_format'], $current_value )
        ->format( 'Y-m-d H:i:s' );
    } catch ( \Throwable $th ) {
      return $condition;
    }
  }

  if ( isset( $atts['before'] ) ) {

    // Before

    $timestamp = is_null( $timestamp ) ? $html->format_date( $current_value, 'timestamp' ) : $timestamp;

    // Start of day
    $compare_value = $html->format_date(
      $html->format_date( $atts['before'], 'Y-m-d' ) . ' 00:00:00',
      'timestamp'
    );

    $condition = $timestamp < $compare_value;

    if ( ! $condition) return $condition;

  } elseif ( isset( $atts['before_inclusive'] ) ) {

    // Before inclusive

    $timestamp = is_null( $timestamp ) ? $html->format_date( $current_value, 'timestamp' ) : $timestamp;

    // End of day
    $compare_value = $html->format_date(
      $html->format_date( $atts['before_inclusive'], 'Y-m-d' ) . ' 23:59:59',
      'timestamp'
    );

    $condition = $timestamp <= $compare_value;

    if ( ! $condition) return $condition;
  }

  // Before/after can be used together to mean "between"

  if ( isset( $atts['after'] ) ) {

    // After

    $timestamp = is_null( $timestamp ) ? $html->format_date( $current_value, 'timestamp' ) : $timestamp;

    // End of day
    $compare_value = $html->format_date(
      $html->format_date( $atts['after'], 'Y-m-d' ) . ' 23:59:59',
      'timestamp'
    );

    $condition = $timestamp > $compare_value;

  } elseif ( isset( $atts['after_inclusive'] ) ) {

    // After inclusive

    $timestamp = is_null( $timestamp ) ? $html->format_date( $current_value, 'timestamp' ) : $timestamp;

    // Start of day
    $compare_value = $html->format_date(
      $html->format_date( $atts['after_inclusive'], 'Y-m-d' ) . ' 00:00:00',
      'timestamp'
    );

    $condition = $timestamp >= $compare_value;
  }

  return $condition;
};
