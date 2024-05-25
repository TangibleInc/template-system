<?php

/**
 * Category
 *
 * Extend and get rules by category
 */

$logic->extend_rules_by_category = function( $category, $rules_definition, $rule_evaluator ) use ( $logic ) {
  return $logic->extend_rules(array_map(function( $field ) use ( $category ) {
    return $field + [
      'category' => $category,
    ];
  }, $rules_definition), $rule_evaluator);
};

$logic->get_rules_by_category = function( $category ) use ( $logic ) {

  $filtered_fields = [];

  // Support passing anonymous function to compare
  $match = ( is_object( $category ) && ( $category instanceof Closure ) )
    ? $category
    : function( $check ) use ( $category ) {
      return $check === $category;
    };

  foreach ( $logic->state['rules_by_field'] as $key => $fields ) {
    foreach ( $fields as $index => $field ) {

      if ( ! isset( $field['category'] )
        || ! $match( $field['category'] )
      ) continue; // No match

      if ( ! isset( $filtered_fields[ $key ] ) ) {
        $filtered_fields[ $key ] = [];
      }
      $filtered_fields[ $key ] [] = $field;
    }
  }

  return $filtered_fields;
};

/**
 * Get an array of field configs, from rules matching this category
 */
$logic->get_fields_by_category = function( $category ) use ( $logic ) {

  $matching_fields = [];
  $rules_by_field  = $logic->get_rules_by_category( $category );

  foreach ( $rules_by_field as $key => $fields ) {
    foreach ( $fields as $field ) {
      array_push( $matching_fields, $field );
    }
  }

  return $matching_fields;
};
