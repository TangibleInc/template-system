<?php
use tangible\format;

/**
 * Get arguments from config (array of parameter definitions with type and default value)
 *
 * Used to create loop type query args from definition
 */
$loop->get_args_from_config = function( $given_args, $config ) use ( $loop ) {

  $args = [];

  foreach ( $config as $name => $field_config ) {
    $args = $loop->set_arg_from_config( $args, $given_args, $name, $field_config );
  }

  return $args;
};

$loop->set_arg_from_config = function( $args, $given_args, $name, $field_config ) use ( $loop ) {

  if ( isset( $field_config['subfields'] ) && isset( $given_args[ $name ] ) ) {

    // Set subfields if this field value given

    foreach ( $field_config['subfields'] as $subfield_name => $subfield_config ) {
      $args = $loop->set_arg_from_config( $args, $given_args, $subfield_name, $subfield_config );
    }
  }

  if ( isset( $field_config['value'] ) ) {
    // Always set, without ability to override
    $args[ $name ] = $field_config['value'];
    return $args;
  }

  if ( isset( $field_config['target_name'] ) ) {
    if (empty( $field_config['target_name'] )) return $args;
    $target_name = $field_config['target_name'];
  } else {
    $target_name = $name;
  }

  // Default values
  if ( ! isset( $given_args[ $name ] ) ) {
    if ( ! isset( $field_config['default'] )) return $args;

    $given_args[ $name ] = $field_config['default'];
  }

  $value = $given_args[ $name ];

  if ( isset( $field_config['accepts'] ) ) {
    // Exclude value if not in accepts
    if ( ! in_array( $value, $field_config['accepts'] ) ) return $args;
  }

  /**
   * Cast to parameter type
   *
   * TODO: Generalize this logic to a separate function
   */

  $field_types = isset( $field_config['type'] ) ? $field_config['type'] : [ 'string' ];

  if ( ! is_array( $field_types ) ) $field_types = [ $field_types ];

  $cast_to_number  = in_array( 'number', $field_types );
  $cast_to_boolean = in_array( 'boolean', $field_types );

  if ( in_array( 'array', $field_types ) ) {

    if ( !is_array( $value ) ) {
      $value = format\multiple_values( $value );
    }

    // If key already exists, append to array
    if ( isset( $args[ $target_name ] ) ) {
      if ( ! is_array( $args[ $target_name ] ) ) {
        $args[ $target_name ] = [ $args[ $target_name ] ];
      }
      $value = array_merge( $args[ $target_name ], $value );
    }

    if ( $cast_to_number || $cast_to_boolean ) {
      foreach ( $value as $index => $item ) {
        if ( ! is_string( $value ) ) continue;
        if ( $cast_to_number && is_numeric( $item ) ) {
          $value[ $index ] = (float) $item;
        } elseif ( $cast_to_boolean ) {
          $value[ $index ] = $item === 'true';
        }
      }
    }
  } elseif ( is_string( $value ) ) {
    if ( $cast_to_number && is_numeric( $value ) ) {
      $value = (float) $value;
    } elseif ( $cast_to_boolean && ( $value === 'true' || $value === 'false' ) ) {
      $value = $value === 'true';
    }
  }

  $args[ $target_name ] = $value;

  return $args;
};
