<?php
namespace tangible\template_system;
use tangible\template_system;

/**
 * Get ACF field settings
 */
function get_acf_field_settings($field_name, $options = []) {

  $loop = template_system::$loop;
  $html = template_system::$html;

  if ( ! $html->is_acf_active ) return [];

  $current_loop = isset( $options['loop'] )
    ? $options['loop']
    : $loop->get_context();

  $loop_type  = $current_loop->get_name();
  $acf_object_id = template_system\get_current_acf_object_id(
    $options
  );

  // Subfield uses different function
  if ( $html->is_acf_field_type_with_sub_field( $loop_type ) ) {

    $result = get_sub_field_object(
      $field_name,
      $acf_object_id,
      false, // format value
      false  // load value
    );

  } else {

    $result = get_field_object(
      $field_name,
      $acf_object_id,
      false, // format value
      false  // load value
    );  
  }

  /**
   * During tests, ACF is *not reliable* in returning field settings immediately after the
   * field is created: sometimes it returns false. Try to work around it.
   */
  if (!is_array($result)) {
    $result = acf_maybe_get_field(
      $field_name,
      $acf_object_id,
      false // Option "strict" must be false
    );
    if (!is_array($result)) return [];
  }

  return $result;
}

/**
 * Get current ACF "object ID" which is used to get field settings
 */
function get_current_acf_object_id($options = []) {

  // From options page
  if ( isset( $options['from'] ) && $options['from'] === 'options' ) {
    return 'option';
  }
  
  $loop = template_system::$loop;
  $current_loop = isset( $options['loop'] )
    ? $options['loop']
    : $loop->get_context();

  $loop_type  = $current_loop->get_name();
  $current_id = $current_loop->get_field( 'id' );

  if ( $loop_type === 'taxonomy_term' ) {
    // @see https://www.advancedcustomfields.com/resources/adding-fields-taxonomy-term/
    return "term_{$current_id}";
  }

  if ( $loop_type === 'user' ) {
    return "user_{$current_id}";
  }

  // Post
  return $current_id;
}
